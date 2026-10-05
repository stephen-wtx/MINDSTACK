"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, MessageCircle } from "lucide-react";

export default function LetsFlyFooter() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const copyBlockRef = useRef<HTMLDivElement>(null);
  const contactsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  const hasPlayedRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const video = videoRef.current;
    const container = containerRef.current;

    if (!container) return;

    // 1. Single-play video trigger when section enters viewport
    if (video) {
      ScrollTrigger.create({
        trigger: container,
        start: "top 65%",
        once: true,
        onEnter: () => {
          if (!hasPlayedRef.current) {
            hasPlayedRef.current = true;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Autoplay policy fallback (handled silently)
              });
            }
          }
        },
      });
    }

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 2. UI Content Entrance Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
      )
        .fromTo(
          copyBlockRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
          "-=0.75"
        )
        .fromTo(
          contactsRef.current ? contactsRef.current.children : [],
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          footerRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8, ease: "power2.out" },
          "-=0.4"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="lets-work"
      className="relative w-full min-h-[100svh] bg-background flex flex-col justify-between overflow-hidden border-t border-dark/10 pt-24 sm:pt-32 lg:pt-40"
      aria-label="Let's Work e Contactos"
    >
      {/* Anchor for backward compatibility with #lets-fly */}
      <div id="lets-fly" className="absolute top-0 left-0 pointer-events-none" />
      {/* ─────────────────────────────────────────────────────────────
          VIDEO BACKGROUND — Single-play. NO loop. Stays on final frame.
      ─────────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center sm:object-[center_35%] lg:object-[65%_center]"
        >
          <source src="/videos/letsfly.webm" type="video/webm" />
        </video>

        {/* ─────────────────────────────────────────────────────────────
            SUBTLE DARK OVERLAY
            Improves text legibility without destroying the video atmosphere.
            rgba(0,0,0,0.35) — light enough to keep the video clearly visible.
        ─────────────────────────────────────────────────────────────── */}
        <div
          className="absolute inset-0 bg-black/35 pointer-events-none"
          aria-hidden="true"
        />
        {/* Gradient fade at the very bottom for a soft page transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background/60 to-transparent pointer-events-none"
          aria-hidden="true"
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LET'S FLY CONTENT
      ─────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex-grow flex flex-col justify-center">

        {/* ─────────────────────────────────────────────────────────────
            TITLE: LET'S / FLY — Two lines, cinematic presence.
            Each word on its own line via block spans.
        ─────────────────────────────────────────────────────────────── */}
      <h2
        ref={titleRef}
        className="font-display font-black text-brand tracking-tight uppercase
          select-none will-change-transform whitespace-nowrap
          text-[clamp(2.5rem,6.5vw,5.5rem)]"
        aria-label="Let's Fly"
      >
        LET&apos;S FLY
      </h2>


        {/* ─────────────────────────────────────────────────────────────
            CONTACT INTRODUCTORY COPY
            Controlled max-width prevents single-line sprawl.
        ─────────────────────────────────────────────────────────────── */}
        <div
          ref={copyBlockRef}
          className="mt-8 sm:mt-10 lg:mt-12 max-w-xs sm:max-w-md lg:max-w-lg will-change-transform"
        >
          <p className="font-body text-white font-medium
            text-xl sm:text-2xl md:text-3xl
            leading-snug tracking-tight mb-3 sm:mb-4">
            Tem uma ideia?
          </p>
          <p className="font-body text-white/90 font-medium
            text-lg sm:text-xl md:text-2xl
            leading-snug tracking-tight mb-3 sm:mb-4">
            Vamos transformar a ideia em algo real.
          </p>
          <p className="font-body text-white/70 font-normal
            text-sm sm:text-base md:text-lg
            leading-relaxed">
            Estamos disponíveis para novos projectos,<br />
            ideias e colaborações.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CONTACT LINKS — EMAIL / WHATSAPP
        ─────────────────────────────────────────────────────────────── */}
        <div
          ref={contactsRef}
          className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 max-w-2xl pt-8 sm:pt-10 border-t border-white/20"
        >
          {/* EMAIL */}
          <a
            href="mailto:zillionphp777@gmail.com"
            data-cursor-hover="true"
            className="group flex flex-col items-start gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
            aria-label="Enviar email para zillionphp777@gmail.com"
          >
            <div className="flex items-center gap-2 font-body text-xs sm:text-sm font-semibold tracking-widest text-white/60 uppercase">
              <Mail className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
              <span>Email</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body font-semibold
                text-base sm:text-lg md:text-xl lg:text-2xl
                text-white tracking-tight
                transition-colors duration-200 group-hover:text-brand">
                zillionphp777@gmail.com
              </span>
              <span
                className="inline-block text-white/60 text-base sm:text-lg transform transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:text-brand"
                aria-hidden="true"
              >
                →
              </span>
            </div>
          </a>

          {/* WHATSAPP */}
          <a
            href="https://wa.me/258834577714"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover="true"
            className="group flex flex-col items-start gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
            aria-label="Contactar no WhatsApp (+258 83 457 7714)"
          >
            <div className="flex items-center gap-2 font-body text-xs sm:text-sm font-semibold tracking-widest text-white/60 uppercase">
              <MessageCircle className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
              <span>WhatsApp</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body font-semibold
                text-base sm:text-lg md:text-xl lg:text-2xl
                text-white tracking-tight
                transition-colors duration-200 group-hover:text-brand">
                +258 83 457 7714
              </span>
              <span
                className="inline-block text-white/60 text-base sm:text-lg transform transition-transform duration-300 ease-out group-hover:translate-x-2 group-hover:text-brand"
                aria-hidden="true"
              >
                →
              </span>
            </div>
          </a>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          FOOTER — Mindstack · Design & Tecnologia · Instagram · WhatsApp · © 2026
      ─────────────────────────────────────────────────────────────── */}
      <footer
        ref={footerRef}
        className="relative z-10 w-full max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20
          py-8 sm:py-10
          border-t border-white/10
          mt-16 sm:mt-24
          flex flex-col sm:flex-row items-center justify-between gap-6
          font-body text-xs sm:text-sm text-white/50"
        role="contentinfo"
      >
        {/* Left: Studio Identity */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="font-display font-bold text-white/80 tracking-tight">
            MINDSTACK
          </span>
          <span>Design &amp; Tecnologia</span>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-6 sm:gap-8">
          <a
            href="https://www.instagram.com/mind.stack258?stkn=bGFpd3c0eng4MnBl&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover="true"
            className="hover:text-white transition-colors duration-200 uppercase tracking-wider font-medium"
            aria-label="Perfil do Instagram da Mindstack (abre numa nova aba)"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/258834577714"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover="true"
            className="hover:text-white transition-colors duration-200 uppercase tracking-wider font-medium"
            aria-label="WhatsApp da Mindstack (abre numa nova aba)"
          >
            WhatsApp
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-center sm:text-right text-white/35">
          <span>&copy; {new Date().getFullYear()} Mindstack</span>
        </div>
      </footer>
    </section>
  );
}
