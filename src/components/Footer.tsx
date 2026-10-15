import Link from "next/link";
import { Mail, MapPin, Phone, Leaf } from "lucide-react";
import { FaTiktok, FaInstagram } from "react-icons/fa";

const links = [
  { href: "/", label: "Inici" },
  { href: "/nosotros", label: "Nosaltres" },
  { href: "/servicios", label: "Serveis" },
  { href: "/fotografias", label: "Fotografies" },
  { href: "/contacto", label: "Contacte" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <p className="mb-4 flex items-center gap-2 text-2xl font-extrabold"><Leaf className="text-green-400" aria-hidden="true" />Cesc Jardiners</p>
          <p className="max-w-md text-sm leading-7 text-white/75">Més de 35 anys transformant espais verds. Disseny, muntatge i manteniment de jardins i piscines a Tarragona i voltants.</p>
          <Link href="/contacto" className="mt-6 inline-block rounded-full border border-green-400 px-5 py-2 text-sm font-semibold text-green-300 transition hover:bg-green-500 hover:text-white">Demana pressupost</Link>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-green-300">Enllaços</h2>
          <ul className="space-y-3 text-sm">
            {links.map(({ href, label }) => <li key={href}><Link href={href} className="text-white/80 hover:text-green-300">{label}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-green-300">Contacte</h2>
          <div className="space-y-3 text-sm text-white/80">
            <p className="flex items-start gap-2"><MapPin size={18} aria-hidden="true" />Tarragona, Catalunya</p>
            <a href="mailto:cescjardiners@gmail.com" className="flex items-start gap-2 break-all hover:text-green-300"><Mail size={18} aria-hidden="true" />cescjardiners@gmail.com</a>
            <a href="tel:+34638158473" className="flex items-center gap-2 hover:text-green-300"><Phone size={18} aria-hidden="true" />+34 638 15 84 73</a>
          </div>
          <div className="mt-6 flex gap-5">
            <a href="https://www.instagram.com/cesc.jardiners/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Cesc Jardiners" className="hover:text-green-300"><FaInstagram aria-hidden="true" size={22} /></a>
            <a href="https://www.tiktok.com/@cescjardiners" target="_blank" rel="noopener noreferrer" aria-label="TikTok de Cesc Jardiners" className="hover:text-green-300"><FaTiktok aria-hidden="true" size={22} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-6 text-center text-xs text-white/65">
        <p>© {new Date().getFullYear()} Cesc Jardiners · Tots els drets reservats</p>
        <div className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-2">
          <Link href="/avis-legal" className="underline-offset-4 hover:underline">Avís legal</Link>
          <Link href="/politica-de-privacidad" className="underline-offset-4 hover:underline">Privacitat</Link>
          <Link href="/politica-de-cookies" className="underline-offset-4 hover:underline">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
