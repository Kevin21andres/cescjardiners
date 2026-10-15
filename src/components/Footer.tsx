import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-[#10291F] text-white">
      <div className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-10 sm:pt-24 lg:px-16">
        <div className="grid gap-14 border-b border-white/15 pb-20 lg:grid-cols-[1.4fr_.6fr_.7fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/images/logocj.png" alt="" width={50} height={50} className="h-12 w-12 object-contain" />
              <span className="site-eyebrow text-[#E4C9A8]">Cesc Jardiners</span>
            </div>
            <h2 className="font-editorial mt-9 max-w-md text-[clamp(3.2rem,5.5vw,6rem)] leading-[1.02]">
              Fem créixer <span className="italic text-[#C7D3BF]">bones històries.</span>
            </h2>
            <Link href="/contacto" className="editorial-link mt-9 text-[#E4C9A8]">Fem realitat el teu jardí <ArrowUpRight size={17} aria-hidden="true"/></Link>
          </div>
          <div>
            <p className="site-eyebrow mb-7 text-[#D3B38D]">Explora</p>
            <div className="flex flex-col gap-4 text-sm text-white/80">
              <Link href="/" className="hover:text-white">Inici</Link>
              <Link href="/nosotros" className="hover:text-white">Nosaltres</Link>
              <Link href="/servicios" className="hover:text-white">Serveis</Link>
              <Link href="/fotografias" className="hover:text-white">Projectes</Link>
              <Link href="/contacto" className="hover:text-white">Contacte</Link>
            </div>
          </div>
          <div>
            <p className="site-eyebrow mb-7 text-[#D3B38D]">Contacte</p>
            <div className="flex flex-col gap-5 text-sm leading-6 text-white/80">
              <p className="flex gap-3"><MapPin size={17} className="mt-1 shrink-0" aria-hidden="true"/> Tarragona, Catalunya</p>
              <a href="tel:+34638158473" className="flex gap-3 hover:text-white"><Phone size={17} className="mt-1 shrink-0" aria-hidden="true"/> +34 638 15 84 73</a>
              <a href="mailto:cescjardiners@gmail.com" className="flex gap-3 break-all hover:text-white"><Mail size={17} className="mt-1 shrink-0" aria-hidden="true"/> cescjardiners@gmail.com</a>
            </div>
            <div className="mt-8 flex items-center gap-5">
              <a href="https://www.instagram.com/cesc.jardiners/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Cesc Jardiners" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition hover:bg-white hover:text-deep-forest"><Instagram size={20} aria-hidden="true"/></a>
              <a href="https://www.tiktok.com/@cescjardiners" target="_blank" rel="noopener noreferrer" aria-label="TikTok de Cesc Jardiners" className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 transition hover:bg-white hover:text-deep-forest"><FaTiktok size={18} aria-hidden="true"/></a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-7 text-xs text-white/55 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Cesc Jardiners · Fet amb respecte per la natura.</span>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/avis-legal" className="hover:text-white">Avís legal</Link>
            <Link href="/politica-de-privacidad" className="hover:text-white">Privacitat</Link>
            <Link href="/politica-de-cookies" className="hover:text-white">Cookies</Link>
          </div>
        </div>
        <p aria-hidden="true" className="font-editorial -mb-[.23em] select-none whitespace-nowrap text-center text-[clamp(4.5rem,16.3vw,16rem)] leading-none tracking-[-.065em] text-[#2C493C]">Cesc Jardiners</p>
      </div>
    </footer>
  );
}
