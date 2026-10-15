import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { serviceSlugs } from "@/lib/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/nosotros",
    "/servicios",
    "/servicios/montaje",
    ...serviceSlugs.map((slug) => `/servicios/${slug}`),
    "/fotografias",
    "/contacto",
    "/politica-de-privacidad",
    "/politica-de-cookies",
    "/avis-legal",
  ];

  return routes.map((route) => ({
    url: new URL(route, SITE_URL).toString(),
    changeFrequency: route === "/" ? "weekly" : "monthly",
    priority: route === "/" ? 1 : route.startsWith("/servicios/") ? 0.8 : 0.6,
  }));
}
