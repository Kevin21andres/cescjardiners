"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Instagram, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { copy, isLocale, locales, pageForPath, routeFor, type Locale, type PageId } from "@/lib/i18n";

function LanguageLinks({locale,className=""}:{locale:Locale;className?:string}) {
  const pathname = usePathname() ?? routeFor(locale,"home");
  const base = pathname.replace(/^\/(ca|es|en)\/?/,"");
  const page:PageId = pageForPath(locale,base) ?? "home";
  return (
    <nav className={`flex items-center gap-1 ${className}`} aria-label={copy[locale].nav.language}>
      {locales.map((target)=>(
        <Link key={target} href={routeFor(target,page)} hrefLang={target} lang={target}
          aria-current={locale===target?"page":undefined}
          aria-label={copy[target].languageName}
          className={`rounded px-2 py-1.5 text-xs font-bold tracking-wider transition focus-visible:outline-2 ${locale===target?"bg-forest-green text-white":"text-deep-forest/60 hover:bg-[#E2E6DB] hover:text-deep-forest"}`}>
          {target.toUpperCase()}
        </Link>
      ))}
    </nav>
  );
}

export function SiteHeader({locale}:{locale:Locale}) {
  const t=copy[locale];
  const pathname=usePathname();
  const [open,setOpen]=useState(false);
  const [serviceOpen,setServiceOpen]=useState(false);
  useEffect(()=>{setOpen(false);setServiceOpen(false);},[pathname]);
  useEffect(()=>{
    const escape=(e:KeyboardEvent)=>{if(e.key==="Escape"){setOpen(false);setServiceOpen(false);}};
    document.addEventListener("keydown",escape);
    return ()=>document.removeEventListener("keydown",escape);
  },[]);

  const mainLinks: {id:PageId;label:string}[]=[
    {id:"home",label:t.nav.home},{id:"about",label:t.nav.about},
    {id:"gallery",label:t.nav.projects},
  ];
  const serviceLinks: {id:PageId;label:string}[]=[
    {id:"services",label:t.nav.allServices},{id:"montage",label:t.nav.montage},
    {id:"garden",label:t.service.garden.title},{id:"pools",label:t.service.pools.title},
    {id:"lawn",label:t.service.lawn.title},{id:"pruning",label:t.service.pruning.title},
    {id:"irrigation",label:t.service.irrigation.title},
  ];
  return (
    <header className="sticky top-0 z-50 border-b border-[#E6E1D5] bg-[#FAF8F2]/95 shadow-[0_4px_24px_rgba(18,45,36,.035)] backdrop-blur-xl">
      <div className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:h-[84px] sm:px-10 lg:px-16">
        <Link href={routeFor(locale,"home")} aria-label="Cesc Jardiners" className="flex shrink-0 items-center gap-3">
          <Image src="/images/logocj.png" alt="" width={45} height={45} className="h-11 w-11 object-contain" priority/>
          <span className="flex flex-col leading-none">
            <strong className="text-lg font-extrabold tracking-[-.045em] text-deep-forest sm:text-xl">Cesc Jardiners</strong>
            <span className="mt-1.5 text-[.49rem] font-bold uppercase tracking-[.21em] text-brown-sugar">{t.footer.eyebrow}</span>
          </span>
        </Link>
        <nav aria-label={t.nav.menu} className="hidden items-center gap-6 text-[.82rem] font-bold lg:flex xl:gap-9">
          {mainLinks.slice(0,2).map(item=><Link href={routeFor(locale,item.id)} key={item.id} aria-current={pathname===routeFor(locale,item.id)?"page":undefined}
            className="text-deep-forest/80 transition hover:text-brown-sugar">{item.label}</Link>)}
          <div className="relative" onBlur={(event)=>{if(!event.currentTarget.contains(event.relatedTarget))setServiceOpen(false);}}>
            <button type="button" aria-expanded={serviceOpen} aria-controls="localized-service-menu" onClick={()=>setServiceOpen(!serviceOpen)}
              className="flex items-center gap-1.5 text-deep-forest/80 transition hover:text-brown-sugar">
              {t.nav.services}<ChevronDown size={15} aria-hidden="true" className={serviceOpen?"rotate-180":""}/>
            </button>
            {serviceOpen&&<div id="localized-service-menu" className="absolute left-1/2 top-full mt-6 w-[320px] -translate-x-1/2 border border-warm-line bg-[#FAF8F2] p-2 shadow-editorial">
              <div className="max-h-[65vh] overflow-y-auto">
                {serviceLinks.map(item=><Link key={item.id} href={routeFor(locale,item.id)} className="block px-4 py-3 text-sm text-deep-forest transition hover:bg-[#E5E9DF]">{item.label}</Link>)}
              </div>
            </div>}
          </div>
          <Link href={routeFor(locale,"gallery")} className="text-deep-forest/80 transition hover:text-brown-sugar">{t.nav.projects}</Link>
        </nav>
        <div className="ml-auto hidden items-center gap-3 lg:flex">
          <LanguageLinks locale={locale}/>
          <Link href={routeFor(locale,"contact")} className="inline-flex items-center gap-2 rounded-full bg-deep-forest px-5 py-3 text-xs font-bold text-white transition hover:bg-forest-green">
            {t.nav.call} <ArrowUpRight size={16} aria-hidden="true"/>
          </Link>
        </div>
        <button type="button" aria-label={open?t.nav.close:t.nav.menu} aria-expanded={open} aria-controls="localized-mobile-nav"
          onClick={()=>setOpen(!open)} className="ml-auto rounded-full border border-warm-line bg-white p-3 text-deep-forest lg:hidden">
          {open?<X size={22} aria-hidden="true"/>:<Menu size={22} aria-hidden="true"/>}
        </button>
      </div>
      {open&&<nav id="localized-mobile-nav" aria-label={t.nav.menu} className="max-h-[calc(100svh-76px)] overflow-y-auto border-t border-warm-line bg-[#FAF8F2] px-5 pb-7 pt-4 sm:px-10 lg:hidden">
        {mainLinks.slice(0,2).map(item=><Link key={item.id} href={routeFor(locale,item.id)} className="block border-b border-warm-line py-4 font-bold text-deep-forest">{item.label}</Link>)}
        <button type="button" aria-expanded={serviceOpen} aria-controls="mobile-services-localized" onClick={()=>setServiceOpen(!serviceOpen)}
          className="flex w-full items-center justify-between border-b border-warm-line py-4 text-left font-bold text-deep-forest">{t.nav.services}<ChevronDown size={18} aria-hidden="true"/></button>
        {serviceOpen&&<div id="mobile-services-localized" className="bg-[#F0EEE6] px-4 py-2">
          {serviceLinks.map(item=><Link key={item.id} href={routeFor(locale,item.id)} className="block py-3 text-sm text-deep-forest">{item.label}</Link>)}
        </div>}
        <Link href={routeFor(locale,"gallery")} className="block border-b border-warm-line py-4 font-bold text-deep-forest">{t.nav.projects}</Link>
        <Link href={routeFor(locale,"contact")} className="mt-5 block rounded-full bg-deep-forest px-6 py-4 text-center font-bold text-white">{t.nav.call}</Link>
        <LanguageLinks locale={locale} className="mt-5 justify-center"/>
      </nav>}
    </header>
  );
}

