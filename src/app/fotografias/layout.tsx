import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  "title": "Fotografies de jardins i treballs",
  "description": "Descobreix fotografies de manteniment, disseny i muntatge de jardins, espais comunitaris i piscines a Tarragona.",
  "path": "/fotografias"
});

export default function RouteLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
