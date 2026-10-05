import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import CustomCursor from "@/components/cursor/CustomCursor";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F6F6F4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Mindstack | Design & Tecnologia",
  description:
    "Buscamos formas de unir os nossos pontos fortes em cada projecto. Design, tecnologia e soluções digitais de alto impacto.",
  keywords: [
    "Mindstack",
    "Design",
    "Tecnologia",
    "Desenvolvimento Web",
    "Digital Studio",
    "Inovação",
  ],
  authors: [{ name: "Mindstack Design & Tecnologia" }],
  openGraph: {
    title: "Mindstack | Design & Tecnologia",
    description:
      "Buscamos formas de unir os nossos pontos fortes em cada projecto.",
    type: "website",
    locale: "pt_PT",
    siteName: "Mindstack",
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className={`${dmSans.variable}`}>
      <body className="bg-background text-dark antialiased selection:bg-brand selection:text-white min-h-screen">
        <SmoothScrollProvider>
          <CustomCursor />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
