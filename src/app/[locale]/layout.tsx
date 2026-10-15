import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { SiteFooter, SiteHeader, SiteWhatsapp } from "@/components/LocalizedShell";
import { copy, isLocale, locales, routeFor } from "@/lib/i18n";
import { SITE_URL } from "@/lib/seo";

const raleway=Raleway({subsets:["latin"],display:"swap"});
type Props={children:React.ReactNode;params:Promise<{locale:string}>};

export const dynamicParams=false;
export function generateStaticParams(){return locales.map(locale=>({locale}));}

export async function generateMetadata({params}:Omit<Props,"children">):Promise<Metadata>{
  const {locale}=await params;
  if(!isLocale(locale))return {};
  const t=copy[locale];
  return {
    metadataBase:new URL(SITE_URL),
    title:{default:`Cesc Jardiners | ${t.home.heroTitle} ${t.home.heroAccent}`,template:"%s | Cesc Jardiners"},
    description:t.home.heroText,
    applicationName:"Cesc Jardiners",
    icons:{icon:"/images/logocj.png"},
    robots:{index:true,follow:true},
  };
}

export default async function LocaleLayout({children,params}:Props){
  const {locale}=await params;
  if(!isLocale(locale))notFound();
  const business={
    "@context":"https://schema.org",
    "@type":"LocalBusiness",
    "@id":`${SITE_URL}/#company`,
    name:"Cesc Jardiners",
    url:routeFor(locale,"home").startsWith("/")?`${SITE_URL}${routeFor(locale,"home")}`:SITE_URL,
    image:`${SITE_URL}/images/zona-jardi.webp`,
    logo:`${SITE_URL}/images/logocj.png`,
    email:"cescjardiners@gmail.com",
    telephone:"+34638158473",
    description:copy[locale].home.heroText,
    inLanguage:locale,
    areaServed:[{ "@type":"Place",name:"Tarragona" },{ "@type":"Place",name:"Reus" },{ "@type":"Place",name:"Cambrils" },{ "@type":"Place",name:"Salou" }],
    sameAs:["https://www.instagram.com/cesc.jardiners/","https://www.tiktok.com/@cescjardiners"],
  };
  return (
    <html lang={locale}>
      <body className={`${raleway.className} bg-warm-paper text-deep-forest antialiased`}>
        <a href="#contingut-principal" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:p-3 focus:text-black">
          {locale==="ca"?"Salta al contingut":locale==="es"?"Saltar al contenido":"Skip to content"}
        </a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(business).replace(/</g,"\\u003c")}}/>
        <SiteHeader locale={locale}/>
        <main id="contingut-principal">{children}</main>
        <SiteWhatsapp locale={locale}/>
        <SiteFooter locale={locale}/>
      </body>
    </html>
  );
}
