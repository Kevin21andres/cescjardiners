"use client";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { RotateCcw } from "lucide-react";
import { isLocale, type Locale } from "@/lib/i18n";
const strings={
  ca:{title:"Hi ha hagut un problema.",body:"No hem pogut carregar aquesta pàgina. Si us plau, torna-ho a provar.",try:"Torna-ho a provar"},
  es:{title:"Ha ocurrido un problema.",body:"No hemos podido cargar esta página. Vuelve a intentarlo.",try:"Volver a intentarlo"},
  en:{title:"Something went wrong.",body:"We couldn't load this page. Please try again.",try:"Try again"},
};
export default function ErrorPage({error,reset}:{error:Error & {digest?:string};reset:()=>void}){
  const params=useParams<{locale:string}>();
  const requested=params?.locale ?? "ca";
  const locale:Locale=isLocale(requested)?requested:"ca";
  const t=strings[locale];
  useEffect(()=>{console.error("Cesc Jardiners route error", error.digest || error.name);},[error]);
  return <section className="flex min-h-[60vh] items-center bg-warm-paper px-5 py-24 sm:px-10">
    <div className="mx-auto w-full max-w-[960px]">
      <p className="site-eyebrow mb-5 text-brown-sugar">Cesc Jardiners</p>
      <h1 className="font-editorial text-[clamp(3rem,6vw,6rem)] leading-tight text-deep-forest">{t.title}</h1>
      <p className="mt-6 max-w-lg leading-8 text-slate-gray">{t.body}</p>
      <button type="button" onClick={reset} className="mt-8 inline-flex items-center gap-3 rounded-full bg-deep-forest px-7 py-4 text-sm font-bold text-white hover:bg-forest-green"><RotateCcw size={17} aria-hidden="true"/>{t.try}</button>
    </div>
  </section>;
}
