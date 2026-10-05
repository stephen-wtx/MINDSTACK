import type { Metadata } from "next";
import Navbar from "@/components/navigation/Navbar";
import TeamSection from "@/components/team/TeamSection";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Team | Mindstack — Design & Tecnologia",
  description:
    "As pessoas por trás das ideias, do design e da tecnologia da Mindstack.",
  openGraph: {
    title: "Team | Mindstack — Design & Tecnologia",
    description:
      "As pessoas por trás das ideias, do design e da tecnologia da Mindstack.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function TeamPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-background">
      <Navbar />
      <TeamSection />
      <Footer />
    </main>
  );
}