export function SiteFooter({locale}:{locale:Locale}) {
  const t=copy[locale];
  const links:{id:PageId;label:string}[]=[
    {id:"home",label:t.nav.home},{id:"about",label:t.nav.about},{id:"services",label:t.nav.services},
    {id:"gallery",label:t.nav.projects},{id:"contact",label:t.nav.contact},
  ];
  return (
    <footer className="bg-[#10291F] text-white">
      <div className="mx-auto max-w-[1320px] px-5 pb-0 pt-14 sm:px-10 sm:pt-16 lg:px-16">
        <div className="grid gap-12 border-b border-white/15 pb-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,.7fr)_minmax(0,1fr)] lg:gap-16">
          <div className="max-w-[430px]">
            <div className="flex items-center gap-3">
              <Image src="/images/logocj.png" alt="" width={44} height={44} className="h-11 w-11 object-contain" />
              <div><strong className="block text-base font-bold tracking-tight">Cesc Jardiners</strong><span className="mt-1 block text-[.59rem] uppercase tracking-[.16em] text-[#D3B38D]">{t.footer.eyebrow}</span></div>
            </div>
            <p className="font-editorial mt-7 text-[clamp(2.35rem,3.4vw,3.5rem)] leading-[1.12] text-[#F6F3E9]">{t.footer.headline}</p>
            <p className="mt-4 max-w-sm text-sm leading-7 text-white/65">{t.footer.subhead}</p>
            <Link href={routeFor(locale,"contact")} className="editorial-link mt-7 text-[#E4C9A8]">{t.footer.cta}<ArrowUpRight size={17} aria-hidden="true"/></Link>
          </div>
          <nav aria-label={t.footer.links}>
            <h2 className="site-eyebrow mb-6 text-[#D3B38D]">{t.footer.links}</h2>
            <ul className="space-y-3 text-sm text-white/75">
              {links.map(item=><li key={item.id}><Link href={routeFor(locale,item.id)} className="inline-block py-0.5 hover:text-white">{item.label}</Link></li>)}
            </ul>
          </nav>
          <div>
            <h2 className="site-eyebrow mb-6 text-[#D3B38D]">{t.footer.contact}</h2>
            <div className="space-y-4 text-sm leading-6 text-white/75">
              <p className="flex gap-3"><MapPin size={17} className="mt-1 shrink-0" aria-hidden="true"/>{t.footer.locality}</p>
              <a href="tel:+34638158473" className="flex gap-3 hover:text-white"><Phone size={17} className="mt-1 shrink-0" aria-hidden="true"/>+34 638 15 84 73</a>
              <a href="mailto:cescjardiners@gmail.com" className="flex gap-3 break-all hover:text-white"><Mail size={17} className="mt-1 shrink-0" aria-hidden="true"/>cescjardiners@gmail.com</a>
            </div>
            <div className="mt-6 flex gap-3">
              <a aria-label="Instagram" href="https://www.instagram.com/cesc.jardiners/" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 hover:bg-white hover:text-deep-forest"><Instagram size={18} aria-hidden="true"/></a>
              <a aria-label="TikTok" href="https://www.tiktok.com/@cescjardiners" target="_blank" rel="noopener noreferrer" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 hover:bg-white hover:text-deep-forest"><FaTiktok size={17} aria-hidden="true"/></a>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-6 text-[.74rem] leading-5 text-white/55">
          <span>© {new Date().getFullYear()} Cesc Jardiners · {t.footer.rights}.</span>
          <span className="hidden text-white/45 md:block">{t.footer.tagline}</span>
          <nav aria-label={t.footer.legal} className="flex flex-wrap gap-5">
            <Link href={routeFor(locale,"legal")} className="hover:text-white">{t.footer.legal}</Link>
            <Link href={routeFor(locale,"privacy")} className="hover:text-white">{t.footer.privacy}</Link>
            <Link href={routeFor(locale,"cookies")} className="hover:text-white">{t.footer.cookies}</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export function SiteWhatsapp({locale}:{locale:Locale}) {
  const msg=locale==="ca"?"Hola Cesc! Voldria informació sobre els serveis de jardineria."
    :locale==="es"?"¡Hola Cesc! Quisiera información sobre vuestros servicios de jardinería."
    :"Hello Cesc! I'd like to ask about your gardening services.";
  return <a
    href={`https://wa.me/34638158473?text=${encodeURIComponent(msg)}`}
    target="_blank" rel="noopener noreferrer"
    aria-label={`WhatsApp — ${copy[locale].nav.contact}`}
    className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-green-700 text-white shadow-xl transition hover:scale-105 hover:bg-green-800">
    <FaWhatsapp size={23} aria-hidden="true"/>
  </a>;
}
