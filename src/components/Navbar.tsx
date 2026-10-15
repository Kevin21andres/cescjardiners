"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { servicePages, serviceSlugs } from "@/lib/service-pages";

const navItems = [
  { href: "/", label: "Inici" },
  { href: "/nosotros", label: "Nosaltres" },
  { href: "/fotografias", label: "Projectes" },
];

const menuLinks = [
  { href: "/servicios", label: "Tots els serveis" },
  { href: "/servicios/montaje", label: "Disseny i muntatge" },
  ...serviceSlugs.map((slug) => ({ href: `/servicios/${slug}`, label: servicePages[slug].title })),
];

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  useEffect(() => {
    setServicesOpen(false);
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
        setMobileServicesOpen(false);
      }
    };
    document.addEventListener("keydown", dismiss);
    return () => document.removeEventListener("keydown", dismiss);
  }, []);

  const activeLink = (href: string) =>
    pathname === href ? "text-forest-green" : "text-deep-forest/75";

  return (
    <header className="sticky top-0 z-50 border-b border-[#E6E1D5] bg-[#FAF8F2]/95 shadow-[0_4px_24px_rgba(18,45,36,.035)] backdrop-blur-xl">
      <nav aria-label="Navegació principal" className="mx-auto flex h-[76px] max-w-[1440px] items-center justify-between gap-5 px-5 sm:h-[84px] sm:px-10 lg:px-16">
        <Link href="/" aria-label="Cesc Jardiners, torna a l'inici" className="flex shrink-0 items-center gap-3 rounded-sm">
          <Image src="/images/logocj.png" alt="" width={47} height={47} priority className="h-11 w-11 object-contain" />
          <span className="flex flex-col leading-none">
            <span className="text-lg font-extrabold tracking-[-.045em] text-deep-forest sm:text-xl">Cesc Jardiners</span>
            <span className="mt-1.5 text-[.52rem] font-bold uppercase tracking-[.23em] text-brown-sugar">Jardineria mediterrània</span>
          </span>
        </Link>
        <div className="hidden items-center gap-7 text-[.79rem] font-bold tracking-[.025em] lg:flex xl:gap-10">
          {navItems.slice(0,2).map(({href,label})=>(
            <Link key={href} href={href} aria-current={pathname===href?"page":undefined} className={`transition hover:text-brown-sugar ${activeLink(href)}`}>{label}</Link>
          ))}
          <div className="relative" onBlur={(event)=>{if(!event.currentTarget.contains(event.relatedTarget))setServicesOpen(false);}}>
            <button type="button" aria-expanded={servicesOpen} aria-controls="serveis-dropdown" onClick={()=>setServicesOpen((open)=>!open)}
              className={`flex items-center gap-1.5 transition hover:text-brown-sugar ${pathname.startsWith("/servicios")?"text-forest-green":"text-deep-forest/75"}`}>
              Serveis <ChevronDown size={15} aria-hidden="true" className={`transition-transform ${servicesOpen?"rotate-180":""}`} />
            </button>
            {servicesOpen && (
              <div id="serveis-dropdown" className="absolute left-1/2 top-full mt-7 w-[330px] -translate-x-1/2 border border-warm-line bg-[#FAF8F2] p-3 shadow-[0_24px_60px_rgba(18,45,36,.18)]">
                <p className="site-eyebrow border-b border-warm-line px-3 pb-3 pt-2 text-brown-sugar">Descobreix què fem</p>
                <div className="max-h-[65vh] overflow-y-auto pt-2">
                  {menuLinks.map(item=><Link key={item.href} href={item.href} className="block px-3 py-3 text-sm font-medium text-deep-forest transition hover:bg-[#EAEDE4] hover:text-forest-green">{item.label}</Link>)}
                </div>
              </div>
            )}
          </div>
          <Link href="/fotografias" aria-current={pathname==="/fotografias"?"page":undefined} className={`transition hover:text-brown-sugar ${activeLink("/fotografias")}`}>Projectes</Link>
        </div>
        <div className="ml-auto hidden items-center gap-4 lg:flex">
          <a className="hidden text-[.75rem] font-bold text-forest-green xl:block" href="tel:+34638158473">638 15 84 73</a>
          <Link href="/contacto" className="group flex items-center gap-2.5 rounded-full bg-deep-forest px-5 py-3 text-xs font-bold text-white transition hover:bg-forest-green">
            Parlem del teu jardí <ArrowUpRight size={17} aria-hidden="true" className="transition group-hover:rotate-45" />
          </Link>
        </div>
        <button type="button" className="ml-auto rounded-full border border-warm-line bg-white p-3 text-deep-forest lg:hidden" onClick={()=>setMobileOpen((open)=>!open)} aria-expanded={mobileOpen} aria-controls="mobile-nav" aria-label={mobileOpen?"Tancar menú":"Obrir menú"}>
          {mobileOpen?<X size={23} aria-hidden="true"/>:<Menu size={23} aria-hidden="true"/>}
        </button>
      </nav>
      {mobileOpen&&(
        <div id="mobile-nav" className="max-h-[calc(100svh-76px)] overflow-y-auto border-t border-warm-line bg-[#FAF8F2] px-5 pb-8 pt-4 sm:px-10 lg:hidden">
          <div className="flex flex-col">
            {navItems.slice(0,2).map(({href,label})=><Link key={href} href={href} className="border-b border-warm-line py-4 text-lg font-bold text-deep-forest">{label}</Link>)}
            <button type="button" className="flex items-center justify-between border-b border-warm-line py-4 text-left text-lg font-bold text-deep-forest" aria-controls="mobile-services" aria-expanded={mobileServicesOpen} onClick={()=>setMobileServicesOpen((open)=>!open)}>
              Serveis <ChevronDown size={20} aria-hidden="true" className={mobileServicesOpen?"rotate-180":""} />
            </button>
            {mobileServicesOpen&&<div id="mobile-services" className="flex flex-col border-b border-warm-line bg-[#F0EEE6] px-4 py-2">{menuLinks.map((item)=><Link key={item.href} href={item.href} className="py-3 text-sm text-deep-forest">{item.label}</Link>)}</div>}
            <Link href="/fotografias" className="border-b border-warm-line py-4 text-lg font-bold text-deep-forest">Projectes</Link>
            <Link href="/contacto" className="mt-6 flex items-center justify-between rounded-full bg-deep-forest px-6 py-4 text-sm font-bold text-white">Demana pressupost <ArrowUpRight size={20} aria-hidden="true"/></Link>
          </div>
        </div>
      )}
    </header>
  );
}
