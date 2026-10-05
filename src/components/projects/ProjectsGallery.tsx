"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";

/* ─────────────────────────────────────────────────────────────
   TYPES & DATA DEFINITIONS
─────────────────────────────────────────────────────────────── */

interface TechProject {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  link?: string;
  image: string;
  year?: string;
}

interface DesignWork {
  id: string;
  number: string;
  title: string;
  category: string;
  image: string;
  aspectClass: string;
  isWide?: boolean;
}

const TECH_PROJECTS: TechProject[] = [
  {
    id: "orbitta-11",
    number: "01",
    title: "Orbitta-11",
    category: "Web Application / Diretório",
    description:
      "Uma plataforma para descobrir e explorar sites úteis, organizados por diferentes categorias e interesses.",
    link: "https://orbitta-11.vercel.app/",
    image: "/images/tech/orbitta-11.png",
    year: "2025",
  },
  {
    id: "campustore",
    number: "02",
    title: "CampuStore",
    category: "Marketplace Estudantil",
    description:
      "Um marketplace feito para estudantes comprarem, venderem, trocarem ou doarem materiais de forma simples.",
    link: "https://cs-psi-five.vercel.app/",
    image: "/images/tech/campustore.png",
    year: "2025",
  },
  {
    id: "sweet-world",
    number: "03",
    title: "Sweet World",
    category: "E-Commerce / Confeitaria",
    description:
      "Plataforma digital para apresentação e encomenda de sobremesas e confeitaria artesanal com interface fluida.",
    link: "https://sweet-world.onrender.com",
    image: "/images/tech/sweet-world.png",
    year: "2025",
  },
  {
    id: "take-away-rui-jr",
    number: "04",
    title: "Take Away Rui Jr",
    category: "Food Service / Pedidos Online",
    description:
      "Sistema digital para pedidos e takeaway com experiência simplificada e direta ao cliente.",
    link: "https://tak-away.vercel.app",
    image: "/images/tech/take-away-rui-jr.png",
    year: "2025",
  },
  {
    id: "talent-hub",
    number: "05",
    title: "Talent Hub",
    category: "Plataforma de Talentos & Serviços",
    description:
      "Uma plataforma que conecta clientes a profissionais, tornando mais fácil encontrar e contratar serviços.",
    link: "https://talenthub-26tl.onrender.com",
    image: "/images/tech/talent-hub.png",
    year: "2025",
  },
];

const DESIGN_WORKS: DesignWork[] = [
  {
    id: "dia-vitoria",
    number: "01",
    title: "Dia da Vitória",
    category: "Poster Editorial / Tipografia",
    image: "/images/design/dia-vitoria-poster.jpg",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: "shopsync-poster",
    number: "02",
    title: "ShopSync Poster",
    category: "Visual Design & Advertising",
    image: "/images/design/shopsync-poster.jpg",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: "absolute-cinema-ticket",
    number: "03",
    title: "Absolute Cinema — Ticket",
    category: "Ticket & Graphic Identity",
    image: "/images/design/ABSOLUTE CINEMA - TICKET.jpg",
    aspectClass: "aspect-[16/5.2] sm:aspect-[20/6.5]",
    isWide: true,
  },
  {
    id: "debate-club",
    number: "04",
    title: "Debate Club",
    category: "Event Poster / Comunicação",
    image: "/images/design/debate.jpeg",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: "cinema",
    number: "05",
    title: "Cinema Poster",
    category: "Editorial & Film Artwork",
    image: "/images/design/cinema.jpg",
    aspectClass: "aspect-[4/5.6]",
  },
  {
    id: "1-de-maio",
    number: "06",
    title: "1 de Maio",
    category: "Poster Tipográfico / Editorial",
    image: "/images/design/1 de maio.jpeg",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: "apple-service",
    number: "07",
    title: "Apple Service",
    category: "Brand Editorial / Design",
    image: "/images/design/Apple Service.jpg",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: "apple-service-122",
    number: "08",
    title: "Apple Service 1.22",
    category: "Visual Concept & Poster",
    image: "/images/design/Apple Service1.22.jpg",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: "bag-packaging",
    number: "09",
    title: "Packaging Design",
    category: "Brand Collateral & Mockup",
    image: "/images/design/bag-3.1.jpg",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: "capa-de-musica",
    number: "10",
    title: "Capa de Música",
    category: "Music Artwork & Cover Design",
    image: "/images/design/capa de musica.jpg",
    aspectClass: "aspect-[4/5]",
  },
  {
    id: "citacao-editorial",
    number: "11",
    title: "Citação Editorial",
    category: "Poster Tipográfico Minimalista",
    image: "/images/design/citacao.jpg",
    aspectClass: "aspect-[3/4]",
  },
  {
    id: "coconut-oil",
    number: "12",
    title: "Coconut Oil",
    category: "Logotipo & Identidade Visual",
    image: "/images/design/cocont oil logo.jpeg",
    aspectClass: "aspect-[1/1]",
  },
];

