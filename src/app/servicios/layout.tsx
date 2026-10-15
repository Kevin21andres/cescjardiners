import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  "title": "Serveis de jardineria i piscines",
  "description": "Disseny, manteniment, muntatge de jardins, poda, gespa artificial, reg i cura de piscines a Tarragona.",
  "path": "/servicios"
});

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
