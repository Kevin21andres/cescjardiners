"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";

const projects = [
  { src: "/images/zona-jardi.webp", title: "Jardí mediterrani", category: "Jardins", featured: true },
  { src: "/images/manteniment-piscines.webp", title: "Espais d'aigua", category: "Piscines", featured: false },
  { src: "/images/entrada-jardi.webp", title: "Benvinguda natural", category: "Jardins", featured: false },
  { src: "/images/manteniment-comunitat.webp", title: "Verd compartit", category: "Comunitats", featured: true },
  { src: "/images/piscina-detall.webp", title: "Detalls que importen", category: "Piscines", featured: true },
  { src: "/images/poda-comunitat.webp", title: "Cura dels arbres", category: "Manteniment", featured: false },
  { src: "/images/gespa.webp", title: "Jardins per gaudir", category: "Jardins", featured: false },
  { src: "/images/escocell.webp", title: "Petits detalls", category: "Manteniment", featured: true },
  { src: "/images/jardi-entrada.webp", title: "Un nou paisatge", category: "Jardins", featured: true },
  { src: "/images/equip.webp", title: "La feina de cada dia", category: "Equip", featured: false },
  { src: "/images/retirada-arbre.webp", title: "Treballs de jardineria", category: "Manteniment", featured: false },
  { src: "/images/manteniment.webp", title: "Cuidant cada espai", category: "Jardins", featured: true },
];

export default function Fotografies() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => { Modal.setAppElement("body"); }, []);

  const showPrevious = () => setActiveIndex((index) => index === null ? null : (index-1+projects.length)%projects.length);
  const showNext = () => setActiveIndex((index) => index === null ? null : (index+1)%projects.length);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrevious();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  const activeImage = activeIndex === null ? null : projects[activeIndex];

  return (
    <>
      <section className="bg-deep-forest px-5 pb-20 pt-20 text-white sm:px-10 sm:pb-28 sm:pt-28 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <p className="site-eyebrow mb-7 text-[#D3B38D]">Una mirada a la nostra feina</p>
          <h1 className="font-editorial max-w-5xl text-[clamp(4.3rem,8.8vw,9.5rem)] leading-[.94]">Natura que <span className="italic text-[#C9D6C4]">emociona.</span></h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/75">Una selecció d'espais verds, jardins i piscines que hem ajudat a cuidar i transformar.</p>
        </div>
      </section>

      <section className="bg-warm-paper px-5 py-20 sm:px-10 sm:py-28 lg:px-16" aria-label="Galeria de treballs de Cesc Jardiners">
        <div className="mx-auto grid max-w-[1320px] gap-5 sm:grid-cols-2 lg:gap-7">
          {projects.map((project,index)=>(
            <button
              type="button"
              key={project.src}
              onClick={()=>setActiveIndex(index)}
              aria-label={`Ampliar fotografia: ${project.title}`}
              className={`group relative block w-full overflow-hidden bg-[#C3CCC0] text-left ${project.featured?"sm:row-span-1":""}`}
            >
              <div className={`relative overflow-hidden ${project.featured ? "h-[350px] sm:h-[510px]" : "h-[350px] sm:h-[420px]"}`}>
                <Image src={project.src} alt={project.title+" — Cesc Jardiners"} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <span className="site-eyebrow absolute left-6 top-6 text-white/90">{project.category}</span>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-9">
                  <h2 className="font-editorial text-3xl text-white sm:text-4xl">{project.title}</h2>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 text-white transition group-hover:bg-white group-hover:text-deep-forest"><Expand size={17} aria-hidden="true"/></span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <Modal isOpen={activeIndex !== null} onRequestClose={()=>setActiveIndex(null)}
        ariaHideApp={true} contentLabel={activeImage ? `Fotografia ampliada: ${activeImage.title}` : "Fotografia ampliada"}
        shouldCloseOnOverlayClick
        className="relative mx-auto flex h-[100dvh] max-w-7xl flex-col items-center justify-center px-4 py-12 outline-none sm:px-20"
        overlayClassName="fixed inset-0 z-[100] overflow-y-auto bg-[#071A13]/95 backdrop-blur-lg">
        <button type="button" onClick={()=>setActiveIndex(null)} aria-label="Tancar fotografia" className="absolute right-4 top-4 z-20 rounded-full border border-white/40 p-3 text-white transition hover:bg-white hover:text-deep-forest sm:right-8 sm:top-8"><X size={24} aria-hidden="true" /></button>
        {activeImage && (
          <>
            <div className="relative h-[65dvh] w-full max-w-5xl">
              <Image src={activeImage.src} alt={activeImage.title} fill sizes="90vw" className="object-contain" priority />
            </div>
            <div className="mt-5 flex w-full max-w-5xl items-center justify-between gap-3 text-white">
              <button type="button" onClick={showPrevious} aria-label="Fotografia anterior" className="rounded-full border border-white/40 p-3 hover:bg-white/20"><ArrowLeft size={22} aria-hidden="true" /></button>
              <div className="text-center">
                <p className="font-editorial text-xl sm:text-3xl">{activeImage.title}</p>
                <p className="mt-1 text-xs text-white/60">{(activeIndex ?? 0)+1} / {projects.length}</p>
              </div>
              <button type="button" onClick={showNext} aria-label="Fotografia següent" className="rounded-full border border-white/40 p-3 hover:bg-white/20"><ArrowRight size={22} aria-hidden="true" /></button>
            </div>
          </>
        )}
      </Modal>
    </>
  );
}