type CategoryTab = "tech" | "design";

export default function ProjectsGallery() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<CategoryTab>("tech");
  const [selectedDesignIndex, setSelectedDesignIndex] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const galleryWrapperRef = useRef<HTMLDivElement>(null);
  const tabIndicatorRef = useRef<HTMLSpanElement>(null);
  const techBtnRef = useRef<HTMLButtonElement>(null);
  const designBtnRef = useRef<HTMLButtonElement>(null);

  // 1. Back button navigation
  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  // 2. Sliding indicator position for categories
  const updateTabIndicator = useCallback((tab: CategoryTab) => {
    const targetBtn = tab === "tech" ? techBtnRef.current : designBtnRef.current;
    const indicator = tabIndicatorRef.current;

    if (!targetBtn || !indicator) return;

    gsap.to(indicator, {
      x: targetBtn.offsetLeft,
      width: targetBtn.offsetWidth,
      duration: 0.35,
      ease: "power3.out",
    });
  }, []);

  useEffect(() => {
    updateTabIndicator(activeTab);
  }, [activeTab, updateTabIndicator]);

  // Handle window resize for category indicator
  useEffect(() => {
    const handleResize = () => updateTabIndicator(activeTab);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeTab, updateTabIndicator]);

  // 3. Fast & elegant category transition
  const handleTabSwitch = (newTab: CategoryTab) => {
    if (newTab === activeTab) return;

    const wrapper = galleryWrapperRef.current;
    if (!wrapper) {
      setActiveTab(newTab);
      return;
    }

    gsap.to(wrapper, {
      opacity: 0,
      y: 12,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => {
        setActiveTab(newTab);
        // Scroll slightly back up to top of gallery if scrolled down
        const galleryTop = wrapper.getBoundingClientRect().top + window.scrollY - 200;
        if (window.scrollY > galleryTop) {
          window.scrollTo({ top: galleryTop, behavior: "smooth" });
        }
        gsap.fromTo(
          wrapper,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.35, ease: "power3.out" }
        );
      },
    });
  };

  // 4. Lightbox Keyboard navigation & scroll locking
  useEffect(() => {
    if (selectedDesignIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedDesignIndex(null);
      } else if (e.key === "ArrowRight") {
        setSelectedDesignIndex((prev) =>
          prev !== null ? (prev + 1) % DESIGN_WORKS.length : null
        );
      } else if (e.key === "ArrowLeft") {
        setSelectedDesignIndex((prev) =>
          prev !== null ? (prev - 1 + DESIGN_WORKS.length) % DESIGN_WORKS.length : null
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedDesignIndex]);

  const activeModalItem =
    selectedDesignIndex !== null ? DESIGN_WORKS[selectedDesignIndex] : null;

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-background pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-28"
      aria-label="Galeria Completa de Projectos"
    >
      <div className="w-full max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        
        {/* ─────────────────────────────────────────────────────────────
            TOP ROW: ← VOLTAR
        ─────────────────────────────────────────────────────────────── */}
        <div className="mb-10 sm:mb-14">
          <button
            type="button"
            onClick={handleBack}
            data-cursor-hover="true"
            className="group inline-flex items-center gap-2.5 font-body text-xs sm:text-sm font-semibold tracking-widest uppercase text-dark/70 hover:text-brand transition-colors duration-200 py-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm"
            aria-label="Voltar para a página anterior"
          >
            <span
              className="inline-block transform transition-transform duration-300 ease-out group-hover:-translate-x-1.5 font-sans text-base sm:text-lg"
              aria-hidden="true"
            >
              ←
            </span>
            <span>Voltar</span>
          </button>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            HERO EDITORIAL: PROJECTS TITLE & SUBTITLE
        ─────────────────────────────────────────────────────────────── */}
        <div className="max-w-4xl mb-16 sm:mb-20 lg:mb-24">
          <h1 className="font-display font-black text-brand tracking-tight uppercase text-[clamp(2.75rem,7vw,5.75rem)] leading-none select-none">
            PROJECTS
          </h1>
          <p className="mt-6 sm:mt-8 font-body text-dark/85 text-xl sm:text-2xl md:text-3xl font-normal leading-snug tracking-tight max-w-xl">
            Uma selecção dos nossos trabalhos<br />
            em Design e Tecnologia.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            CATEGORY NAVIGATION: TECH / DESIGN (MINIMALIST TABS)
            No cards, no pills, no giant buttons, no neon, no heavy backgrounds.
        ─────────────────────────────────────────────────────────────── */}
        <div className="border-b border-dark/10 relative mb-16 sm:mb-24 flex items-center">
          <div className="relative flex items-center gap-10 sm:gap-14">
            {/* TECH BUTTON */}
            <button
              ref={techBtnRef}
              type="button"
              onClick={() => handleTabSwitch("tech")}
              data-cursor-hover="true"
              className={`relative py-3.5 sm:py-4 font-body text-xs sm:text-sm tracking-widest uppercase transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm ${
                activeTab === "tech"
                  ? "text-brand font-bold"
                  : "text-dark/55 hover:text-dark font-medium"
              }`}
              aria-label="Ver projectos de Tecnologia"
              aria-selected={activeTab === "tech"}
              role="tab"
            >
              <span>TECH</span>
            </button>

            {/* DESIGN BUTTON */}
            <button
              ref={designBtnRef}
              type="button"
              onClick={() => handleTabSwitch("design")}
              data-cursor-hover="true"
              className={`relative py-3.5 sm:py-4 font-body text-xs sm:text-sm tracking-widest uppercase transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm ${
                activeTab === "design"
                  ? "text-brand font-bold"
                  : "text-dark/55 hover:text-dark font-medium"
              }`}
              aria-label="Ver projectos de Design"
              aria-selected={activeTab === "design"}
              role="tab"
            >
              <span>DESIGN</span>
            </button>

            {/* Continuous Animated Underline Indicator */}
            <span
              ref={tabIndicatorRef}
              className="absolute bottom-0 left-0 h-[2px] bg-brand pointer-events-none will-change-transform"
              style={{ width: 0 }}
            />
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            GALLERY CONTAINER (SWITCHES BETWEEN TECH AND DESIGN)
        ─────────────────────────────────────────────────────────────── */}
        <div ref={galleryWrapperRef} className="will-change-transform">
          
          {/* ═══════════════════════════════════════════════════════════
              CATEGORY 1: TECH (LARGE-SCALE EDITORIAL SHOWCASE)
              No cards, no small masonry. Generous scale & negative space.
          ═══════════════════════════════════════════════════════════ */}
          {activeTab === "tech" && (
            <div className="space-y-24 sm:space-y-36 lg:space-y-44">
              {TECH_PROJECTS.map((project, index) => {
                const ContentWrapper = project.link ? "a" : "div";
                const wrapperProps = project.link
                  ? {
                      href: project.link,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      "data-cursor-hover": "true",
                      "aria-label": `Abrir projecto ${project.title} (nova aba)`,
                    }
                  : {};

                return (
                  <article
                    key={project.id}
                    className="w-full flex flex-col group focus-within:ring-2 focus-within:ring-brand rounded-2xl"
                  >
                    {/* Project Header Info */}
                    <div className="mb-6 sm:mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
                      <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-2 sm:mb-3">
                          <span className="font-body text-xs font-semibold tracking-widest text-brand uppercase">
                            {project.number}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-dark/20" />
                          <span className="font-body text-xs tracking-wider text-dark-muted uppercase font-medium">
                            {project.category}
                          </span>
                        </div>
                        <h2 className="font-display font-black text-2xl sm:text-3xl md:text-4xl text-dark tracking-tight uppercase group-hover:text-brand transition-colors duration-200">
                          {project.title}
                        </h2>
                        <p className="mt-2.5 sm:mt-3 font-body text-sm sm:text-base text-dark-muted/90 font-normal leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* External Link Indicator */}
                      {project.link && (
                        <ContentWrapper
                          {...wrapperProps}
                          className="inline-flex items-center gap-2 font-body text-xs sm:text-sm font-semibold tracking-widest uppercase text-brand group-hover:text-brand-deep transition-colors duration-200 py-1"
                        >
                          <span className="relative">
                            Visitar Projecto
                            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-brand origin-left scale-x-0 group-hover:scale-100 transition-transform duration-300" />
                          </span>
                          <span
                            className="inline-block transform transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1 font-sans text-base"
                            aria-hidden="true"
                          >
                            ↗
                          </span>
                        </ContentWrapper>
                      )}
                    </div>

                    {/* Large Scale Visual Showcase Container */}
                    <ContentWrapper
                      {...wrapperProps}
                      className="relative block w-full aspect-[16/9] sm:aspect-[16/8.5] lg:aspect-[16/8] xl:aspect-[21/9] rounded-xl sm:rounded-2xl overflow-hidden border border-dark/10 bg-dark/5 will-change-transform shadow-sm"
                    >
                      <Image
                        src={project.image}
                        alt={`Screenshot em grande escala do projecto ${project.title}`}
                        fill
                        priority={index === 0}
                        loading={index === 0 ? "eager" : "lazy"}
                        decoding="async"
                        sizes="(max-width: 1024px) 100vw, 1720px"
                        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.018]"
                      />
                      {/* Subtle hover gradient */}
                      <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/[0.04] transition-colors duration-300 pointer-events-none" />
                    </ContentWrapper>
                  </article>
                );
              })}
            </div>
          )}

          {/* ═══════════════════════════════════════════════════════════
              CATEGORY 2: DESIGN (HIGH VISUAL SCALE & FULLSCREEN LIGHTBOX)
              Large editorial presentation, click to view full resolution.
          ═══════════════════════════════════════════════════════════ */}
          {activeTab === "design" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
              {DESIGN_WORKS.map((work, index) => {
                const isWide = work.isWide;

                return (
                  <article
                    key={work.id}
                    onClick={() => setSelectedDesignIndex(index)}
                    data-cursor-hover="true"
                    className={`group relative flex flex-col cursor-pointer ${
                      isWide ? "md:col-span-2" : "col-span-1"
                    } focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-2xl`}
                    tabIndex={0}
                    role="button"
                    aria-label={`Visualizar trabalho ${work.title} em ecrã inteiro`}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedDesignIndex(index);
                      }
                    }}
                  >
                    {/* Image Frame */}
                    <div
                      className={`relative w-full ${work.aspectClass} rounded-xl sm:rounded-2xl overflow-hidden border border-dark/10 bg-dark/5 transition-transform duration-500 ease-out group-hover:shadow-md will-change-transform`}
                    >
                      <Image
                        src={work.image}
                        alt={`Trabalho gráfico ${work.title}`}
                        fill
                        loading={index < 2 ? "eager" : "lazy"}
                        decoding="async"
                        sizes={
                          isWide
                            ? "(max-width: 1024px) 100vw, 1720px"
                            : "(max-width: 768px) 100vw, 860px"
                        }
                        className="object-contain sm:object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                      />

                      {/* Minimalist Hover Indicator: + Ampliar */}
                      <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <span className="px-4 py-2 bg-dark/85 backdrop-blur-md rounded-full text-white font-body text-xs sm:text-sm font-medium tracking-widest uppercase transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          + Ampliar
                        </span>
                      </div>

                      {/* Top-Right Number Tag */}
                      <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-dark/70 backdrop-blur-md rounded-sm text-white/90 font-body text-xs tracking-widest uppercase pointer-events-none">
                        {work.number}
                      </div>
                    </div>

                    {/* Metadata below image */}
                    <div className="mt-4 sm:mt-5 flex items-center justify-between gap-4">
                      <div>
                        <h2 className="font-display font-black text-lg sm:text-xl md:text-2xl text-dark tracking-tight uppercase group-hover:text-brand transition-colors duration-200">
                          {work.title}
                        </h2>
                        <span className="font-body text-xs sm:text-sm text-dark-muted font-medium tracking-wider uppercase">
                          {work.category}
                        </span>
                      </div>

                      <span
                        className="text-dark/40 group-hover:text-brand text-xs sm:text-sm font-body tracking-wider uppercase font-semibold transition-colors duration-200"
                        aria-hidden="true"
                      >
                        [ Ver ]
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          LIGHTBOX / MODAL: MINIMALIST FHD VISUALIZATION
          Structure:
          ┌─────────────────────────────────────┐
          │                              ×      │
          │                                     │
          │          IMAGEM COMPLETA            │
          │                                     │
          │                                     │
          └─────────────────────────────────────┘
          - No card inside modal
          - No exaggerated shadows, gradients, or extra decoration
          - object-fit: contain (exact original proportions, no distortion)
          - Close via ×, click backdrop, or Escape key
          - Accessible navigation with Left/Right arrows
      ─────────────────────────────────────────────────────────────── */}
      {activeModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Visualização em ecrã inteiro de ${activeModalItem.title}`}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6 md:p-8 select-none animate-fadeIn"
          onClick={() => setSelectedDesignIndex(null)}
        >
          {/* Top Bar: Title & Close Button (×) */}
          <div
            className="w-full flex items-center justify-between z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Work Info */}
            <div className="flex items-center gap-3 text-white/80">
              <span className="font-body text-xs font-bold text-brand uppercase tracking-widest">
                {activeModalItem.number}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
              <span className="font-display text-sm sm:text-base font-bold text-white tracking-tight uppercase">
                {activeModalItem.title}
              </span>
              <span className="hidden sm:inline font-body text-xs text-white/50 tracking-wider uppercase">
                — {activeModalItem.category}
              </span>
            </div>

            {/* Minimalist × Close Button */}
            <button
              type="button"
              onClick={() => setSelectedDesignIndex(null)}
              data-cursor-hover="true"
              className="w-11 h-11 flex items-center justify-center text-white/80 hover:text-brand transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-full text-2xl font-light"
              aria-label="Fechar visualização ampliada (Escape)"
            >
              ×
            </button>
          </div>

          {/* Central Image: Full Scale with Contain */}
          <div
            className="relative flex-1 w-full flex items-center justify-center my-3 sm:my-4 overflow-hidden pointer-events-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full max-w-[92vw] max-h-[82vh] sm:max-w-[88vw] sm:max-h-[86vh] flex items-center justify-center">
              <Image
                src={activeModalItem.image}
                alt={`Visualização completa de ${activeModalItem.title}`}
                fill
                priority
                sizes="100vw"
                className="object-contain pointer-events-auto"
              />
            </div>

            {/* Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDesignIndex((prev) =>
                  prev !== null ? (prev - 1 + DESIGN_WORKS.length) % DESIGN_WORKS.length : null
                );
              }}
              data-cursor-hover="true"
              className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-brand text-white flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand font-sans text-lg sm:text-xl"
              aria-label="Imagem anterior (Seta para a esquerda)"
            >
              ←
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedDesignIndex((prev) =>
                  prev !== null ? (prev + 1) % DESIGN_WORKS.length : null
                );
              }}
              data-cursor-hover="true"
              className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-brand text-white flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand font-sans text-lg sm:text-xl"
              aria-label="Próxima imagem (Seta para a direita)"
            >
              →
            </button>
          </div>

          {/* Bottom Bar: Index & Keyboard hint */}
          <div
            className="w-full flex items-center justify-between text-xs font-body text-white/50 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            <span>
              {activeModalItem.number} / {String(DESIGN_WORKS.length).padStart(2, "0")}
            </span>
            <span className="hidden sm:inline tracking-wider">
              Navegar com setas ← → ou clique fora para fechar
            </span>
            <button
              type="button"
              onClick={() => setSelectedDesignIndex(null)}
              data-cursor-hover="true"
              className="text-white/70 hover:text-brand transition-colors uppercase tracking-wider font-semibold"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

    </section>
  );
}
