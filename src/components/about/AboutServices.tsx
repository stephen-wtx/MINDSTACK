"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─────────────────────────────────────────────────────────────────────────
   SERVICES DATA
   Estrutura das duas categorias da master, enriquecidas com as descrições
   individuais desenvolvidas nesta branch.
───────────────────────────────────────────────────────────────────────── */
interface ServiceItem {
  number: string;
  title: string;
  description: string;
}

interface ServiceCategory {
  id: "tech" | "design";
  title: string;
  description: string;
  services: ServiceItem[];
}

const SERVICES_DATA: ServiceCategory[] = [
  {
    id: "tech",
    title: "TECNOLOGIA",
    description:
      "Desenvolvemos soluções digitais funcionais, escaláveis e orientadas para os desafios específicos de cada negócio.",
    services: [
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
        title: "Integrações e Soluções Digitais",
        description:
          "Integração de ferramentas e tecnologias para criar fluxos digitais mais eficientes e conectados.",
      },
    ],
  },
  {
    id: "design",
    title: "DESIGN",
    description:
      "Criamos identidades e conteúdos visuais consistentes, pensados para comunicar com clareza e fortalecer a presença das marcas.",
    services: [
      {
        number: "01",
        title: "UI/UX Design",
        description:
          "Interfaces claras e experiências digitais estruturadas para equilibrar estética, usabilidade e consistência.",
      },
      {
        number: "02",
        title: "Cartazes e Flyers",
        description:
          "Materiais impressos e digitais de comunicação visual, desenvolvidos para atrair atenção e transmitir mensagens com impacto.",
      },
      {
        number: "03",
        title: "Banners e Conteúdo Visual",
        description:
          "Conteúdo visual para plataformas digitais e redes sociais, criado para fortalecer a identidade e aumentar o alcance das marcas.",
      },
      {
        number: "04",
        title: "Edição de Imagem e Vídeo",
        description:
          "Pós-produção de imagem e vídeo para campanhas, redes sociais e apresentações, com foco em qualidade e consistência visual.",
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────────────────────────────────── */
export default function AboutServices() {
  const [openCategory, setOpenCategory] = useState<"tech" | "design" | null>(null);

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
    setOpenCategory((prev) => (prev === id ? null : id));
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
          accordionRef.current ? accordionRef.current.children : [],
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
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

            {/* Left Column: Video — transparent background via mix-blend-multiply */}
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
                  text-[clamp(2rem,4.5vw,3.75rem)]
                  leading-[1.12] sm:leading-[1.10]
                  mb-6 sm:mb-8 lg:mb-10"
              >
                QUEM SOMOS?
              </h2>

              {/* Primary Copy */}
              <div className="max-w-xl lg:max-w-2xl">
                <p
                  ref={textRef}
                  className="font-body text-dark/80 font-normal leading-[1.75]
                    text-base sm:text-lg md:text-xl lg:text-[1.2rem]
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
                  href="/team"
                  data-cursor-hover="true"
                  className="group inline-flex items-center gap-3 font-body text-base sm:text-lg font-medium tracking-wide text-brand transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
                  aria-label="Conhecer a Nossa Team"
                >
                  <span className="relative py-1">
                    Nossa Team
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] sm:h-[2px] bg-brand origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </span>
                  <span
                    className="inline-block text-lg transition-transform duration-300 ease-out group-hover:translate-x-2"
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
            PARTE 2: NOSSOS SERVIÇOS — ACCORDION TECNOLOGIA / DESIGN
            Fechado por default. Cada categoria é independente.
        ─────────────────────────────────────────────────────────────── */}
        <div id="servicos" className="pt-16 sm:pt-24 border-t border-dark/10">

          {/* Section Headline */}
          <h2
            ref={titleServicosRef}
            className="font-display font-black text-brand tracking-tight uppercase will-change-transform
              text-[clamp(2rem,4.5vw,3.75rem)]
              leading-[1.12] sm:leading-[1.10]
              mb-8 sm:mb-12 lg:mb-14"
          >
            NOSSOS SERVIÇOS
          </h2>

          {/* Accordion — TECNOLOGIA + DESIGN */}
          <div ref={accordionRef} className="w-full flex flex-col">
            {SERVICES_DATA.map((category) => {
              const isOpen = openCategory === category.id;

              return (
                <div
                  key={category.id}
                  className="border-b border-dark/12"
                >
                  {/* ── Category Header / Toggle Button ── */}
                  <button
                    type="button"
                    onClick={() => toggleCategory(category.id)}
                    aria-expanded={isOpen}
                    aria-controls={`accordion-${category.id}`}
                    data-cursor-hover="true"
                    className="w-full py-7 sm:py-9 md:py-10 flex items-center justify-between text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm transition-colors duration-200"
                  >
                    {/* Category Title */}
                    <span
                      className={`font-display font-black tracking-tight uppercase
                        text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem]
                        leading-[1.18] sm:leading-[1.14]
                        transition-colors duration-200
                        ${isOpen ? "text-brand" : "text-dark group-hover:text-brand"}`}
                    >
                      {category.title}
                    </span>

                    {/* + / − Toggle Icon */}
                    <span
                      className={`relative w-8 h-8 flex-shrink-0 flex items-center justify-center transition-colors duration-200 ${isOpen ? "text-brand" : "text-dark/50 group-hover:text-brand"}`}
                      aria-hidden="true"
                    >
                      {/* Horizontal bar — always visible */}
                      <span className="absolute w-5 h-[1.5px] bg-current rounded-full" />
                      {/* Vertical bar — hidden when open */}
                      <span
                        className={`absolute w-5 h-[1.5px] bg-current rounded-full rotate-90 transition-all duration-300 ease-in-out ${
                          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
                        }`}
                      />
                    </span>
                  </button>

                  {/* ── Animated Collapsible Content ── */}
                  <div
                    id={`accordion-${category.id}`}
                    role="region"
                    className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {/* Category description */}
                      <p className="font-body text-dark-muted text-sm sm:text-base font-normal leading-relaxed max-w-2xl mb-10 sm:mb-12">
                        {category.description}
                      </p>

                      {/* Services — 2 columns on desktop, 1 on mobile */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-10 sm:mb-14">
                        {category.services.map((service, index) => (
                          <div
                            key={service.number}
                            className={`
                              group/item relative
                              border-t border-dark/10
                              py-8 sm:py-10
                              ${index % 2 === 0
                                ? "md:pr-10 lg:pr-14"
                                : "md:pl-10 lg:pl-14 md:border-l md:border-dark/10"}
                              ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                              transition-all duration-300 ease-out
                            `}
                            style={{
                              transitionDelay: isOpen ? `${index * 55 + 60}ms` : "0ms",
                            }}
                          >
                            {/* Number + Title */}
                            <div className="flex items-start gap-5 sm:gap-6 mb-3 sm:mb-4">
                              {/* Discrete number */}
                              <span className="font-body text-xs font-semibold tracking-widest text-brand/60 uppercase mt-[3px] flex-shrink-0 w-5">
                                {service.number}
                              </span>

                              {/* Service title */}
                              <h3 className="font-body font-semibold text-dark tracking-tight
                                text-lg sm:text-xl
                                leading-snug
                                group-hover/item:text-brand transition-colors duration-200">
                                {service.title}
                              </h3>
                            </div>

                            {/* Description */}
                            <p className="font-body text-dark-muted font-normal leading-relaxed
                              text-sm
                              pl-[2.5rem] sm:pl-[2.75rem]
                              max-w-sm">
                              {service.description}
                            </p>
                          </div>
                        ))}

                        {/* Bottom border if odd number of services */}
                        {category.services.length % 2 !== 0 && (
                          <div className="border-t border-dark/10" />
                        )}
                        {/* Full-width bottom border */}
                        <div className={`col-span-1 md:col-span-2 border-t border-dark/10 ${category.services.length % 2 !== 0 ? "hidden md:block" : ""}`} />
                      </div>
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
