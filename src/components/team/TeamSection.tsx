"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import gsap from "gsap";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  objectPosition?: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "theo",
    name: "Theo",
    role: "CEO e Fundador",
    description:
      "Responsável pela visão estratégica da Mindstack e por orientar cada projecto desde a definição da ideia até à sua execução final.",
    image: "/images/team/theo-borges.jpeg",
    objectPosition: "object-top",
  },
  {
    id: "steph",
    name: "Steph",
    role: "Frontend e Designer Gráfico",
    description:
      "“Einstein” da equipa, actua no desenvolvimento frontend e no design gráfico, assegurando uma comunicação visual consistente e uma experiência de utilização clara em cada projecto.",
    image: "/images/team/steph.png",
    objectPosition: "object-center",
  },
  {
    id: "tobias",
    name: "Tobias",
    role: "Backend e Analista de Negócios de TI",
    description:
      "Actua no desenvolvimento backend e na análise do negócio de TI, acompanhando a lógica dos processos, a estrutura das soluções e a sua aplicação no contexto comercial.",
    image: "/images/team/toby's.jpeg",
    objectPosition: "object-top",
  },
  {
    id: "tony",
    name: "Tony",
    role: "Fullstack",
    description:
      "Assegura a integração entre frontend e backend, garantindo que as diferentes partes de cada projecto funcionem de forma alinhada e coerente com os seus objectivos.",
    image: "/images/team/tony.jpeg",
    objectPosition: "object-top",
  },
];

export default function TeamSection() {
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // 1. Back button navigation (same as Projects)
  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };

  // 2. Smooth entrance animation with subtle stagger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero entrance
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.85, ease: "power3.out" }
      );

      // Team cards staggered entrance
      if (gridRef.current) {
        const items = gridRef.current.querySelectorAll(".team-member-item");
        gsap.fromTo(
          items,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.15,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen bg-background pt-32 sm:pt-40 lg:pt-44 pb-20 sm:pb-28"
      aria-label="Equipa Mindstack"
    >
      <div className="w-full max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20">

        {/* ─────────────────────────────────────────────────────────────
            TOP ROW: ← VOLTAR (Identical to Projects)
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
            HERO EDITORIAL: TEAM TITLE & SUBTITLE
        ─────────────────────────────────────────────────────────────── */}
        <div ref={heroRef} className="max-w-4xl mb-16 sm:mb-20 lg:mb-28 will-change-transform">
          <h1 className="font-display font-black text-brand tracking-tight uppercase text-[clamp(2.75rem,7vw,5.75rem)] leading-none select-none">
            TEAM
          </h1>
          <p className="mt-6 sm:mt-8 font-body text-dark/85 text-xl sm:text-2xl md:text-3xl font-normal leading-snug tracking-tight max-w-xl">
            As pessoas por trás<br />
            das ideias, do design<br />
            e da tecnologia.
          </p>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            EDITORIAL 2-COLUMN GRID (DESKTOP) / 1-COLUMN (MOBILE)
            Human, clean, spacious. No heavy cards, no template borders.
        ─────────────────────────────────────────────────────────────── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-14 sm:gap-16 lg:gap-20 xl:gap-24"
        >
          {TEAM_MEMBERS.map((member, index) => (
            <article
              key={member.id}
              className="team-member-item group flex flex-col will-change-transform"
            >
              {/* Member Image Frame with Subtle Scale Interaction */}
              <div
                data-cursor-hover="true"
                className="relative w-full aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden bg-dark/5 border border-dark/10 shadow-sm"
              >
                <Image
                  src={member.image}
                  alt={`Fotografia de ${member.name}, ${member.role}`}
                  fill
                  priority={index < 2}
                  loading={index < 2 ? "eager" : "lazy"}
                  decoding="async"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 860px"
                  className={`object-cover ${
                    member.objectPosition || "object-center"
                  } transition-transform duration-700 ease-out group-hover:scale-[1.018]`}
                />
              </div>

              {/* Member Information — Hierarquia e Espaçamento Generoso */}
              <div className="mt-6 sm:mt-8 flex flex-col">
                {/* 1. Nome — Forte presença editorial */}
                <h2 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-dark tracking-tight uppercase group-hover:text-brand transition-colors duration-200">
                  {member.name}
                </h2>

                {/* 2. Cargo — Secundário, cor de destaque */}
                <span className="font-body text-xs sm:text-sm font-bold tracking-widest text-brand uppercase mt-2 sm:mt-2.5">
                  {member.role}
                </span>

                {/* 3. Descrição — Confortável de ler, humana */}
                <p className="font-body text-dark/80 text-sm sm:text-base md:text-[1.05rem] font-normal leading-relaxed max-w-lg mt-3 sm:mt-4">
                  {member.description}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
