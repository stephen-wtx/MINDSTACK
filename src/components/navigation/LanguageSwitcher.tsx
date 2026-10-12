"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Language } from "@/i18n/translations";

/* ─────────────────────────────────────────────────────────────
   CRISP, ULTRA-LIGHTWEIGHT VECTOR FLAGS (100% OS INDEPENDENT)
   Windows emoji fonts often fail to render flag emojis properly.
   These clean inline SVG badges guarantee crisp rendering everywhere.
─────────────────────────────────────────────────────────────── */

export function MozambiqueFlag({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`${className} flex-shrink-0 rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.12)] ring-1 ring-black/10`}
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="24" height="16" fill="#006600" />
      <rect y="4.5" width="24" height="7" fill="#FFFFFF" />
      <rect y="5.5" width="24" height="5" fill="#000000" />
      <rect y="11.5" width="24" height="4.5" fill="#FCE100" />
      {/* Red Hoist Triangle */}
      <polygon points="0,0 12,8 0,16" fill="#D21034" />
      {/* Stylized Star */}
      <polygon
        points="4,5 4.8,7.5 7.4,7.5 5.3,9 6.1,11.5 4,10 1.9,11.5 2.7,9 0.6,7.5 3.2,7.5"
        fill="#FCE100"
        transform="scale(0.8) translate(1, 1)"
      />
    </svg>
  );
}

export function UKFlag({ className = "w-5 h-3.5" }: { className?: string }) {
  return (
    <svg
      className={`${className} flex-shrink-0 rounded-[2px] shadow-[0_1px_2px_rgba(0,0,0,0.12)] ring-1 ring-black/10`}
      viewBox="0 0 24 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="24" height="16" fill="#012169" />
      {/* White Diagonals */}
      <path d="M0 0L24 16M24 0L0 16" stroke="#FFFFFF" strokeWidth="2.8" />
      {/* Red Diagonals */}
      <path d="M0 0L24 16" stroke="#C8102E" strokeWidth="1.4" />
      <path d="M24 0L0 16" stroke="#C8102E" strokeWidth="1.4" />
      {/* White Cross */}
      <path d="M12 0V16M0 8H24" stroke="#FFFFFF" strokeWidth="4.8" />
      {/* Red Cross */}
      <path d="M12 0V16M0 8H24" stroke="#C8102E" strokeWidth="2.8" />
    </svg>
  );
}

interface LanguageOption {
  code: Language;
  shortLabel: string;
  fullLabel: string;
  flag: React.FC<{ className?: string }>;
}

const LANGUAGES: LanguageOption[] = [
  {
    code: "pt",
    shortLabel: "PT",
    fullLabel: "Português",
    flag: MozambiqueFlag,
  },
  {
    code: "en",
    shortLabel: "EN",
    fullLabel: "English",
    flag: UKFlag,
  },
];

interface LanguageSwitcherProps {
  className?: string;
  onSelect?: () => void;
}

export default function LanguageSwitcher({
  className = "",
  onSelect,
}: LanguageSwitcherProps) {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const currentOption =
    LANGUAGES.find((item) => item.code === language) || LANGUAGES[0];
  const CurrentFlag = currentOption.flag;

  // Close dropdown on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Close dropdown on Escape key
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    },
    []
  );

  const handleSelectLanguage = (code: Language) => {
    if (code !== language) {
      setLanguage(code);
    }
    setIsOpen(false);
    onSelect?.();
  };

  return (
    <div
      ref={dropdownRef}
      onKeyDown={handleKeyDown}
      className={`relative inline-block text-left ${className}`}
    >
      {/* ── Closed State Trigger Button ── */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`${t.languageSwitcher.label}: ${currentOption.fullLabel}. ${t.languageSwitcher.selectLanguage}`}
        data-cursor-hover="true"
        className="group flex items-center gap-1.5 sm:gap-2 py-1 sm:py-1.5 px-2 sm:px-2.5 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand hover:bg-dark/[0.04] text-dark/85 hover:text-dark select-none"
      >
        <CurrentFlag className="w-[17px] h-[11.5px] sm:w-[18px] sm:h-[12px]" />
        <span className="font-body text-xs font-semibold tracking-wider text-dark group-hover:text-brand transition-colors duration-200">
          {currentOption.shortLabel}
        </span>
        {/* Subtle chevron indicator */}
        <svg
          className={`w-2.5 h-2.5 sm:w-3 sm:h-3 text-dark/45 group-hover:text-brand transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 4.5L6 7.5L9 4.5" />
        </svg>
      </button>

      {/* ── Dropdown / Popover ── */}
      <div
        role="listbox"
        aria-label={t.languageSwitcher.selectLanguage}
        className={`absolute z-[60] mt-2 right-0 min-w-[144px] sm:min-w-[150px] bg-background-soft rounded-xl border border-dark/10 shadow-[0_6px_24px_rgba(0,0,0,0.08)] py-1.5 focus:outline-none transition-all duration-200 origin-top-right ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto scale-100"
            : "opacity-0 -translate-y-2 pointer-events-none scale-95"
        }`}
      >
        {LANGUAGES.map((option) => {
          const isSelected = option.code === language;
          const FlagComponent = option.flag;

          return (
            <button
              key={option.code}
              type="button"
              role="option"
              aria-selected={isSelected}
              onClick={() => handleSelectLanguage(option.code)}
              data-cursor-hover="true"
              className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-left font-body text-xs font-medium tracking-wide transition-all duration-150 group focus:outline-none focus-visible:bg-dark/5 ${
                isSelected
                  ? "text-brand font-semibold bg-dark/[0.03]"
                  : "text-dark/80 hover:text-brand hover:bg-dark/[0.02]"
              }`}
            >
              <div className="flex items-center gap-2.5 transform transition-transform duration-150 group-hover:translate-x-0.5">
                <FlagComponent className="w-[18px] h-[12px]" />
                <span className="transition-colors duration-150">
                  {option.fullLabel}
                </span>
              </div>

              {/* Active selection micro-dot */}
              {isSelected && (
                <span
                  className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
