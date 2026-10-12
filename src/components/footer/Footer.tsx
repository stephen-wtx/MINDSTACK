"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="relative z-10 w-full max-w-[1720px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20
        py-8 sm:py-10
        border-t border-dark/10
        mt-24 sm:mt-32 lg:mt-40
        flex flex-col sm:flex-row items-center justify-between gap-6
        font-body text-xs sm:text-sm text-dark-muted"
      role="contentinfo"
    >
      {/* Left: Studio Identity */}
      <div className="flex items-center gap-2 text-center sm:text-left">
        <span className="font-display font-bold text-dark tracking-tight">
          MINDSTACK
        </span>
        <span className="text-dark-muted/80">{t.footer.studioTagline}</span>
      </div>

      {/* Center: Social Links */}
      <div className="flex items-center gap-6 sm:gap-8">
        <a
          href="https://www.instagram.com/mind.stack258?stkn=bGFpd3c0eng4MnBl&utm_source=qr"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover="true"
          className="text-dark/75 hover:text-brand transition-colors duration-200 uppercase tracking-wider font-medium"
          aria-label={t.footer.instagramAria}
        >
          {t.footer.instagram}
        </a>
        <a
          href="https://wa.me/258834577714"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor-hover="true"
          className="text-dark/75 hover:text-brand transition-colors duration-200 uppercase tracking-wider font-medium"
          aria-label={t.footer.whatsappAria}
        >
          {t.footer.whatsapp}
        </a>
      </div>

      {/* Right: Copyright */}
      <div className="text-center sm:text-right text-dark-muted/60">
        <span>&copy; {new Date().getFullYear()} Mindstack</span>
      </div>
    </footer>
  );
}
