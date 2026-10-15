import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Nosotros() {
  return (
    <>
      <section className="bg-warm-paper px-5 pb-24 pt-20 sm:px-10 sm:pt-28 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <p className="site-eyebrow mb-7 text-brown-sugar">La nostra història</p>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h1 className="font-editorial max-w-[800px] text-[clamp(4.3rem,8vw,9rem)] leading-[.95] text-deep-forest">La passió pel <span className="italic text-forest-green">verd.</span></h1>
            <p className="max-w-md pb-3 text-lg leading-9 text-slate-gray">Som un equip proper que estima la jardineria i la feina ben feta. Cada jardí, cada planta i cada projecte és una oportunitat de fer millor un espai.</p>
          </div>
          <div className="relative mt-16 h-[430px] overflow-hidden sm:h-[650px]">
            <Image src="/images/equip.webp" alt="Equip de Cesc Jardiners" fill sizes="100vw" priority className="object-cover object-center" />
            <div className="absolute bottom-0 left-0 bg-deep-forest p-7 text-white sm:p-12">
              <span className="font-editorial block text-6xl sm:text-8xl">1988</span>
              <span className="site-eyebrow mt-2 block text-[#D3B38D]">L'any que tot va començar</span>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-24">
          <div>
            <p className="site-eyebrow mb-6 text-brown-sugar">01 / Els nostres orígens</p>
            <h2 className="font-editorial text-[clamp(3.3rem,5.4vw,6.4rem)] leading-[1.03] text-deep-forest">Arrels que <span className="italic text-forest-green">perduren.</span></h2>
          </div>
          <div className="space-y-6 text-lg leading-9 text-slate-gray">
            <p>La nostra empresa va néixer l'any 1988 al món de la jardineria. Des d'aleshores, hem crescut, ens hem format i hem ampliat serveis per adaptar-nos a les necessitats de cada client.</p>
            <p>Ens especialitzem en manteniment de jardins, espais comunitaris, piscines i entorns mediterranis. La nostra satisfacció és veure cada espai cuidat, funcional i ple de vida.</p>
          </div>
        </div>
      </section>
      <section className="bg-[#F0EFE8] px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto grid max-w-[1320px] items-center gap-16 lg:grid-cols-2">
          <div className="relative h-[500px] overflow-hidden sm:h-[620px]">
            <Image src="/images/treballantjardi.webp" alt="Jardiner treballant en el manteniment d'un espai verd" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover"/>
          </div>
          <div>
            <p className="site-eyebrow mb-6 text-brown-sugar">02 / Allò que ens mou</p>
            <h2 className="font-editorial text-[clamp(3.3rem,5.3vw,6.1rem)] leading-[1.03] text-deep-forest">Cada detall <span className="italic text-forest-green">importa.</span></h2>
            <p className="mt-8 max-w-lg text-lg leading-9 text-slate-gray">Creiem en la professionalitat, la proximitat i el respecte per l'entorn. Treballem perquè cada projecte respongui al que realment necessita qui el viu.</p>
            <div className="mt-10 grid gap-6 border-t border-[#D4D7CA] pt-8 sm:grid-cols-3">
              {["Jardins", "Piscines", "Comunitats"].map((name,index)=>(
                <div key={name}>
                  <span className="site-eyebrow text-brown-sugar">0{index+1}</span>
                  <p className="mt-2 font-editorial text-2xl text-deep-forest">{name}</p>
                </div>
              ))}
            </div>
            <Link href="/contacto" className="editorial-link mt-10 text-deep-forest">Ens coneixem? <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
