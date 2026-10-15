"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Leaf } from "lucide-react";
import { isLocale, routeFor, type Locale } from "@/lib/i18n";

const descriptions={
  ca:{heading:"Aquest camí no porta enlloc.",text:"La pàgina que busques no existeix o ha canviat d'adreça.",link:"Torna a l'inici"},
  es:{heading:"Este camino no lleva a ninguna parte.",text:"La página que buscas no existe o ha cambiado de dirección.",link:"Volver al inicio"},
  en:{heading:"This path doesn't lead anywhere.",text:"The page you're looking for doesn't exist or has moved.",link:"Back to the homepage"},
};
export default function NotFound(){
  const requested=(usePathname() ?? "").split("/")[1] ?? "ca";
  const locale:Locale=isLocale(requested) ? requested : "ca";
  const t=descriptions[locale];
  return <section className="flex min-h-[65vh] items-center bg-warm-paper px-5 py-24 sm:px-10 lg:px-16">
    <div className="mx-auto w-full max-w-[1320px]">
      <div className="mb-8 flex items-center gap-3 text-forest-green"><Leaf size={24} aria-hidden="true"/><span className="site-eyebrow">404 · Cesc Jardiners</span></div>
      <h1 className="font-editorial max-w-4xl text-[clamp(3.5rem,7vw,7rem)] leading-[1.05] text-deep-forest">{t.heading}</h1>
      <p className="mt-7 max-w-xl text-lg leading-8 text-slate-gray">{t.text}</p>
      <Link href={routeFor(locale,"home")} className="mt-9 inline-flex items-center gap-3 rounded-full bg-deep-forest px-7 py-4 text-sm font-bold text-white hover:bg-forest-green">{t.link}<ArrowUpRight size={18} aria-hidden="true"/></Link>
    </div>
  </section>;
}
