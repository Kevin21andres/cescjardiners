import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const fotos = [
  { src: "/images/zona-jardi.webp", alt: "Jardí mediterrani cuidat per Cesc Jardiners", label: "Espais verds", style: "md:col-span-7" },
  { src: "/images/piscina-detall.webp", alt: "Detall d'una piscina cuidada per Cesc Jardiners", label: "Piscines", style: "md:col-span-5" },
  { src: "/images/entrada-jardi.webp", alt: "Entrada enjardinada amb vegetació", label: "Jardins amb caràcter", style: "md:col-span-5" },
  { src: "/images/jardi-entrada.webp", alt: "Jardí exterior amb vegetació mediterrània", label: "Entorns naturals", style: "md:col-span-7" },
];

export default function ProjectesHome() {
  return (
    <section aria-labelledby="projectes-title" className="bg-deep-forest px-5 py-24 text-white sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="site-eyebrow mb-5 text-[#D3B38D]">04 / La nostra feina</p>
            <h2 id="projectes-title" className="font-editorial text-[clamp(3.4rem,6.3vw,6.7rem)] leading-none">De la idea <span className="italic text-[#D9CBB5]">a la vida.</span></h2>
          </div>
          <Link href="/fotografias" className="editorial-link mb-2 w-fit text-[#E5D7C6]">Veure més fotografies <ArrowUpRight size={17} aria-hidden="true" /></Link>
        </div>
        <div className="grid gap-5 md:grid-cols-12">
          {fotos.map((f) => (
            <Link href="/fotografias" key={f.src} className={`group relative block h-[330px] overflow-hidden bg-[#1F3B2F] sm:h-[400px] lg:h-[500px] ${f.style}`}>
              <Image src={f.src} alt={f.alt} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <span className="absolute bottom-6 left-6 font-editorial text-3xl text-white sm:bottom-8 sm:left-8">{f.label}</span>
              <span className="absolute bottom-6 right-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 text-white sm:bottom-8 sm:right-8"><ArrowUpRight size={18} aria-hidden="true" /></span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
