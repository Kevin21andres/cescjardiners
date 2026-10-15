import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { notFound } from "next/navigation";
import HeroVideo from "@/components/HeroVideo";
import { copy, isLocale, routeFor, type Locale, type PageId } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/seo-localized";

type Props={params:Promise<{locale:string}>};
const photos=[
  {src:"/images/zona-jardi.webp",key:0},
  {src:"/images/piscina-detall.webp",key:1},
  {src:"/images/entrada-jardi.webp",key:2},
  {src:"/images/jardi-entrada.webp",key:3},
];
const offerings:{id:PageId;img:string}[]=[
  {id:"montage",img:"/images/disseny.webp"},
  {id:"garden",img:"/images/manteniment-comunitat.webp"},
  {id:"pools",img:"/images/piscina-detall.webp"},
  {id:"irrigation",img:"/images/instalacio-reg.webp"},
];
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {locale}=await params;
  return isLocale(locale)?localizedMetadata(locale,"home"):{};
}
export default async function Home({params}:Props){
  const {locale}=await params;
  if(!isLocale(locale))notFound();
  const t=copy[locale],h=t.home;
  return (
    <>
      <section aria-labelledby="home-title" className="relative isolate flex min-h-[740px] items-center overflow-hidden bg-deep-forest text-white sm:min-h-[810px] lg:min-h-[calc(100svh-84px)]">
        <Image src="/images/jardi-entrada.webp" alt="" fill priority sizes="100vw" className="object-cover object-center"/>
        <HeroVideo/>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,30,23,.91)_0%,rgba(9,30,23,.75)_43%,rgba(9,30,23,.15)_100%)]" aria-hidden="true"/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c2019]/75 via-transparent to-[#0c2019]/15" aria-hidden="true"/>
        <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-44 pt-20 sm:px-10 lg:px-16">
          <p className="site-eyebrow mb-8 flex items-center gap-3 text-[#F3D8B7]"><span className="h-px w-10 bg-[#D3B38D]" aria-hidden="true"/>{h.eyebrow}</p>
          <h1 id="home-title" className="font-editorial max-w-[1100px] text-[clamp(3.65rem,9vw,9.5rem)] leading-[.94] text-[#F9F7EE]">
            {h.heroTitle}<br/><em className="text-[#D5DFCF]">{h.heroAccent}</em>
          </h1>
          <div className="mt-10 flex max-w-3xl flex-col gap-8 sm:flex-row sm:items-end sm:gap-12">
            <p className="max-w-sm text-base leading-8 text-white/90 sm:text-lg">{h.heroText}</p>
            <Link href={routeFor(locale,"contact")} className="inline-flex w-fit shrink-0 items-center gap-4 rounded-full bg-[#F5F2E7] py-3 pl-6 pr-3 text-sm font-bold text-deep-forest transition hover:bg-[#E7D7C0]">
              {h.heroCta}<span className="flex h-9 w-9 items-center justify-center rounded-full bg-deep-forest text-white"><ArrowUpRight size={17} aria-hidden="true"/></span>
            </Link>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/20 bg-[#102B21]/75 backdrop-blur-md">
          <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-6 px-6 py-6 sm:grid-cols-3 sm:px-10 lg:px-16">
            <div className="border-r border-white/20 pr-3"><strong className="font-editorial block text-3xl text-[#E9DFC9] sm:text-4xl">{h.since}</strong><span className="site-eyebrow mt-2 block text-[.55rem] text-white/70">{h.sinceLabel}</span></div>
            <div className="pl-3 sm:border-r sm:border-white/20 sm:pl-8"><strong className="block text-sm text-[#E9DFC9] sm:text-base">{h.localLabel}</strong><span className="site-eyebrow mt-2 block text-[.55rem] text-white/70">Cesc Jardiners</span></div>
            <div className="col-span-2 flex items-center justify-between border-t border-white/20 pt-3 sm:col-span-1 sm:border-0 sm:pl-8 sm:pt-0">
              <span className="text-xs font-semibold text-[#E9DFC9] sm:text-sm">{h.expertise}</span>
              <a href="#services-home" aria-label={h.explore} className="rounded-full p-2 hover:bg-white/10"><ArrowDown size={20} aria-hidden="true"/></a>
            </div>
          </div>
        </div>
      </section>
      <section id="services-home" className="bg-warm-paper px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-14 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
            <div><p className="site-eyebrow mb-5 text-brown-sugar">{h.serviceEyebrow}</p>
              <h2 className="font-editorial text-[clamp(3rem,6.3vw,6.4rem)] leading-[.98] text-deep-forest">{h.serviceTitle}<br/><em className="text-forest-green">{h.serviceAccent}</em></h2>
            </div>
            <div className="max-w-xs"><p className="mb-6 leading-7 text-slate-gray">{h.serviceDesc}</p>
              <Link className="editorial-link text-deep-forest" href={routeFor(locale,"services")}>{h.serviceMore}<ArrowUpRight size={17} aria-hidden="true"/></Link>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-12">
            {offerings.map((service,index)=>{
              const name=service.id==="montage"?t.nav.montage:t.service[service.id as "garden"|"pools"|"irrigation"].title;
              const desc=service.id==="montage"?t.montage.intro:t.service[service.id as "garden"|"pools"|"irrigation"].description;
              return <Link key={service.id} href={routeFor(locale,service.id)} className={`group relative block overflow-hidden bg-deep-forest text-white ${index===0||index===3?"md:col-span-7":"md:col-span-5"}`} aria-label={name}>
                <div className="relative h-[390px] sm:h-[500px]">
                  <Image src={service.img} alt={name} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071E16]/90 via-transparent to-black/10"/>
                  <span className="absolute left-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/65 text-xs">0{index+1}</span>
                  <span className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white text-deep-forest transition group-hover:rotate-45"><Plus size={20} aria-hidden="true"/></span>
                  <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                    <h3 className="font-editorial text-4xl leading-tight sm:text-5xl">{name}</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-white/80">{desc}</p>
                  </div>
                </div>
              </Link>;
            })}
          </div>
        </div>
      </section>
      <section className="bg-white px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-[1.13fr_.87fr] lg:gap-20">
          <div className="relative pb-10 pr-10 sm:pb-14 sm:pr-20">
            <div className="relative h-[490px] overflow-hidden sm:h-[660px]">
              <Image src="/images/equip.webp" alt="Cesc Jardiners" fill sizes="(max-width: 1024px) 100vw, 55vw" className="object-cover"/>
            </div>
            <div className="absolute bottom-0 right-0 h-[190px] w-[45%] overflow-hidden border-[8px] border-white shadow-editorial sm:h-[280px]"><Image src="/images/origens.webp" alt="" fill sizes="25vw" className="object-cover"/></div>
            <div className="absolute left-0 top-0 bg-deep-forest px-5 py-4 text-white sm:px-8 sm:py-6">
              <strong className="font-editorial block text-4xl sm:text-5xl">35+</strong><span className="site-eyebrow mt-2 block text-[.55rem] text-white/75">{h.sinceLabel}</span>
            </div>
          </div>
          <div><p className="site-eyebrow mb-6 text-brown-sugar">{h.historyEyebrow}</p>
            <h2 className="font-editorial text-[clamp(3rem,5.3vw,6rem)] leading-[1.02]">{h.historyTitle} <em className="text-forest-green">{h.historyAccent}</em></h2>
            <div className="mt-8 h-px w-16 bg-brown-sugar"/>
            <p className="mt-8 text-lg leading-9 text-slate-gray">{h.historyText}</p>
            <Link href={routeFor(locale,"about")} className="editorial-link mt-9 text-deep-forest">{h.historyMore}<ArrowUpRight size={17} aria-hidden="true"/></Link>
          </div>
        </div>
      </section>
      <section className="border-y border-warm-line bg-[#F0EFE8] px-5 py-24 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-2 lg:gap-20">
          <div><p className="site-eyebrow mb-6 text-brown-sugar">{h.processEyebrow}</p>
            <h2 className="font-editorial text-[clamp(3rem,5.3vw,6rem)] leading-[1.02]">{h.processTitle}<br/><em className="text-forest-green">{h.processAccent}</em></h2>
            <p className="mt-8 max-w-sm leading-8 text-slate-gray">{h.processText}</p>
          </div>
          <ol className="border-t border-[#CBD1C8]">{h.steps.map((step,index)=><li key={step.title} className="grid grid-cols-[45px_1fr] gap-5 border-b border-[#CBD1C8] py-9 sm:grid-cols-[65px_1fr]">
            <span className="font-editorial pt-1 text-2xl italic text-brown-sugar">0{index+1}</span>
            <div><h3 className="font-editorial text-4xl sm:text-5xl">{step.title}</h3><p className="mt-3 max-w-sm leading-7 text-slate-gray">{step.text}</p></div>
          </li>)}</ol>
        </div>
      </section>
      <section className="bg-deep-forest px-5 py-24 text-white sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto max-w-[1320px]">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <div><p className="site-eyebrow mb-5 text-[#D3B38D]">{h.galleryEyebrow}</p>
              <h2 className="font-editorial text-[clamp(3.2rem,6.2vw,6.5rem)] leading-none">{h.galleryTitle} <em className="text-[#D9CBB5]">{h.galleryAccent}</em></h2></div>
            <Link href={routeFor(locale,"gallery")} className="editorial-link text-[#E5D7C6]">{h.galleryMore}<ArrowUpRight size={17} aria-hidden="true"/></Link>
          </div>
          <div className="grid gap-5 md:grid-cols-12">{photos.map((photo,index)=><Link href={routeFor(locale,"gallery")} key={photo.src} className={`group relative block h-[320px] overflow-hidden bg-[#1F3B2F] md:col-span-${index===0||index===3?"7":"5"} sm:h-[460px]`}>
            <Image src={photo.src} alt={t.gallery.images[photo.key].title} fill sizes="(max-width: 768px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover:scale-105"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>
            <span className="font-editorial absolute bottom-7 left-7 text-3xl">{t.gallery.images[photo.key].title}</span>
            <ArrowUpRight className="absolute bottom-7 right-7" size={19} aria-hidden="true"/>
          </Link>)}</div>
        </div>
      </section>
      <section className="bg-[#D6D8C7] px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
        <div className="mx-auto grid max-w-[1320px] gap-10 lg:grid-cols-[1fr_240px] lg:items-end">
          <div><p className="site-eyebrow mb-6 text-forest-green">{h.ctaEyebrow}</p>
            <h2 className="font-editorial text-[clamp(3.5rem,7vw,8rem)] leading-[.98]">{h.ctaTitle}<br/><em className="text-forest-green">{h.ctaAccent}</em></h2></div>
          <div><p className="mb-7 leading-8 text-[#3F5847]">{h.ctaText}</p>
            <Link href={routeFor(locale,"contact")} className="inline-flex items-center gap-3 rounded-full bg-deep-forest px-6 py-4 text-sm font-bold text-white hover:bg-forest-green">{h.ctaButton}<ArrowUpRight size={17} aria-hidden="true"/></Link></div>
        </div>
      </section>
    </>
  );
}
