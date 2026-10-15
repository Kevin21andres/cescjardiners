import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";

const serveis = [
  {
    number: "01",
    name: "Disseny i muntatge",
    description: "Espais pensats per viure'ls. Des de la primera idea fins a l'últim detall.",
    image: "/images/disseny.webp",
    href: "/servicios/montaje",
    big: true,
  },
  {
    number: "02",
    name: "Manteniment de jardins",
    description: "Cura constant perquè cada estació tingui el seu encant.",
    image: "/images/manteniment-comunitat.webp",
    href: "/servicios/manteniment-jardins",
    big: false,
  },
  {
    number: "03",
    name: "Piscines i entorns",
    description: "Espais d'aigua nets, cuidats i preparats per gaudir.",
    image: "/images/piscina-detall.webp",
    href: "/servicios/manteniment-piscines",
    big: false,
  },
  {
    number: "04",
    name: "Gespa i sistemes de reg",
    description: "Solucions que fan que el teu jardí sigui tan pràctic com bonic.",
    image: "/images/instalacio-reg.webp",
    href: "/servicios/reg-automatic",
    big: true,
  },
];

export default function ServiciosDestacados() {
  return (
    <section id="serveis" aria-labelledby="serveis-title" className="bg-warm-paper px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="mb-14 grid items-end gap-6 lg:mb-20 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="site-eyebrow mb-5 text-brown-sugar">01 / Els nostres serveis</p>
            <h2 id="serveis-title" className="font-editorial max-w-[790px] text-[clamp(3.25rem,6.3vw,6.5rem)] leading-[.98] text-deep-forest">
              Donem forma a<br /><span className="italic text-forest-green">la natura.</span>
            </h2>
          </div>
          <div className="max-w-xs lg:mb-3">
            <p className="mb-7 leading-7 text-slate-gray">Un servei integral, de la idea al manteniment, per crear jardins amb caràcter propi.</p>
            <Link href="/servicios" className="editorial-link text-deep-forest">Explora tots els serveis <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-12 md:gap-6">
          {serveis.map((s) => (
            <Link
              key={s.number}
              href={s.href}
              className={`group relative block overflow-hidden bg-deep-forest text-white shadow-editorial ${s.big ? "md:col-span-7" : "md:col-span-5"}`}
              aria-label={`Descobreix el servei: ${s.name}`}
            >
              <div className="relative h-[390px] sm:h-[450px] lg:h-[520px]">
                <Image src={s.image} alt={s.name + " de Cesc Jardiners"} fill sizes={s.big ? "(max-width: 768px) 100vw, 58vw" : "(max-width: 768px) 100vw, 42vw"} className="object-cover transition-transform duration-700 group-hover:scale-[1.055]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071E16]/90 via-[#071E16]/20 to-black/5" />
                <div className="absolute left-7 top-7 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-black/10 text-sm font-medium backdrop-blur-sm">{s.number}</div>
                <span className="absolute right-7 top-7 flex h-11 w-11 items-center justify-center rounded-full bg-white text-deep-forest transition group-hover:rotate-45 group-hover:bg-[#D6BE9E]"><Plus size={20} aria-hidden="true" /></span>
                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                  <p className="site-eyebrow mb-3 text-[#E6CCAC]">Cesc Jardiners</p>
                  <h3 className="font-editorial mb-3 max-w-lg text-4xl leading-none sm:text-5xl">{s.name}</h3>
                  <p className="max-w-sm text-sm leading-6 text-white/80">{s.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
