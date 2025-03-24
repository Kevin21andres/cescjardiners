"use client";

import Link from "next/link";
import { Mail, Leaf } from "lucide-react";
import { FaTiktok, FaInstagram } from "react-icons/fa";

const Footer = () => (
  <footer className="relative w-full bg-black text-white overflow-hidden">
    {/* Fons decoratiu animat */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-brown-sugar/10 to-transparent animate-pulse opacity-10" />

    {/* Contingut principal */}
    <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 sm:pt-24 pb-12 sm:pb-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
      {/* Branding */}
      <div className="md:col-span-2">
        <h4 className="text-2xl font-extrabold tracking-tight mb-4 flex items-center gap-2">
          <Leaf className="w-6 h-6 text-brown-sugar animate-bounce" />
          Cesc Jardiners
        </h4>
        <p className="text-sm text-white/80 leading-relaxed max-w-md">
          Més de 35 anys transformant espais verds.<br />
          Dissenyem, cuidem i vivim la jardineria amb passió.
        </p>
      </div>

      {/* Enllaços */}
      <div>
        <h5 className="font-semibold mb-4 uppercase tracking-wide text-sm">Enllaços</h5>
        <ul className="space-y-3 text-white/90 text-sm">
          {[
            { href: "/", label: "Inici" },
            { href: "/nosotros", label: "Nosaltres" },
            { href: "/servicios", label: "Serveis" },
            { href: "/fotografias", label: "Fotografies" },
            { href: "/contacto", label: "Contacte" },
            { href: "/politica-de-privacitat", label: "Política de privacitat" },
          ].map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="hover:text-brown-sugar transition-colors duration-200">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Contacte */}
      <div>
        <h5 className="font-semibold mb-4 uppercase tracking-wide text-sm">Contacte</h5>
        <p className="text-sm text-white/80 mb-1">Tarragona, Catalunya</p>
        <p className="text-sm text-white/80 mb-1">cescjardiners@gmail.com</p>
        <p className="text-sm text-white/80 mb-8">+34 638 15 84 73</p>
        <div className="flex items-center space-x-4">
          <SocialIcon Icon={FaTiktok} href="https://www.tiktok.com/@cescjardiners" />
          <SocialIcon Icon={FaInstagram} href="https://www.instagram.com/cesc.jardiners/" />
          <SocialIcon Icon={Mail} href="mailto:cescjardiners@gmail.com" />
        </div>
      </div>
    </div>

    {/* Separador inferior */}
    <div className="relative z-10 text-center text-xs text-white/60 border-t border-white/10 pt-6 pb-4">
      © {new Date().getFullYear()} Cesc Jardiners · Tots els drets reservats
    </div>
  </footer>
);

const SocialIcon = ({ Icon, href }: { Icon: any; href: string }) => (
  <Link
    href={href}
    className="hover:text-brown-sugar transition transform hover:scale-110 duration-300"
  >
    <Icon className="w-5 h-5" />
  </Link>
);

export default Footer;
