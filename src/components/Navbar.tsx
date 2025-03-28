"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import Image from "next/image";
import React from "react";

const navItems = [
  { label: "Inici", href: "/" },
  { label: "Nosaltres", href: "/nosotros" },
  { label: "Fotografies", href: "/fotografias" },
  { label: "Contacte", href: "/contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (!hovering) {
      timeout = setTimeout(() => setShowDropdown(false), 200);
    } else {
      setShowDropdown(true);
    }
    return () => clearTimeout(timeout);
  }, [hovering]);

  return (
    <nav
      className="bg-black text-white sticky top-0 z-50 shadow-md border-b border-white/10"
      role="navigation"
      aria-label="Menú principal"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Cesc Jardiners - jardiner a Tarragona"
          className="flex items-center gap-2"
        >
          <Image
            src="/images/logocj.png"
            alt="Logotip de Cesc Jardiners"
            width={40}
            height={40}
            priority
          />
        </Link>

        {/* Botó mòbil */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
          aria-label={menuOpen ? "Tancar menú" : "Obrir menú"}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Menú escriptori */}
        <ul className="hidden md:flex gap-6 text-sm font-medium tracking-wide items-center" role="menubar">
          {navItems.map((item) => {
            if (item.label === "Fotografies") {
              return (
                <React.Fragment key="serveis">
                  {/* Serveis desplegable */}
                  <li
                    className="relative"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                  >
                    <Link
                      href="/servicios"
                      aria-haspopup="true"
                      aria-expanded={showDropdown}
                      className={`flex items-center gap-1 hover:text-brown-sugar ${
                        pathname?.startsWith("/servicios") ? "underline underline-offset-4" : ""
                      }`}
                    >
                      Serveis <ChevronDown className="w-4 h-4" />
                    </Link>
                    {showDropdown && (
                      <div
                        className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-md z-50"
                        role="menu"
                        tabIndex={-1}
                      >
                        <Link
                          href="/servicios/montaje"
                          className="block px-6 py-3 whitespace-nowrap hover:bg-forest-green hover:text-white transition-colors"
                          title="Muntatge de jardins professionals"
                        >
                          Muntatge de jardins
                        </Link>
                      </div>
                    )}
                  </li>

                  {/* Fotografies */}
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      title="Exemples de treballs de jardineria"
                      className={`hover:text-brown-sugar ${
                        pathname === item.href ? "underline underline-offset-4" : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                </React.Fragment>
              );
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  title={`${item.label} - Cesc Jardiners`}
                  className={`hover:text-brown-sugar ${
                    pathname === item.href ? "underline underline-offset-4" : ""
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Menú mòbil */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4" aria-label="Menú per a dispositius mòbils">
          {navItems.map((item) => {
            if (item.label === "Fotografies") {
              return (
                <React.Fragment key="serveis-mob">
                  <Link
                    href="/servicios"
                    title="Serveis de jardineria"
                    className={`block text-sm font-medium hover:text-brown-sugar ${
                      pathname?.startsWith("/servicios") ? "underline underline-offset-4" : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Serveis
                  </Link>
                  <Link
                    href={item.href}
                    title="Veure fotografies"
                    className={`block text-sm font-medium hover:text-brown-sugar ${
                      pathname === item.href ? "underline underline-offset-4" : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </React.Fragment>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                title={`${item.label} - Cesc Jardiners`}
                className={`block text-sm font-medium hover:text-brown-sugar ${
                  pathname === item.href ? "underline underline-offset-4" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
