"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ArrowUpRight, Leaf } from "lucide-react";
import { isLocale, routeFor, type Locale } from "@/lib/i18n";

const strings={
  ca:{title:"Aquest camí no porta enlloc.",message:"La pàgina que busques no existeix o ha canviat d'adreça.",back:"Torna a l'inici"},
  es:{title:"Este camino no lleva a ninguna parte.",message:"La página que buscas no existe o ha cambiado de dirección.",back:"Volver al inicio"},
  en:{title:"This path doesn't lead anywhere.",message:"The page you are looking for doesn't exist or has moved.",back:"Back to the homepage"},
};
export default function Global404Content(){
  const pathname=usePathname()??"/ca";
  const requested=pathname.split("/")[1]??"ca";
  const locale:Locale=isLocale(requested)?requested:"ca";
  const t=strings[locale];
  useEffect(()=>{document.documentElement.lang=locale;},[locale]);
  return <main className="flex min-h-[100svh] items-center bg-warm-paper px-5 py-20 sm:px-10 lg:px-16">
    <div className="mx-auto w-full max-w-[1180px]">
      <div className="mb-10 flex items-center gap-3 text-forest-green">
        <Leaf aria-hidden="true" size={25}/>
        <span className="site-eyebrow">404 · Cesc Jardiners</span>
      </div>
      <h1 className="font-editorial max-w-[950px] text-[clamp(3.3rem,7.5vw,8rem)] leading-[1.02] text-deep-forest">
        {t.title}
      </h1>
      <p className="mt-8 max-w-xl text-lg leading-8 text-slate-gray">{t.message}</p>
      <Link href={routeFor(locale,"home")} className="mt-10 inline-flex items-center gap-3 rounded-full bg-deep-forest px-7 py-4 font-bold text-white transition hover:bg-forest-green">
        {t.back}<ArrowUpRight size={19} aria-hidden="true"/>
      </Link>
      <p className="mt-16 border-t border-warm-line pt-6 text-xs font-semibold tracking-wide text-slate-gray">© Cesc Jardiners</p>
    </div>
  </main>;
}
