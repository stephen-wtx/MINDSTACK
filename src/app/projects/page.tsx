import type { Metadata } from "next";
import Navbar from "@/components/navigation/Navbar";
import ProjectsGallery from "@/components/projects/ProjectsGallery";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Projects | Mindstack — Design & Tecnologia",
  description:
    "Uma selecção dos nossos trabalhos em Design e Tecnologia. Projectos digitais, websites, plataformas web e design editorial de alto impacto.",
  openGraph: {
    title: "Projects | Mindstack — Design & Tecnologia",
    description: "Uma selecção dos nossos trabalhos em Design e Tecnologia.",
    type: "website",
    locale: "pt_PT",
  },
};

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden bg-background">
      <Navbar />
      <ProjectsGallery />
      <Footer />
    </main>
  );
}
