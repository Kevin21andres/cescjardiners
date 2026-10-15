import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SobreNosaltres() {
  return (
    <section aria-labelledby="historia-title" className="overflow-hidden bg-white px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[1.13fr_.87fr] lg:items-center lg:gap-20">
        <div className="relative pb-10 pr-10 sm:pb-14 sm:pr-20">
          <div className="relative h-[490px] overflow-hidden sm:h-[680px]">
            <Image src="/images/equip.webp" alt="Equip de Cesc Jardiners treballant en un jardí" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 h-[190px] w-[45%] overflow-hidden border-[7px] border-white shadow-editorial sm:h-[290px] sm:border-[12px]">
            <Image src="/images/origens.webp" alt="Treballs de jardineria de l'equip de Cesc Jardiners" fill sizes="(max-width: 1024px) 40vw, 22vw" className="object-cover" />
          </div>
          <div className="absolute left-0 top-0 bg-deep-forest px-5 py-4 text-white sm:px-8 sm:py-6">
            <span className="font-editorial block text-4xl leading-none sm:text-5xl">35+</span>
            <span className="mt-2 block text-[.65rem] font-bold uppercase tracking-widest text-white/75">Anys d'experiència</span>
          </div>
        </div>
        <div>
          <p className="site-eyebrow mb-6 text-brown-sugar">02 / D'on venim</p>
          <h2 id="historia-title" className="font-editorial text-[clamp(3.3rem,5.5vw,6.2rem)] leading-[1.03] text-deep-forest">
            La natura<br />és part de <span className="italic text-forest-green">nosaltres.</span>
          </h2>
          <div className="mt-8 h-px w-16 bg-brown-sugar" />
          <p className="mt-8 max-w-lg text-lg leading-9 text-slate-gray">Cesc Jardiners neix el 1988 amb una idea senzilla: tractar cada jardí com un espai únic. Generació rere generació, la passió per la jardineria i els paisatges mediterranis continua marcant la nostra manera de treballar.</p>
          <p className="mt-5 max-w-lg leading-8 text-slate-gray">Som un equip proper, amb experiència en jardins, piscines i espais comunitaris. Ens agrada escoltar i trobar solucions que encaixin amb cada projecte.</p>
          <Link href="/nosotros" className="editorial-link mt-10 text-deep-forest">Descobreix la nostra història <ArrowUpRight size={18} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
