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
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out" }
      )
        .fromTo(
          copyBlockRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
          "-=0.75"
        )
        .fromTo(
          contactsRef.current ? contactsRef.current.children : [],
          { opacity: 0, y: 20 },
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
      id="lets-fly"
      className="relative w-full min-h-[100svh] bg-background flex flex-col justify-between overflow-hidden border-t border-dark/10 pt-24 sm:pt-32 lg:pt-40"
      aria-label="Let's Fly e Contactos"
    >
      {/* ─────────────────────────────────────────────────────────────
          ZERO OVERLAY: RAW NATURAL VIDEO BACKGROUND
          Single-play on viewport arrival. NO loop. Stays on final frame.
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
          <source src="/videos/letsfly.mp4" type="video/mp4" />
        </video>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LET'S FLY CONTENT FLOATING DIRECTLY OVER THE VIDEO
      ─────────────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 flex-grow flex flex-col justify-center">
        
        {/* Massive Display Title */}
        <div className="overflow-hidden">
          <h2
            ref={titleRef}
            className="font-display font-black text-brand tracking-tight uppercase leading-[0.88] text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] xl:text-[11rem] 2xl:text-[13rem] select-none will-change-transform"
          >
            LET&apos;S FLY
          </h2>
        </div>

        {/* Contact Introductory Copy */}
        <div
          ref={copyBlockRef}
          className="mt-8 sm:mt-12 lg:mt-16 max-w-2xl sm:max-w-3xl will-change-transform"
        >
          <p className="font-body text-dark font-medium text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-tight tracking-tight">
            Tem uma ideia? Vamos transformar a ideia em algo real.
          </p>
          <p className="font-body text-dark-muted text-sm sm:text-base md:text-lg lg:text-xl font-normal leading-relaxed mt-3 sm:mt-4">
            Estamos disponíveis para novos projectos, ideias e colaborações.
          </p>
        </div>

        {/* Contact Links with Minimalist Lucide Icons */}
        <div
          ref={contactsRef}
          className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 max-w-4xl pt-8 sm:pt-12 border-t border-dark/15"
        >
          {/* EMAIL Contact */}
          <a
            href="mailto:zillionphp777@gmail.com"
            data-cursor-hover="true"
            className="group flex flex-col items-start gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
            aria-label="Enviar email para zillionphp777@gmail.com"
          >
            <div className="flex items-center gap-2 font-body text-xs sm:text-sm font-semibold tracking-widest text-brand uppercase">
              <Mail className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>EMAIL</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-dark tracking-tight transition-colors duration-200 group-hover:text-brand">
                zillionphp777@gmail.com
              </span>
              <span
                className="inline-block text-brand text-lg sm:text-xl transform transition-transform duration-300 ease-out group-hover:translate-x-2"
                aria-hidden="true"
              >
                →
              </span>
            </div>
          </a>

          {/* WHATSAPP Contact */}
          <a
            href="https://wa.me/258850244716"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover="true"
            className="group flex flex-col items-start gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
            aria-label="Contactar no WhatsApp (+258 85 024 4716)"
          >
            <div className="flex items-center gap-2 font-body text-xs sm:text-sm font-semibold tracking-widest text-brand uppercase">
              <MessageCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
              <span>WHATSAPP</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-display font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-dark tracking-tight transition-colors duration-200 group-hover:text-brand">
                +258 85 024 4716
              </span>
              <span
                className="inline-block text-brand text-lg sm:text-xl transform transition-transform duration-300 ease-out group-hover:translate-x-2"
                aria-hidden="true"
              >
                →
              </span>
            </div>
          </a>
        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          MINIMALIST FUNCTIONAL FOOTER
      ─────────────────────────────────────────────────────────────── */}
      <footer
        ref={footerRef}
        className="relative z-10 w-full max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-8 sm:py-10 border-t border-dark/10 mt-16 sm:mt-24 flex flex-col sm:flex-row items-center justify-between gap-6 font-body text-xs sm:text-sm text-dark-muted"
        role="contentinfo"
      >
        {/* Left: Studio Identity */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="font-display font-bold text-dark tracking-tight">
            MINDSTACK
          </span>
          <span>Design &amp; Tecnologia</span>
        </div>

        {/* Center: Social / Contact Links */}
        <div className="flex items-center gap-6 sm:gap-8">
          <a
            href="https://www.instagram.com/mind.stack258?stkn=bGFpd3c0eng4MnBl&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover="true"
            className="hover:text-brand transition-colors duration-200 uppercase tracking-wider font-medium"
            aria-label="Perfil do Instagram da Mindstack (abre numa nova aba)"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/258850244716"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover="true"
            className="hover:text-brand transition-colors duration-200 uppercase tracking-wider font-medium"
            aria-label="WhatsApp da Mindstack (abre numa nova aba)"
          >
            WhatsApp
          </a>
        </div>

        {/* Right: Copyright */}
        <div className="text-center sm:text-right text-dark-muted/70">
          <span>&copy; {new Date().getFullYear()} Mindstack</span>
        </div>
      </footer>
    </section>
  );
}
