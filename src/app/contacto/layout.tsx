import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  "title": "Contacte i pressupostos de jardineria",
  "description": "Contacta amb Cesc Jardiners i demana informació o un pressupost de jardineria a Tarragona i voltants.",
  "path": "/contacto"
});

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
