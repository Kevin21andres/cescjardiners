import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  "title": "Sobre nosaltres",
  "description": "Coneix l'equip de Cesc Jardiners: experiència en jardineria, jardins mediterranis, manteniment d'espais verds i piscines.",
  "path": "/nosotros"
});

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
