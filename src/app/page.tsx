"use client";

import { useRef } from "react";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import AboutServices from "@/components/about/AboutServices";
import Projects from "@/components/projects/Projects";
import LetsFlyFooter from "@/components/letsfly/LetsFlyFooter";

export default function Home() {
  const navRef = useRef<HTMLElement>(null);

  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-background">
      <Navbar navRef={navRef} />
      <Hero navRef={navRef} />
      <AboutServices />
      <Projects />
      <LetsFlyFooter />
    </main>
  );
}
