import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  "title": "Muntatge i instal·lació de jardins",
  "description": "Instal·lació de gespa, selecció de plantes, plantació i reg automàtic. Muntatge de jardins professionals a Tarragona.",
  "path": "/servicios/montaje"
});

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
