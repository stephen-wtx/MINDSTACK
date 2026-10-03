"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─────────────────────────────────────────────────────────────────────────
   SERVICES DATA — Individual 5-item grid (editorial, não accordion)
───────────────────────────────────────────────────────────────────────── */
interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Desenvolvimento de Websites",
    description:
      "Websites responsivos e personalizados, desenvolvidos para apresentar marcas, serviços e experiências digitais com clareza.",
  },
  {
    number: "02",
    title: "Sistemas Web",
    description:
      "Plataformas web funcionais para optimizar processos, centralizar informação e responder às necessidades específicas de cada negócio.",
  },
  {
    number: "03",
    title: "Desenvolvimento de Apps",
    description:
      "Aplicações digitais pensadas para proporcionar experiências simples, funcionais e adaptadas aos seus utilizadores.",
  },
  {
    number: "04",
    title: "UI/UX Design",
    description:
      "Interfaces claras e experiências digitais estruturadas para equilibrar estética, usabilidade e consistência.",
  },
  {
    number: "05",
    title: "Integrações e Soluções Digitais",
    description:
      "Integração de ferramentas e tecnologias para criar fluxos digitais mais eficientes e conectados.",
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────── */
export default function AboutServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const titleQuemSomosRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const teamLinkRef = useRef<HTMLDivElement>(null);
  const titleServicosRef = useRef<HTMLHeadingElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);

  const hasPlayedRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Single-play trigger for mindstacki.webm on viewport entry
    const video = videoRef.current;
    if (video) {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
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
        once: true,
      });
    }

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Quem Somos Entrance Timeline
      const quemSomosTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none none",
        },
      });

      quemSomosTl
        .fromTo(
          videoWrapperRef.current,
          { opacity: 0, scale: 0.96, y: 24 },
          { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "power2.out" }
        )
        .fromTo(
          titleQuemSomosRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
          "-=1.0"
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
          "-=0.75"
        )
        .fromTo(
          teamLinkRef.current,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );

      // Subtle atmospheric parallax for the video element
      gsap.to(videoWrapperRef.current, {
        y: -36,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // 2. Nossos Serviços Entrance
      const servicosTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleServicosRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
      });

      servicosTl
        .fromTo(
          titleServicosRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }
        )
        .fromTo(
          servicesGridRef.current ? servicesGridRef.current.children : [],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.1,
            ease: "power3.out",
          },
          "-=0.6"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="quem-somos"
      className="relative w-full bg-background py-28 sm:py-36 lg:py-48 overflow-hidden"
      aria-label="Quem Somos e Nossos Serviços"
    >
      <div className="relative z-10 w-full max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">

        {/* ─────────────────────────────────────────────────────────────
            PARTE 1: QUEM SOMOS? (COMPOSIÇÃO ASSIMÉTRICA VÍDEO + TEXTO)
        ─────────────────────────────────────────────────────────────── */}
        <div className="relative mb-32 sm:mb-40 lg:mb-56">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">

            {/* Left Column: Video — transparent background via mix-blend-multiply
                Works correctly because our background is light (#F7F7F6).
                If mindstacki.webm has alpha, mix-blend-multiply still works cleanly.
                Video is deliberately slightly larger for more compositional presence. */}
            <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center lg:justify-start order-1">
              <div
                ref={videoWrapperRef}
                className="relative w-full
                  max-w-[340px] sm:max-w-[460px] md:max-w-[560px]
                  lg:max-w-[640px] xl:max-w-[720px] 2xl:max-w-[800px]
                  aspect-square flex items-center justify-center
                  pointer-events-none select-none will-change-transform
                  lg:-ml-6 xl:-ml-10"
              >
                {/*
                  mindstacki.webm: single-play on viewport entry.
                  mix-blend-multiply removes the white/light background from the video,
                  making the animation appear to float over the page background.
                  NO loop. Stays on final frame once completed.
                */}
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain mix-blend-multiply bg-transparent"
                  aria-label="Mindstack 3D Character Reveal Animation"
                >
                  <source src="/videos/mindstacki.webm" type="video/webm" />
                  <source src="/videos/mindstack.webm" type="video/webm" />
                  <source src="/videos/mindstacki.MP4" type="video/mp4" />
                  <source src="/videos/mindstack.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Right Column: Editorial Typography + Team Link */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center text-left order-2 lg:pl-6 xl:pl-10">

              {/* Section Headline */}
              <h2
                ref={titleQuemSomosRef}
                className="font-display font-black text-brand tracking-tight uppercase will-change-transform
                  text-[clamp(2.75rem,6vw,6.5rem)]
                  leading-[0.96]
                  mb-8 sm:mb-10 lg:mb-12"
              >
                QUEM SOMOS?
              </h2>

              {/* Primary Copy — breathing room between lines */}
              <div className="max-w-xl lg:max-w-2xl">
                <p
                  ref={textRef}
                  className="font-body text-dark/80 font-normal leading-[1.75]
                    text-base sm:text-lg md:text-xl lg:text-[1.25rem]
                    will-change-transform"
                >
                  Somos um grupo de jovens criativos que, em apenas um ano no mercado,
                  tem transformado desafios em soluções simples, directas e eficazes.
                  Unimos design e tecnologia para criar experiências digitais elegantes,
                  funcionais e pensadas para responder às necessidades reais dos nossos
                  clientes.
                </p>
              </div>

              {/* Nossa Team → Link */}
              <div ref={teamLinkRef} className="mt-10 sm:mt-12 lg:mt-14 will-change-transform">
                <Link
                  href="/team.html"
                  data-cursor-hover="true"
                  className="group inline-flex items-center gap-3 font-body text-base sm:text-lg md:text-xl font-medium tracking-wide text-brand transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
                  aria-label="Conhecer a Nossa Team"
                >
                  <span className="relative py-1">
                    Nossa Team
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] sm:h-[2px] bg-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </span>
                  <span
                    className="inline-block font-sans text-lg sm:text-xl transform transition-transform duration-300 ease-out group-hover:translate-x-2"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </div>

            </div>

          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            PARTE 2: NOSSOS SERVIÇOS — EDITORIAL 2-COLUMN GRID
            Desktop: 2 cols · Mobile: 1 col
            No accordion. Each service has number + title + description.
        ─────────────────────────────────────────────────────────────── */}
        <div id="servicos" className="pt-16 sm:pt-24 border-t border-dark/10">

          {/* Section Headline */}
          <h2
            ref={titleServicosRef}
            className="font-display font-black text-brand tracking-tight uppercase will-change-transform
              text-[clamp(2.75rem,6vw,6.5rem)]
              leading-[0.96]
              mb-14 sm:mb-20 lg:mb-24"
          >
            NOSSOS SERVIÇOS
          </h2>

          {/* Services Grid — editorial 2 columns */}
          <div
            ref={servicesGridRef}
            className="grid grid-cols-1 md:grid-cols-2 gap-0"
          >
            {SERVICES.map((service, index) => {
              const isLastOdd = index === SERVICES.length - 1 && SERVICES.length % 2 !== 0;

              return (
                <div
                  key={service.number}
                  className={`
                    group relative
                    border-t border-dark/10
                    py-10 sm:py-12 lg:py-14
                    ${index % 2 === 0 ? "md:pr-12 lg:pr-16 xl:pr-20" : "md:pl-12 lg:pl-16 xl:pl-20 md:border-l md:border-dark/10"}
                    ${isLastOdd ? "md:col-span-2 md:border-r-0 md:max-w-[50%]" : ""}
                    transition-colors duration-200
                  `}
                >
                  {/* Number + Title row */}
                  <div className="flex items-start gap-5 sm:gap-7 mb-4 sm:mb-5">
                    {/* Discrete number */}
                    <span className="font-body text-xs font-semibold tracking-widest text-brand/70 uppercase mt-1 flex-shrink-0 w-6">
                      {service.number}
                    </span>

                    {/* Service title */}
                    <h3 className="font-body font-semibold text-dark tracking-tight
                      text-lg sm:text-xl md:text-2xl lg:text-[1.5rem]
                      leading-snug
                      group-hover:text-brand transition-colors duration-200">
                      {service.title}
                    </h3>
                  </div>

                  {/* Description — offset to align with title */}
                  <p className="font-body text-dark-muted font-normal leading-relaxed
                    text-sm sm:text-base
                    pl-[2.75rem] sm:pl-[3.25rem]
                    max-w-md">
                    {service.description}
                  </p>
                </div>
              );
            })}

            {/* Bottom border line across both columns */}
            <div className="col-span-1 md:col-span-2 border-t border-dark/10" />
          </div>

        </div>

      </div>
    </section>
  );
}
