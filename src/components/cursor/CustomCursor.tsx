"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Only enable for desktop pointer devices with fine precision and no reduced motion
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!hasFinePointer || prefersReducedMotion) {
      return;
    }

    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Quick setters using gsap for high performance 60/120fps motion without layout thrashing
    const xDot = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power2.out" });
    const yDot = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power2.out" });
    const xFollower = gsap.quickTo(follower, "x", { duration: 0.35, ease: "power3.out" });
    const yFollower = gsap.quickTo(follower, "y", { duration: 0.35, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      xDot(e.clientX);
      yDot(e.clientY);
      xFollower(e.clientX);
      yFollower(e.clientY);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);

    const onMouseEnter = () => setIsVisible(true);
    const onMouseLeave = () => setIsVisible(false);

    // Watch for hover states on interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, [data-cursor-hover], input, select, textarea");
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousemove", handleElementHover, { passive: true });
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    document.body.addEventListener("mouseenter", onMouseEnter);
    document.body.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousemove", handleElementHover);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.body.removeEventListener("mouseenter", onMouseEnter);
      document.body.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  // Note: isVisible state intentionally excluded — event listeners should only
  // be registered once. Visibility is tracked via the setter directly.

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300 hidden lg:block ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Inner Dot */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-brand pointer-events-none transition-transform duration-150 ease-out"
        style={{
          transform: `scale(${isClicking ? 0.6 : isHovered ? 0 : 1})`,
        }}
      />

      {/* Outer Sleek Ring */}
      <div
        ref={followerRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none border transition-all duration-300 ease-out ${
          isHovered
            ? "w-11 h-11 border-brand/60 bg-brand/10 scale-100"
            : isClicking
            ? "w-7 h-7 border-brand scale-90 bg-brand/5"
            : "w-8 h-8 border-dark/20 bg-transparent scale-100"
        }`}
      />
    </div>
  );
}
