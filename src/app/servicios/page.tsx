import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const serveis = [
 { name: "Disseny de jardins", description: "Un jardí fet a mida comença per una bona idea i una mirada atenta.", image: "/images/disseny.webp", href: "/servicios/montaje", group: "Jardins" },
 { name: "Manteniment de jardins", description: "Espais verds que conserven la seva bellesa durant tot l'any.", image: "/images/manteniment.webp", href: "/servicios/manteniment-jardins", group: "Jardins" },
 { name: "Muntatge de jardins", description: "Plantes, materials i detalls que donen forma a un lloc propi.", image: "/images/muntatge.webp", href: "/servicios/montaje", group: "Jardins" },
 { name: "Poda d'arbres", description: "Cura experta de la vegetació i dels arbres que defineixen l'espai.", image: "/images/poda-comunitat.webp", href: "/servicios/poda-arbres", group: "Jardins" },
 { name: "Instal·lació de gespa", description: "Gespa natural o artificial per gaudir del jardí com tu vulguis.", image: "/images/instalacio-gespa.webp", href: "/servicios/gespa-artificial", group: "Jardins" },
 { name: "Reg automàtic", description: "Sistemes de reg per cuidar millor cada racó del teu jardí.", image: "/images/instalacio-reg.webp", href: "/servicios/reg-automatic", group: "Jardins" },
 { name: "Manteniment de piscines", description: "Preparades per al bany i cuidades amb atenció als detalls.", image: "/images/manteniment-piscines.webp", href: "/servicios/manteniment-piscines", group: "Piscines" },
 { name: "Tractaments d'aigua", description: "Atenció a l'estat i a la qualitat de l'aigua de la piscina.", image: "/images/tractaments-aigua.webp", href: "/servicios/manteniment-piscines", group: "Piscines" },
 { name: "Reparació de piscines", description: "Solucions de manteniment i reparació per a la teva instal·lació.", image: "/images/reparacio_piscina.webp", href: "/servicios/manteniment-piscines", group: "Piscines" },
];

export default function Serveis() {
  return (
    <>
      <section className="bg-deep-forest px-5 pb-20 pt-20 text-white sm:px-10 sm:pb-28 sm:pt-28 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <p className="site-eyebrow mb-7 text-[#D3B38D]">L'ofici de transformar espais</p>
          <h1 className="font-editorial max-w-[1050px] text-[clamp(4.2rem,8.7vw,9rem)] leading-[.94]">Cada espai, <span className="italic text-[#C9D6C4]">una possibilitat.</span></h1>
          <div className="mt-9 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">Disseny, muntatge i manteniment de jardins i piscines. Cuidem cada projecte amb experiència, sensibilitat i respecte per l'entorn mediterrani.</div>
        </div>
      </section>
      <section className="bg-warm-paper px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          {(["Jardins","Piscines"] as const).map((group)=>(
            <div key={group} className="mb-24 last:mb-0">
              <div className="mb-9 flex flex-wrap items-end justify-between gap-4 border-b border-warm-line pb-6">
                <h2 className="font-editorial text-5xl text-deep-forest sm:text-6xl">{group}</h2>
                <span className="site-eyebrow text-brown-sugar">{group==="Jardins"?"01 / Territori verd":"02 / Espais d'aigua"}</span>
              </div>
              <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {serveis.filter(s=>s.group===group).map((s)=>(
                  <Link href={s.href} key={s.name} className="group block">
                    <div className="relative mb-5 h-[320px] overflow-hidden bg-[#CDD2C7] sm:h-[360px]">
                      <Image src={s.image} alt={s.name+" de Cesc Jardiners"} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.06]" />
                      <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-warm-paper text-deep-forest transition group-hover:rotate-45 group-hover:bg-[#D6BE9E]"><ArrowUpRight size={21} aria-hidden="true"/></span>
                    </div>
                    <h3 className="font-editorial text-[2rem] text-deep-forest sm:text-[2.35rem]">{s.name}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-7 text-slate-gray">{s.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-[#D6D8C7] px-5 py-20 text-center sm:px-10">
        <h2 className="font-editorial mx-auto max-w-3xl text-5xl leading-tight text-deep-forest sm:text-7xl">Parlem del teu <span className="italic">projecte?</span></h2>
        <p className="mx-auto mb-8 mt-5 max-w-lg text-slate-gray">Explica'ns la teva idea. Estarem encantats d'escoltar-la.</p>
        <Link href="/contacto" className="inline-flex items-center gap-3 rounded-full bg-deep-forest px-7 py-4 text-sm font-bold text-white transition hover:bg-forest-green">Demana pressupost <ArrowUpRight size={17} aria-hidden="true"/></Link>
      </section>
    </>
  );
}
