import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServiciosDestacados from "@/components/ServiciosDestacados";
import PorQueElegirnos from "@/components/PorQueElegirnos";
import SobreNosotros from "@/components/SobreNosotros";
import CtaFinal from "@/components/CtaFinal";
import { SparklesCore } from "@/components/ui/sparkles";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Jardiners professionals a Tarragona",
  description:
    "Cesc Jardiners: disseny, muntatge, poda, instal·lació de gespa i manteniment de jardins i piscines a Tarragona i voltants.",
  path: "/",
  keywords: ["jardiners Tarragona", "manteniment jardins", "jardineria Reus", "jardins Cambrils"],
});

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <div className="relative">
        <SparklesCore className="absolute inset-0 z-0 opacity-10" />
        <div className="relative z-10">
          <ServiciosDestacados />
          <PorQueElegirnos />
          <SobreNosotros />
          <CtaFinal />
        </div>
      </div>
    </div>
  );
}
