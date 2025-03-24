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
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logocj.png" alt="Cesc Jardiners Logo" width={40} height={40} />
        </Link>

        {/* Mobile button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Menu desktop */}
        <ul className="hidden md:flex gap-6 text-sm font-medium tracking-wide relative">
          {navItems.map((item) => {
            if (item.label === "Fotografies") {
              return (
                <React.Fragment key="serveis">
                  {/* Dropdown: Serveis */}
                  <li
                    className="relative"
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                  >
                    <Link
                      href="/servicios"
                      className={`flex items-center gap-1 hover:text-brown-sugar ${
                        pathname.startsWith("/servicios")
                          ? "underline underline-offset-4"
                          : ""
                      }`}
                    >
                      Serveis <ChevronDown className="w-4 h-4" />
                    </Link>
                    {showDropdown && (
                      <div className="absolute top-full left-0 mt-2 bg-white text-black rounded shadow-md z-50">
                        <Link
                          href="/servicios/montaje"
                          className="block px-6 py-3 whitespace-nowrap hover:bg-forest-green hover:text-white transition-colors"
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

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 space-y-4">
          {navItems.map((item) => {
            if (item.label === "Fotografies") {
              return (
                <React.Fragment key="serveis-mob">
                  <Link
                    href="/servicios"
                    className={`block text-sm font-medium hover:text-brown-sugar ${
                      pathname?.startsWith("/servicios") ? "underline underline-offset-4" : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Serveis
                  </Link>
                  <Link
                    href={item.href}
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
