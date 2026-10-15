import type { Metadata } from "next";
import { copy, locales, pageIds, routeFor, type Locale, type PageId, type ServiceId } from "./i18n";
import { SITE_URL } from "./seo";

export const localizedUrl=(locale:Locale,page:PageId)=>`${SITE_URL}${routeFor(locale,page)}`;

export function localizedMetadata(locale:Locale,page:PageId):Metadata{
  const t=copy[locale];
  const service=["garden","pools","lawn","pruning","irrigation"].includes(page);
  const serviceCopy=service?t.service[page as ServiceId]:undefined;
  const titles: Record<Exclude<PageId, ServiceId>,string>={
    home:`${t.home.heroTitle} ${t.home.heroAccent}`,
    about:t.about.title+" "+t.about.accent,
    services:t.nav.services,
    montage:t.nav.montage,
    gallery:t.nav.projects,
    contact:t.nav.contact,
    privacy:t.privacy.title,
    cookies:t.cookies.title,
    legal:t.legal.title,
  };
  const title=serviceCopy?.title??titles[page as Exclude<PageId,ServiceId>];
  const description=serviceCopy?.description??
    (page==="home"?t.home.heroText:page==="services"?t.servicesPage.intro:
    page==="about"?t.about.intro:page==="gallery"?t.gallery.intro:
    page==="montage"?t.montage.intro:page==="contact"?t.contact.intro:
    page==="privacy"?t.privacy.dataBody:page==="cookies"?t.cookies.intro:t.legal.websiteBody);
  const image=serviceCopy?({garden:"/images/manteniment.webp",pools:"/images/manteniment-piscines.webp",lawn:"/images/instalacio-gespa.webp",pruning:"/images/poda-comunitat.webp",irrigation:"/images/instalacio-reg.webp"}[page as ServiceId]):"/images/zona-jardi.webp";
  const languages=Object.fromEntries(locales.map(language=>[language,localizedUrl(language,page)]));
  return {
    title,description,
    alternates:{canonical:localizedUrl(locale,page),languages:{...languages,"x-default":localizedUrl("ca",page)}},
    openGraph:{title:`${title} | Cesc Jardiners`,description,url:localizedUrl(locale,page),siteName:"Cesc Jardiners",locale:locale==="ca"?"ca_ES":locale==="es"?"es_ES":"en_GB",type:"website",images:[{url:image,alt:title}]},
    twitter:{card:"summary_large_image",title,description,images:[image]},
  };
}
