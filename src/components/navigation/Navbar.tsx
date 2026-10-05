"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface NavbarProps {
  navRef?: React.RefObject<HTMLElement>;
}

interface MenuItem {
  id: string;
  label: string;
  href: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: "inicio", label: "INÍCIO", href: "#inicio" },
  { id: "quem-somos", label: "QUEM SOMOS?", href: "#quem-somos" },
  { id: "projectos", label: "PROJECTOS", href: "#projectos" },
  { id: "lets-fly", label: "LET'S FLY", href: "#lets-work" },
];

export default function Navbar({ navRef }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const isProjectsPage = pathname === "/projects";

  const [activeId, setActiveId] = useState<string>(isProjectsPage ? "projectos" : "inicio");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuContainerRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  // Synchronize activeId if route changes
  useEffect(() => {
    if (isProjectsPage) {
      setActiveId("projectos");
    }
  }, [isProjectsPage]);

  // 1. Scroll Spy using ScrollTrigger on home page
  useEffect(() => {
    if (isProjectsPage) return;

    gsap.registerPlugin(ScrollTrigger);

    const sectionIds = ["inicio", "quem-somos", "projectos", "lets-work", "lets-fly"];
    const triggers: ScrollTrigger[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 45%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive) {
            setActiveId(id === "lets-work" ? "lets-fly" : id);
          }
        },
      });
      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, [isProjectsPage]);

  // 2. Smooth Sliding Active Indicator on Desktop
  useEffect(() => {
    const activeEl = itemRefs.current[activeId];
    const containerEl = menuContainerRef.current;
    const indicator = indicatorRef.current;

    if (!activeEl || !containerEl || !indicator) return;

    const containerRect = containerEl.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    const left = activeRect.left - containerRect.left;
    const width = activeRect.width;

    gsap.to(indicator, {
      x: left,
      width: width,
      duration: 0.45,
      ease: "power3.out",
    });
  }, [activeId]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: MenuItem) => {
    setMobileMenuOpen(false);

    if (isProjectsPage) {
      if (item.id === "projectos") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      // Navigate back to home section
      e.preventDefault();
      router.push(`/${item.href}`);
      return;
    }

    // Home page behavior
    const targetId = item.href.replace("#", "");
    const targetEl =
      document.getElementById(targetId) ||
      (targetId === "lets-fly" ? document.getElementById("lets-work") : null) ||
      (targetId === "lets-work" ? document.getElementById("lets-fly") : null);

    if (targetEl) {
      e.preventDefault();
      const lenis = (window as any)?.__lenis;
      if (lenis) {
        lenis.scrollTo(targetEl, { duration: 1.2, offset: 0 });
      } else {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setMobileMenuOpen(false);
    if (isProjectsPage) {
      e.preventDefault();
      router.push("/");
    } else {
      e.preventDefault();
      const lenis = (window as any)?.__lenis;
      const targetEl = document.getElementById("inicio");
      if (lenis && targetEl) {
        lenis.scrollTo(targetEl, { duration: 1.2, offset: 0 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <header
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 pointer-events-auto transition-all duration-300"
      role="banner"
    >
      <nav
        className="w-full max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-5 sm:py-7 lg:py-8 flex items-center justify-between"
        aria-label="Navegação principal"
      >
        {/* Left: Brand Logo */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 sm:gap-3.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-sm z-50"
          aria-label="MindStack - Página Inicial"
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 flex-shrink-0 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/images/logo.png"
              alt="MindStack Logo"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 640px) 32px, (max-width: 1024px) 40px, 44px"
            />
          </div>
          <span className="font-display text-lg sm:text-xl md:text-xl font-black tracking-tight text-dark transition-colors duration-200 group-hover:text-brand">
            MINDSTACK
          </span>
        </Link>

        {/* Right: Desktop Navigation with Animated Sliding Indicator */}
        <div
          ref={menuContainerRef}
          className="hidden md:flex relative items-center gap-7 lg:gap-10 xl:gap-12"
        >
          {MENU_ITEMS.map((item) => {
            const isActive = activeId === item.id;

            return (
              <a
                key={item.id}
                ref={(el) => {
                  itemRefs.current[item.id] = el;
                }}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item)}
                data-cursor-hover="true"
                className={`relative py-1 font-body text-xs lg:text-sm font-medium tracking-widest uppercase transition-colors duration-200 ${
                  isActive
                    ? "text-brand font-semibold"
                    : "text-dark/75 hover:text-dark"
                }`}
              >
                <span>{item.label}</span>
              </a>
            );
          })}

          {/* Continuous Sliding Active Indicator Line */}
          <span
            ref={indicatorRef}
            className="absolute bottom-0 left-0 h-[2px] bg-brand pointer-events-none will-change-transform"
            style={{ width: 0 }}
          />
        </div>

        {/* Mobile: Minimalist 2-Line Hamburger Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden relative z-50 flex flex-col items-center justify-center w-11 h-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand p-2"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-fullscreen-menu"
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          <div className="w-6 h-3 flex flex-col justify-between">
            {/* Line 1 */}
            <span
              className={`w-6 h-[1.5px] bg-dark rounded-full transition-all duration-300 ease-in-out origin-center ${
                mobileMenuOpen ? "rotate-45 translate-y-[5.25px]" : ""
              }`}
            />
            {/* Line 2 */}
            <span
              className={`w-6 h-[1.5px] bg-dark rounded-full transition-all duration-300 ease-in-out origin-center ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[5.25px]" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Fullscreen Navigation Overlay */}
      <div
        id="mobile-fullscreen-menu"
        className={`md:hidden fixed inset-0 w-full h-[100dvh] bg-background-soft/98 backdrop-blur-xl z-40 flex flex-col justify-between px-6 sm:px-10 pt-28 pb-12 transition-all duration-500 ease-in-out ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex flex-col space-y-7 my-auto">
          {MENU_ITEMS.map((item, index) => {
            const isActive = activeId === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item)}
                className={`font-display text-3xl sm:text-4xl uppercase tracking-tight flex items-center justify-between transition-all duration-300 ${
                  isActive
                    ? "text-brand font-black"
                    : "text-dark/80 hover:text-brand font-bold"
                } ${
                  mobileMenuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
                style={{
                  transitionDelay: mobileMenuOpen ? `${index * 60 + 100}ms` : "0ms",
                }}
              >
                <span>{item.label}</span>
                {isActive && (
                  <span className="w-2.5 h-2.5 rounded-full bg-brand" />
                )}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Footer Note */}
        <div
          className={`pt-6 border-t border-dark/10 flex items-center justify-between transition-all duration-300 ${
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: mobileMenuOpen ? "350ms" : "0ms" }}
        >
          <span className="font-body text-xs text-dark-muted tracking-wider uppercase">
            Mindstack Design & Tecnologia
          </span>
          <span className="font-body text-xs text-brand font-medium">
            2026
          </span>
        </div>
      </div>
    </header>
  );
}
