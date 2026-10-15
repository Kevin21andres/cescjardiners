import type { MetadataRoute } from "next";
import { locales, pageIds, type PageId, type Locale } from "@/lib/i18n";
import { localizedUrl } from "@/lib/seo-localized";

export default function sitemap():MetadataRoute.Sitemap{
  return pageIds.flatMap((page:PageId)=>locales.map((locale:Locale)=>({
    url:localizedUrl(locale,page),
    alternates:{languages:Object.fromEntries([...locales.map(lang=>[lang,localizedUrl(lang,page)]),["x-default",localizedUrl("ca",page)]])},
    changeFrequency:page==="home"?"weekly" as const:"monthly" as const,
    priority:page==="home"?1:page==="services"?0.9:0.7,
  })));
}
