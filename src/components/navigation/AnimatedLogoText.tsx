"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

const TARGET_TEXT = "MINDSTACK";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

const COLOR_DARK: [number, number, number] = [18, 19, 22]; // #121316
const COLOR_BRAND: [number, number, number] = [242, 93, 35]; // #F25D23

function interpolateColor(
  c1: [number, number, number],
  c2: [number, number, number],
  factor: number
): string {
  const f = Math.max(0, Math.min(1, factor));
  const r = Math.round(c1[0] + f * (c2[0] - c1[0]));
  const g = Math.round(c1[1] + f * (c2[1] - c1[1]));
  const b = Math.round(c1[2] + f * (c2[2] - c1[2]));
  return `rgb(${r}, ${g}, ${b})`;
}

interface CharState {
  char: string;
  rotation: number;
  color: string;
  isResolved: boolean;
}

interface AnimatedLogoTextProps {
  className?: string;
  isHovered?: boolean;
  onHoverStart?: () => void;
  onHoverEnd?: () => void;
}

export default function AnimatedLogoText({
  className = "",
  isHovered = false,
  onHoverStart,
  onHoverEnd,
}: AnimatedLogoTextProps) {
  const [charStates, setCharStates] = useState<CharState[]>(() =>
    TARGET_TEXT.split("").map((c) => ({
      char: c,
      rotation: 0,
      color: "rgb(18, 19, 22)",
      isResolved: true,
    }))
  );

  const [isAnimating, setIsAnimating] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const isHoveredRef = useRef(isHovered);

  // Keep ref up to date
  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  const runAnimation = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }

    setIsAnimating(true);
    const now = performance.now();
    startTimeRef.current = now;

    // Durations for each letter (staggered resolve from left to right)
    // Base 220ms, each subsequent letter gets +50ms
    const totalLetters = TARGET_TEXT.length;
    const letterDurations = TARGET_TEXT.split("").map((_, i) => 220 + i * 55);

    let lastCharChangeTime = 0;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTimeRef.current;
      const shouldChangeChar = currentTime - lastCharChangeTime > 35;
      if (shouldChangeChar) {
        lastCharChangeTime = currentTime;
      }

      let allDone = true;

      setCharStates((prev) =>
        prev.map((state, i) => {
          const duration = letterDurations[i];
          const progress = Math.min(1, elapsed / duration);

          if (progress < 1) {
            allDone = false;
            // 3D vertical spin (rotateX) barrel roll
            const currentRotation = Math.round(progress * 360);
            // Color smoothly transitions from black to brand orange
            const currentColor = interpolateColor(COLOR_DARK, COLOR_BRAND, progress);
            // Random character during spin
            const nextChar = shouldChangeChar
              ? CHARS[Math.floor(Math.random() * CHARS.length)]
              : state.char;

            return {
              char: nextChar,
              rotation: currentRotation,
              color: currentColor,
              isResolved: false,
            };
          }

          // Resolved state: target letter, 0 rotation, brand orange
          return {
            char: TARGET_TEXT[i],
            rotation: 0,
            color: "rgb(242, 93, 35)",
            isResolved: true,
          };
        })
      );

      if (!allDone) {
        animFrameRef.current = requestAnimationFrame(tick);
      } else {
        setIsAnimating(false);
        animFrameRef.current = null;
      }
    };

    animFrameRef.current = requestAnimationFrame(tick);
  }, []);

  // Trigger animation whenever isHovered transitions to true
  const prevHoveredRef = useRef(false);
  useEffect(() => {
    if (isHovered && !prevHoveredRef.current) {
      runAnimation();
    }
    prevHoveredRef.current = isHovered;
  }, [isHovered, runAnimation]);

  // Clean up RAF on unmount
  useEffect(() => {
    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  return (
    <span
      className={`inline-flex items-center select-none ${className}`}
      onMouseEnter={() => {
        runAnimation();
        onHoverStart?.();
      }}
      onMouseLeave={() => {
        onHoverEnd?.();
      }}
      style={{ perspective: "600px" }}
      aria-label="MINDSTACK"
    >
      <span className="sr-only">MINDSTACK</span>
      {TARGET_TEXT.split("").map((targetChar, index) => {
        const state = charStates[index];
        // If not animating and not hovered, smoothly transition color back to black
        const activeColor =
          isAnimating || isHoveredRef.current
            ? state.color
            : "rgb(18, 19, 22)";

        return (
          <span
            key={index}
            aria-hidden="true"
            className="relative inline-block"
            style={{
              perspective: "500px",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Ghost character preserving exact width and spacing */}
            <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
              {targetChar}
            </span>

            {/* Spinning/resolving character */}
            <span
              className="absolute inset-0 flex items-center justify-center will-change-transform"
              style={{
                transform: `rotateX(${state.rotation}deg)`,
                color: activeColor,
                transition: isAnimating
                  ? "none"
                  : "color 0.4s ease-out, transform 0.3s ease-out",
                backfaceVisibility: "visible",
                WebkitBackfaceVisibility: "visible",
              }}
            >
              {state.char}
            </span>
          </span>
        );
      })}
    </span>
  );
}
