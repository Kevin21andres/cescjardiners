import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { servicePages, serviceSlugs, type ServiceSlug } from "@/lib/service-pages";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() {
  return serviceSlugs.map((slug)=>({slug}));
}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {slug}=await params;
  const service=servicePages[slug as ServiceSlug];
  if(!service)return {};
  return pageMetadata({title:service.title,description:service.description,path:`/servicios/${slug}`,image:service.image});
}

export default async function ServeiDetall({params}:Props){
  const {slug}=await params;
  const service=servicePages[slug as ServiceSlug];
  if(!service)notFound();

  return (
    <>
      <section className="bg-warm-paper px-5 pb-20 pt-12 sm:px-10 sm:pb-28 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <nav aria-label="Ruta de navegació" className="mb-12 text-xs font-semibold uppercase tracking-widest text-slate-gray">
            <Link href="/" className="hover:underline">Inici</Link><span aria-hidden="true" className="mx-3">/</span>
            <Link href="/servicios" className="hover:underline">Serveis</Link><span aria-hidden="true" className="mx-3">/</span>
            <span aria-current="page" className="text-forest-green">{service.title}</span>
          </nav>
          <p className="site-eyebrow mb-6 text-brown-sugar">Serveis de Cesc Jardiners</p>
          <h1 className="font-editorial mb-8 max-w-[1050px] text-[clamp(3.7rem,8vw,8.6rem)] leading-[.97] text-deep-forest">{service.title}<span className="text-brown-sugar">.</span></h1>
          <p className="mb-11 max-w-2xl text-lg leading-9 text-slate-gray">{service.intro}</p>
          <Link href="/contacto" className="inline-flex items-center gap-3 rounded-full bg-deep-forest px-7 py-4 text-sm font-bold text-white transition hover:bg-forest-green">Demana pressupost <ArrowUpRight size={19} aria-hidden="true"/></Link>
          <div className="relative mt-16 h-[430px] overflow-hidden bg-[#CCD3CA] sm:h-[600px] lg:h-[710px]">
            <Image src={service.image} alt={service.title+" — Cesc Jardiners"} fill sizes="100vw" priority className="object-cover" />
          </div>
        </div>
      </section>
      <section className="bg-white px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <div>
            <p className="site-eyebrow mb-6 text-brown-sugar">La nostra proposta</p>
            <h2 className="font-editorial text-[clamp(3.2rem,5.5vw,6rem)] leading-none text-deep-forest">Cuidem cada <span className="italic text-forest-green">detall.</span></h2>
            <p className="mt-8 max-w-md text-lg leading-9 text-slate-gray">{service.short}</p>
          </div>
          <div className="border-t border-warm-line">
            {service.highlights.map((highlight,index)=>(
              <div key={highlight} className="grid grid-cols-[50px_1fr] gap-4 border-b border-warm-line py-8">
                <span className="font-editorial text-2xl italic text-brown-sugar">0{index+1}</span>
                <div className="flex items-start gap-3">
                  <Check size={19} className="mt-1 shrink-0 text-forest-green" aria-hidden="true"/>
                  <p className="text-lg leading-8 text-deep-forest">{highlight}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#D6D8C7] px-5 py-24 text-center sm:px-10">
        <h2 className="font-editorial mx-auto max-w-4xl text-5xl leading-tight text-deep-forest sm:text-7xl">T'ajudem a donar-li <span className="italic">vida?</span></h2>
        <p className="mx-auto mb-8 mt-6 max-w-lg leading-8 text-slate-gray">Explica'ns què necessites i parlem de com fer-ho realitat.</p>
        <Link href="/contacto" className="inline-flex items-center gap-3 rounded-full bg-deep-forest px-7 py-4 text-sm font-bold text-white hover:bg-forest-green">Contacta amb nosaltres <ArrowUpRight size={18} aria-hidden="true"/></Link>
      </section>
    </>
  );
}
