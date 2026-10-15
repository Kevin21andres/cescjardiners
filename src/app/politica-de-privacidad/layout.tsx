import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  "title": "Política de privacitat",
  "description": "Informació sobre el tractament de dades personals i els drets de privacitat a Cesc Jardiners.",
  "path": "/politica-de-privacidad"
});

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
