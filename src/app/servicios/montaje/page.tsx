import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const parts=[
  {name:"Selecció de plantes",image:"/images/seleccio-plantes.webp",text:"Espècies adaptades al clima, al tipus de sòl i als gustos de cada client."},
  {name:"Instal·lació de gespa",image:"/images/instalacio-gespa1.webp",text:"Gespa natural o artificial, amb una preparació del terreny acurada."},
  {name:"Plantació de vegetació",image:"/images/tot-tipus.webp",text:"Arbres, arbustos, flors i altres elements vegetals segons cada projecte."},
  {name:"Sistemes de reg",image:"/images/instalacio-reg.webp",text:"Instal·lacions adaptades a les plantes i a les necessitats del jardí."},
];
export default function MontatgeJardins(){
  return (
    <>
      <section className="bg-warm-paper px-5 pb-20 pt-12 sm:px-10 sm:pb-28 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <nav aria-label="Ruta de navegació" className="mb-12 text-xs font-semibold uppercase tracking-widest text-slate-gray">
            <Link href="/">Inici</Link><span className="mx-3">/</span><Link href="/servicios">Serveis</Link><span className="mx-3">/</span><span aria-current="page" className="text-forest-green">Muntatge</span>
          </nav>
          <p className="site-eyebrow mb-6 text-brown-sugar">Disseny i creació</p>
          <h1 className="font-editorial max-w-[1050px] text-[clamp(3.7rem,8vw,8.6rem)] leading-[.96] text-deep-forest">Jardins creats per <span className="italic text-forest-green">sentir.</span></h1>
          <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-gray">Dissenyem i executem espais verds tenint en compte cada necessitat: materials, vegetació, gespa i sistemes de reg.</p>
          <Link href="/contacto" className="mt-9 inline-flex items-center gap-3 rounded-full bg-deep-forest px-7 py-4 text-sm font-bold text-white transition hover:bg-forest-green">Parlem del teu projecte <ArrowUpRight size={18} aria-hidden="true"/></Link>
          <div className="relative mt-16 h-[420px] overflow-hidden bg-[#CAD5C8] sm:h-[680px]">
            <Image src="/images/muntatge.webp" alt="Muntatge de jardins de Cesc Jardiners" fill sizes="100vw" priority className="object-cover"/>
          </div>
        </div>
      </section>
      <section className="bg-white px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <p className="site-eyebrow mb-6 text-brown-sugar">Tot comença amb una idea</p>
          <h2 className="font-editorial mb-16 max-w-4xl text-[clamp(3.3rem,6vw,6.5rem)] leading-[1.01] text-deep-forest">Cada element té el seu <span className="italic text-forest-green">sentit.</span></h2>
          <div className="grid gap-x-7 gap-y-14 md:grid-cols-2">
            {parts.map((item,index)=>(
              <article key={item.name}>
                <div className="relative mb-6 h-[350px] overflow-hidden bg-[#D8DFD4] sm:h-[440px]">
                  <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="flex gap-5">
                  <span className="font-editorial text-2xl italic text-brown-sugar">0{index+1}</span>
                  <div><h3 className="font-editorial text-3xl text-deep-forest sm:text-4xl">{item.name}</h3><p className="mt-3 max-w-md leading-7 text-slate-gray">{item.text}</p></div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#D6D8C7] px-5 py-24 text-center sm:px-10">
        <h2 className="font-editorial mx-auto max-w-4xl text-5xl text-deep-forest sm:text-7xl">Comencem a <span className="italic">imaginar?</span></h2>
        <Link href="/contacto" className="mt-9 inline-flex items-center gap-3 rounded-full bg-deep-forest px-7 py-4 text-sm font-bold text-white hover:bg-forest-green">Demana pressupost <ArrowUpRight size={18} aria-hidden="true"/></Link>
      </section>
    </>
  );
}
