"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroProps {
  navRef?: React.RefObject<HTMLElement>;
}

export default function Hero({ navRef }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoBgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleLine1Ref = useRef<HTMLSpanElement>(null);
  const titleLine2Ref = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Accessibility: Instant render when reduced motion is preferred
    if (prefersReducedMotion) {
      if (videoBgRef.current) gsap.set(videoBgRef.current, { opacity: 1 });
      if (titleLine1Ref.current) gsap.set(titleLine1Ref.current, { opacity: 1, y: 0 });
      if (titleLine2Ref.current) gsap.set(titleLine2Ref.current, { opacity: 1, y: 0 });
      if (textRef.current) gsap.set(textRef.current, { opacity: 1, y: 0 });
      if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 1, y: 0 });
      if (navRef?.current) gsap.set(navRef.current, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Initial visual states
      if (videoBgRef.current) {
        gsap.set(videoBgRef.current, { opacity: 0, scale: 1.03 });
      }
      if (navRef?.current) {
        gsap.set(navRef.current, { opacity: 0, y: -16 });
      }
      if (titleLine1Ref.current && titleLine2Ref.current) {
        gsap.set([titleLine1Ref.current, titleLine2Ref.current], {
          opacity: 0,
          y: 24,
        });
      }
      if (textRef.current) {
        gsap.set(textRef.current, { opacity: 0, y: 18 });
      }
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 14 });
      }

      // Sequenced Cinematic Animation Timeline
      // 1. Full-screen video background fades in with subtle settling
      tl.to(
        videoBgRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 1.6,
          ease: "power2.out",
        },
        0.1
      )
        // 2. Navbar drops in gracefully
        .to(
          navRef?.current || {},
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
          },
          0.35
        )
        // 3. Title reveals in sequence
        .to(
          titleLine1Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
          },
          0.6
        )
        .to(
          titleLine2Ref.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
          },
          0.75
        )
        // 4. Body text slides in
        .to(
          textRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
          },
          0.95
        )
        // 5. CTA link completes sequence
        .to(
          ctaRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          1.1
        );
    }, containerRef);

    return () => ctx.revert();
  }, [navRef]);

  return (
    <section
      ref={containerRef}
      id="inicio"
      className="relative w-full h-[100svh] min-h-[580px] flex items-center overflow-hidden bg-background"
      aria-label="Hero Section"
    >
      {/* ─────────────────────────────────────────────────────────────
          FULL-SCREEN CINEMATOGRAPHIC VIDEO BACKGROUND LAYER
      ─────────────────────────────────────────────────────────────── */}
      <div
        ref={videoBgRef}
        className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none will-change-transform"
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center sm:object-[60%_center] lg:object-[68%_center] xl:object-[65%_center] filter contrast-[1.01]"
        >
          <source src="/videos/intro.webm" type="video/webm" />
          <source src="/videos/intro.mp4" type="video/mp4" />
        </video>

        {/* Subtle Ambient Light Wash to ensure crisp text contrast on all devices */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-transparent lg:via-background/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40 sm:hidden pointer-events-none" />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          HERO CONTENT (FLOATING OVER FULL-SCREEN VIDEO)
      ─────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-20 sm:pt-24 lg:pt-0">
        <div className="max-w-xl md:max-w-2xl lg:max-w-3xl flex flex-col justify-center text-left">
          
          {/* Main Display Headline */}
          <h1 className="font-display font-black text-brand tracking-tight uppercase text-[2.75rem] leading-[0.92] xs:text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] 2xl:text-[7.25rem] sm:leading-[0.88]">
            <span className="block overflow-hidden">
              <span
                ref={titleLine1Ref}
                className="inline-block will-change-transform"
              >
                DESIGN &
              </span>
            </span>
            <span className="block overflow-hidden mt-1 sm:mt-2">
              <span
                ref={titleLine2Ref}
                className="inline-block will-change-transform"
              >
                TECNOLOGIA
              </span>
            </span>
          </h1>

          {/* Descriptive Body Copy */}
          <div className="overflow-hidden mt-5 sm:mt-7 md:mt-9 max-w-md sm:max-w-lg lg:max-w-xl">
            <p
              ref={textRef}
              className="font-body text-dark/85 text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed will-change-transform"
            >
              Buscamos formas de unir os nossos pontos fortes em cada projecto.
            </p>
          </div>

          {/* Interactive CTA */}
          <div className="overflow-hidden mt-7 sm:mt-9 md:mt-11">
            <a
              ref={ctaRef}
              href="#quem-somos"
              data-cursor-hover="true"
              className="group inline-flex items-center gap-2.5 sm:gap-3.5 font-body text-sm sm:text-base md:text-lg font-medium tracking-wide text-brand transition-all duration-300 will-change-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
              aria-label="Vamos voar junto? Explorar MindStack"
            >
              <span className="relative py-1">
                Vamos voar junto?
                {/* Minimalist animated underline */}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] sm:h-[2px] bg-brand origin-left scale-x-100 group-hover:scale-x-110 transition-transform duration-300 ease-out" />
              </span>

              {/* Minimalist SVG Arrow Indicator */}
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
