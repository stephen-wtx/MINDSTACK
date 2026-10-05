"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  description: string;
  link: string;
  image: string;
  gridClass: string;
  aspectRatio: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "orbitta-11",
    number: "01",
    title: "Orbitta-11",
    description:
      "Uma plataforma para descobrir e explorar sites úteis, organizados por diferentes categorias e interesses.",
    link: "https://orbitta-11.vercel.app/",
    image: "/images/tech/orbitta-11.png",
    gridClass: "lg:col-span-7",
    aspectRatio: "aspect-[16/10] sm:aspect-[16/10] lg:aspect-[16/11]",
  },

  {
    id: "debate-club",
    number: "02",
    title: "Debate Club",
    description:
      "Um poster criado para divulgar um evento de debate online, com uma comunicação simples, clara e objetiva.",
    link: "",
    image: "/images/design/debate.jpeg",
    gridClass: "lg:col-span-5",
    aspectRatio: "aspect-[16/10] sm:aspect-[4/3] lg:aspect-[16/11]",
  },

  {
    id: "shop-sync",
    number: "03",
    title: "Shop Sync",
    description:
      "Um poster promocional criado para apresentar uma página de venda de contas de streaming de forma simples e visualmente atrativa.",
    link: "",
    image: "/images/design/shopsync-poster.jpg",
    gridClass: "lg:col-span-5",
    aspectRatio: "aspect-[16/10] sm:aspect-[4/3] lg:aspect-[1/1]",
  },

  {
    id: "talent-hub",
    number: "04",
    title: "Talent Hub",
    description:
      "Uma plataforma que conecta clientes a profissionais, tornando mais fácil encontrar e contratar serviços.",
    link: "https://talenthub-26tl.onrender.com",
    image: "/images/tech/talent-hub.png",
    gridClass: "lg:col-span-7",
    aspectRatio: "aspect-[16/10] sm:aspect-[16/10] lg:aspect-[16/10]",
  },

  {
    id: "campustore",
    number: "05",
    title: "CampuStore",
    description:
      "Um marketplace feito para estudantes comprarem, venderem, trocarem ou doarem materiais de forma simples.",
    link: "https://cs-psi-five.vercel.app/",
    image: "/images/tech/campustore.png",
    gridClass: "lg:col-span-12",
    aspectRatio: "aspect-[16/10] sm:aspect-[16/9] lg:aspect-[21/9] xl:aspect-[2.4/1]",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Title entrance
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // 2. Projects items staggered entrance
      if (galleryRef.current) {
        const items = galleryRef.current.querySelectorAll(".project-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. CTA button entrance
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projectos"
      className="relative w-full bg-background py-28 sm:py-36 lg:py-48 overflow-hidden border-t border-dark/10"
      aria-label="Galeria de Projectos"
    >
      <div className="w-full max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        
        {/* ─────────────────────────────────────────────────────────────
            SECTION HEADER
        ─────────────────────────────────────────────────────────────── */}
        <div className="mb-14 sm:mb-20 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2
              ref={titleRef}
              className="font-display font-black text-brand tracking-tight uppercase text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.12] sm:leading-[1.10] will-change-transform"
            >
              PROJECTOS
            </h2>
          </div>
          
          <span className="font-body text-xs sm:text-sm text-dark-muted/70 tracking-widest uppercase">
            Seleção de Trabalhos Recentes / 01 — 05
          </span>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            EDITORIAL ASYMMETRIC MASONRY GRID
        ─────────────────────────────────────────────────────────────── */}
        <div
          ref={galleryRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 xl:gap-12"
        >
          {PROJECTS_DATA.map((project) => {
            const isExternal = Boolean(project.link);
            const targetHref = isExternal ? project.link : "/projects";

            return (
              <Link
                key={project.id}
                href={targetHref}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                data-cursor-hover="true"
                className={`project-item group relative block w-full overflow-hidden rounded-xl bg-dark/5 will-change-transform ${project.gridClass} ${project.aspectRatio} focus:outline-none focus-visible:ring-2 focus-visible:ring-brand`}
                aria-label={
                  isExternal
                    ? `Ver projecto ${project.title} (abre numa nova aba)`
                    : `Ver projecto ${project.title} na página de Projectos`
                }
              >
                {/* Project Image with Subtle Scale on Hover */}
                <Image
                  src={project.image}
                  alt={`Screenshot do projecto ${project.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 60vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />

                {/* Minimal Top-Right Index Tag */}
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 px-2.5 py-1 bg-dark/60 backdrop-blur-md rounded-sm text-white/90 font-body text-xs tracking-widest uppercase pointer-events-none transition-opacity duration-300">
                  {project.number}
                </div>

                {/* Cinematic Editorial Hover / Touch Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 ease-out flex flex-col justify-end p-6 sm:p-8 md:p-10 lg:p-12 pointer-events-none">
                  
                  {/* Title and Arrow */}
                  <div className="flex items-center justify-between gap-4 transform translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <h3 className="font-display font-black text-xl sm:text-2xl md:text-[1.75rem] leading-[1.2] text-white tracking-tight uppercase">
                      {project.title}
                    </h3>

                    {/* Link Arrow Indicator */}
                    <span
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/30 flex items-center justify-center text-white text-base sm:text-lg transform translate-x-0 sm:-translate-x-1 sm:group-hover:translate-x-0 sm:group-hover:border-brand sm:group-hover:bg-brand transition-all duration-300"
                      aria-hidden="true"
                    >
                      {isExternal ? "↗" : "→"}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-body text-white/80 text-xs sm:text-sm md:text-base font-normal leading-relaxed max-w-xl mt-2.5 sm:mt-3 transform translate-y-0 sm:translate-y-2 sm:group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75">
                    {project.description}
                  </p>

                </div>
              </Link>
            );
          })}
        </div>

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM MINIMALIST CTA: VER PROJECTOS →
        ─────────────────────────────────────────────────────────────── */}
        <div
          ref={ctaRef}
          className="mt-16 sm:mt-24 lg:mt-32 flex justify-start sm:justify-end"
        >
          <Link
            href="/projects"
            data-cursor-hover="true"
            className="group inline-flex items-center gap-3 font-body text-base sm:text-lg md:text-xl font-semibold tracking-wider uppercase text-brand transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm py-2"
            aria-label="Ver todos os projectos"
          >
            <span className="relative py-1">
              VER PROJECTOS
              {/* Animated Underline */}
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-brand origin-left scale-x-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
            </span>

            {/* Micro-interaction Arrow */}
            <span
              className="inline-block font-sans text-xl transform transition-transform duration-300 ease-out group-hover:translate-x-2.5"
              aria-hidden="true"
            >
              →
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
