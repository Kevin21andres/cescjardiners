"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { servicePages, serviceSlugs } from "@/lib/service-pages";

const navItems = [
  { href: "/", label: "Inici" },
  { href: "/nosotros", label: "Nosaltres" },
  { href: "/fotografias", label: "Fotografies" },
  { href: "/contacto", label: "Contacte" },
];

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setMobileServicesOpen(false);
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, []);

  const current = (href: string) => pathname === href ? "page" as const : undefined;
  const linkClass = (active: boolean) =>
    `rounded-sm px-2 py-2 transition hover:text-green-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${active ? "text-green-300 underline underline-offset-8" : ""}`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950 text-white shadow-lg" aria-label="Navegació principal">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" aria-label="Cesc Jardiners, inici" className="flex min-w-0 items-center gap-3 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
          <Image src="/images/logocj.png" alt="" width={45} height={45} priority />
          <span className="truncate text-lg font-bold tracking-tight">Cesc Jardiners</span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          aria-controls="menu-mobil"
          aria-label={mobileOpen ? "Tancar el menú" : "Obrir el menú"}
          className="rounded-md p-2 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white md:hidden"
        >
          {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <div className="hidden items-center gap-4 text-sm font-semibold md:flex">
          {navItems.slice(0, 2).map((item) => (
            <Link key={item.href} href={item.href} aria-current={current(item.href)} className={linkClass(pathname === item.href)}>{item.label}</Link>
          ))}
          <div
            className="relative"
            onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setServicesOpen(false); }}
          >
            <button
              type="button"
              aria-expanded={servicesOpen}
              aria-controls="submenu-serveis"
              onClick={() => setServicesOpen((open) => !open)}
              className={linkClass(pathname.startsWith("/servicios")) + " flex items-center gap-1"}
            >
              Serveis <ChevronDown aria-hidden="true" size={16} className={servicesOpen ? "rotate-180" : ""} />
            </button>
            {servicesOpen && (
              <div id="submenu-serveis" className="absolute right-0 top-full mt-3 max-h-[70vh] min-w-64 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 text-slate-900 shadow-xl">
                <Link href="/servicios" className="block rounded-lg px-4 py-2 font-semibold hover:bg-green-50">Tots els serveis</Link>
                <Link href="/servicios/montaje" className="block rounded-lg px-4 py-2 hover:bg-green-50">Muntatge de jardins</Link>
                {serviceSlugs.map((slug) => (
                  <Link key={slug} href={`/servicios/${slug}`} className="block rounded-lg px-4 py-2 hover:bg-green-50">{servicePages[slug].title}</Link>
                ))}
              </div>
            )}
          </div>
          {navItems.slice(2).map((item) => (
            <Link key={item.href} href={item.href} aria-current={current(item.href)} className={linkClass(pathname === item.href)}>{item.label}</Link>
          ))}
        </div>
      </div>
      {mobileOpen && (
        <div id="menu-mobil" className="border-t border-white/10 px-5 pb-5 pt-3 md:hidden">
          <div className="flex flex-col gap-1">
            {navItems.slice(0, 2).map((item) => (
              <Link key={item.href} href={item.href} aria-current={current(item.href)} className="rounded-lg px-3 py-3 font-semibold hover:bg-white/10">{item.label}</Link>
            ))}
            <button type="button" aria-expanded={mobileServicesOpen} aria-controls="submenu-mobil-serveis" onClick={() => setMobileServicesOpen((open) => !open)} className="flex items-center justify-between rounded-lg px-3 py-3 text-left font-semibold hover:bg-white/10">
              Serveis <ChevronDown aria-hidden="true" size={18} className={mobileServicesOpen ? "rotate-180" : ""} />
            </button>
            {mobileServicesOpen && (
              <div id="submenu-mobil-serveis" className="ml-3 flex flex-col border-l border-white/20 pl-3">
                <Link href="/servicios" className="rounded-lg px-3 py-2 hover:bg-white/10">Tots els serveis</Link>
                <Link href="/servicios/montaje" className="rounded-lg px-3 py-2 hover:bg-white/10">Muntatge de jardins</Link>
                {serviceSlugs.map((slug) => <Link key={slug} href={`/servicios/${slug}`} className="rounded-lg px-3 py-2 hover:bg-white/10">{servicePages[slug].title}</Link>)}
              </div>
            )}
            {navItems.slice(2).map((item) => (
              <Link key={item.href} href={item.href} aria-current={current(item.href)} className="rounded-lg px-3 py-3 font-semibold hover:bg-white/10">{item.label}</Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
