"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ServiceCategory {
  id: "tech" | "design";
  number: string;
  title: string;
  description: string;
  services: string[];
}

const SERVICES_DATA: ServiceCategory[] = [
  {
    id: "tech",
    number: "01",
    title: "TECH",
    description:
      "Desenvolvemos soluções digitais funcionais, escaláveis e orientadas para os desafios específicos de cada negócio.",
    services: [
      "Desenvolvimento de Websites",
      "Sistemas Web",
      "Desenvolvimento de Apps",
      "UI/UX Design",
      "Integrações e Soluções Digitais",
    ],
  },
  {
    id: "design",
    number: "02",
    title: "DESIGN",
    description:
      "Criamos identidades e conteúdos visuais consistentes, pensados para comunicar com clareza e fortalecer a presença das marcas.",
    services: [
      "Cartazes",
      "Posters",
      "Flyers",
      "Banners",
      "Edição de Imagens",
      "Edição de Vídeo",
      "Conteúdo Visual para Redes Sociais",
    ],
  },
];

export default function AboutServices() {
  const [activeCategory, setActiveCategory] = useState<"tech" | "design" | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const titleQuemSomosRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const teamLinkRef = useRef<HTMLDivElement>(null);
  const titleServicosRef = useRef<HTMLHeadingElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  const hasPlayedRef = useRef(false);

  const toggleCategory = (id: "tech" | "design") => {
    setActiveCategory((prev) => (prev === id ? null : id));
  };

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
                // Autoplay policy fallback (handled silently without breaking)
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
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.4, ease: "power2.out" }
        )
        .fromTo(
          titleQuemSomosRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
          "-=1.0"
        )
        .fromTo(
          textRef.current,
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
          "-=0.75"
        )
        .fromTo(
          teamLinkRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.6"
        );

      // Subtle atmospheric parallax for the video element
      gsap.to(videoWrapperRef.current, {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });

      // 2. Nossos Serviços Entrance Timeline
      const servicosTl = gsap.timeline({
        scrollTrigger: {
          trigger: titleServicosRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      servicosTl
        .fromTo(
          titleServicosRef.current,
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }
        )
        .fromTo(
          accordionRef.current ? accordionRef.current.children : [],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
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
        <div className="relative mb-28 sm:mb-36 lg:mb-52">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 xl:gap-20 items-center">
            
            {/* Left Column: Atmospheric 3D Video (Increased size, seamless transparent background) */}
            <div className="lg:col-span-6 xl:col-span-6 flex items-center justify-center lg:justify-start order-1">
              <div
                ref={videoWrapperRef}
                className="relative w-full max-w-[380px] sm:max-w-[480px] md:max-w-[560px] lg:max-w-[660px] xl:max-w-[760px] 2xl:max-w-[820px] aspect-square flex items-center justify-center pointer-events-none select-none will-change-transform lg:-ml-8 xl:-ml-12"
              >
                {/* 
                  mindstacki.webm: Single-play on viewport entry with seamless background removal (mix-blend-multiply).
                  NO loop attribute. Stays on final frame once completed.
                */}
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-contain mix-blend-multiply filter contrast-[1.02] bg-transparent"
                  aria-label="Mindstack 3D Character Reveal Animation"
                >
                  <source src="/videos/mindstacki.webm" type="video/webm" />
                  <source src="/videos/mindstack.webm" type="video/webm" />
                  <source src="/videos/introo.webm" type="video/webm" />
                  <source src="/videos/mindstacki.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            {/* Right Column: Editorial Typography + Team Link */}
            <div className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center text-left order-2 lg:pl-4 xl:pl-8">
              
              {/* Section Headline */}
              <h2
                ref={titleQuemSomosRef}
                className="font-display font-black text-brand tracking-tight uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 sm:mb-8 lg:mb-10 text-left will-change-transform"
              >
                QUEM SOMOS?
              </h2>

              {/* Exact Primary Copy */}
              <div className="max-w-xl lg:max-w-2xl">
                <p
                  ref={textRef}
                  className="font-body text-dark/85 text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed will-change-transform"
                >
                  Somos um grupo de jovens criativos que, em apenas um ano no mercado,
                  tem transformado desafios em soluções simples, directas e eficazes.
                  Unimos design e tecnologia para criar experiências digitais elegantes,
                  funcionais e pensadas para responder às necessidades reais dos nossos
                  clientes.
                </p>
              </div>

              {/* Refined "Nossa Team →" Link */}
              <div ref={teamLinkRef} className="mt-8 sm:mt-10 lg:mt-12 will-change-transform">
                <Link
                  href="/team.html"
                  data-cursor-hover="true"
                  className="group inline-flex items-center gap-3 font-body text-base sm:text-lg md:text-xl font-medium tracking-wide text-brand transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
                  aria-label="Conhecer a Nossa Team"
                >
                  <span className="relative py-1">
                    Nossa Team
                    {/* Minimalist animated underline */}
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] sm:h-[2px] bg-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </span>

                  {/* Micro-interaction Arrow */}
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
            PARTE 2: NOSSOS SERVIÇOS (COLLAPSIBLE / ACCORDION COM NUMERAÇÃO)
        ─────────────────────────────────────────────────────────────── */}
        <div id="servicos" className="pt-16 sm:pt-24 border-t border-dark/10">
          
          {/* Section Headline */}
          <h2
            ref={titleServicosRef}
            className="font-display font-black text-brand tracking-tight uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-12 sm:mb-16 lg:mb-20 text-left will-change-transform"
          >
            NOSSOS SERVIÇOS
          </h2>

          {/* Minimalist Editorial Accordion */}
          <div ref={accordionRef} className="w-full max-w-5xl flex flex-col">
            {SERVICES_DATA.map((category) => {
              const isOpen = activeCategory === category.id;

              return (
                <div
                  key={category.id}
                  className="border-b border-dark/15 transition-colors duration-300"
                >
                  {/* Category Header Bar */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    aria-expanded={isOpen}
                    aria-controls={`services-${category.id}`}
                    data-cursor-hover="true"
                    className="w-full py-7 sm:py-9 md:py-11 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm transition-colors duration-200"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6 md:gap-8">
                      {/* Category Number */}
                      <span className="font-body text-xs sm:text-sm md:text-base font-semibold tracking-widest text-brand/80 uppercase">
                        {category.number}
                      </span>
                      {/* Category Title */}
                      <span className="font-display font-black text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-dark tracking-tight uppercase transition-colors duration-200 group-hover:text-brand">
                        {category.title}
                      </span>
                    </div>

                    {/* Minimalist Custom + / − Toggle Indicator */}
                    <span
                      className="relative w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-dark/70 group-hover:text-brand transition-colors duration-200"
                      aria-hidden="true"
                    >
                      {/* Horizontal Bar */}
                      <span className="absolute w-5 sm:w-6 h-[2px] bg-current rounded-full transition-transform duration-300" />
                      {/* Vertical Bar (Rotates/scales out on open) */}
                      <span
                        className={`absolute w-5 sm:w-6 h-[2px] bg-current rounded-full transition-all duration-300 ease-in-out ${
                          isOpen ? "rotate-90 scale-0 opacity-0" : "rotate-90 scale-100 opacity-100"
                        }`}
                      />
                    </span>
                  </button>

                  {/* Animated Collapsible Content */}
                  <div
                    id={`services-${category.id}`}
                    className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 pb-10 sm:pb-12"
                        : "grid-rows-[0fr] opacity-0 pb-0"
                    }`}
                  >
                    <div className="overflow-hidden pl-7 sm:pl-10 md:pl-14">
                      
                      {/* Short Category Description */}
                      <p className="font-body text-dark-muted text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl mb-8 sm:mb-10">
                        {category.description}
                      </p>

                      {/* Numbered Services List */}
                      <ul className="flex flex-col space-y-3.5 sm:space-y-4">
                        {category.services.map((service, index) => {
                          const itemNumber = String(index + 1).padStart(2, "0");

                          return (
                            <li
                              key={service}
                              className={`flex items-baseline gap-4 sm:gap-6 font-body text-dark/85 text-base sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed transition-all duration-300 ease-out ${
                                isOpen
                                  ? "translate-y-0 opacity-100"
                                  : "translate-y-2 opacity-0"
                              }`}
                              style={{
                                transitionDelay: isOpen ? `${index * 45 + 50}ms` : "0ms",
                              }}
                            >
                              {/* Discrete Numbering */}
                              <span className="font-body text-xs sm:text-sm font-medium text-dark-muted/60 tracking-wider">
                                {itemNumber}
                              </span>
                              {/* Service Name */}
                              <span className="hover:text-brand transition-colors duration-200">
                                {service}
                              </span>
                            </li>
                          );
                        })}
                      </ul>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
