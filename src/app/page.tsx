"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import ServiciosDestacados from "@/components/ServiciosDestacados";
import PorQueElegirnos from "@/components/PorQueElegirnos";
import SobreNosotros from "@/components/SobreNosotros";
import CtaFinal from "@/components/CtaFinal";
import { SparklesCore } from "@/components/ui/sparkles";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="bg-white text-foreground">
      <div className="w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <Hero />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
      </div>
      <div className="relative z-0">
        {isClient && <SparklesCore className="absolute inset-0 opacity-10 z-0" />}
        <div className="relative z-10 space-y-32">
          <ServiciosDestacados />
          <PorQueElegirnos />
          <SobreNosotros />
          <CtaFinal />
        </div>
      </div>
    </main>
  );
}