import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ServiciosDestacados from "@/components/ServiciosDestacados";
import PorQueElegirnos from "@/components/PorQueElegirnos";
import SobreNosotros from "@/components/SobreNosotros";
import ProjectesHome from "@/components/ProjectesHome";
import CtaFinal from "@/components/CtaFinal";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Jardiners professionals a Tarragona",
  description: "Cesc Jardiners: disseny, muntatge i manteniment de jardins i piscines a Tarragona, Reus i voltants. Més de 35 anys cuidant espais verds.",
  path: "/",
  keywords: ["jardiners Tarragona", "manteniment jardins", "jardineria Reus", "jardins Cambrils"],
});

export default function Home() {
  return (
    <>
      <Hero />
      <ServiciosDestacados />
      <SobreNosotros />
      <PorQueElegirnos />
      <ProjectesHome />
      <CtaFinal />
    </>
  );
}
