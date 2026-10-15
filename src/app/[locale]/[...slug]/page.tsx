import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Mail, MapPin, Phone } from "lucide-react";
import { notFound } from "next/navigation";
import LocalizedContactForm from "@/components/LocalizedContactForm";
import LocalizedGallery from "@/components/LocalizedGallery";
import { copy, isLocale, locales, pageForPath, pageIds, paths, routeFor, serviceIds, serviceImages, type Locale, type PageId, type ServiceId } from "@/lib/i18n";
import { localizedMetadata } from "@/lib/seo-localized";

type Props={params:Promise<{locale:string;slug:string[]}>};

export const dynamicParams=false;
export function generateStaticParams(){
  return locales.flatMap(locale=>pageIds.filter(id=>id!=="home").map(id=>({
    locale,slug:paths[locale][id].split("/"),
  })));
}
export async function generateMetadata({params}:Props):Promise<Metadata>{
  const {locale,slug}=await params;
  if(!isLocale(locale))return {};
  const id=pageForPath(locale,slug.join("/"));
  return id?localizedMetadata(locale,id):{};
}

function Hero({eyebrow,title,accent,description}:{eyebrow:string;title:string;accent?:string;description?:string}){
  return <header className="bg-deep-forest px-5 pb-20 pt-20 text-white sm:px-10 sm:pb-28 sm:pt-28 lg:px-16">
    <div className="mx-auto max-w-[1320px]">
      <p className="site-eyebrow mb-7 text-[#D3B38D]">{eyebrow}</p>
      <h1 className="font-editorial max-w-[1120px] text-[clamp(3.8rem,8vw,8.7rem)] leading-[.96]">{title} {accent&&<em className="text-[#C9D6C4]">{accent}</em>}</h1>
      {description&&<p className="mt-8 max-w-2xl text-lg leading-9 text-white/75">{description}</p>}
    </div>
  </header>;
}

function ContactCallout({locale}:{locale:Locale}){
  const t=copy[locale].servicesPage;
  return <section className="bg-[#D6D8C7] px-5 py-20 text-center sm:px-10 sm:py-24">
    <h2 className="font-editorial mx-auto max-w-4xl text-[clamp(3rem,5.5vw,6rem)] leading-tight text-deep-forest">{t.ctaTitle} <em className="text-forest-green">{t.ctaAccent}</em></h2>
    <p className="mx-auto mb-8 mt-5 max-w-xl leading-8 text-slate-gray">{t.ctaText}</p>
    <Link href={routeFor(locale,"contact")} className="inline-flex items-center gap-3 rounded-full bg-deep-forest px-7 py-4 text-sm font-bold text-white transition hover:bg-forest-green">{t.detailButton}<ArrowUpRight size={18} aria-hidden="true"/></Link>
  </section>;
}

function Services({locale}:{locale:Locale}){
  const t=copy[locale];
  const ids:(ServiceId|"montage")[]=["montage",...serviceIds];
  const imageFor=(id:ServiceId|"montage")=>id==="montage"?"/images/muntatge.webp":serviceImages[id];
  return <>
    <Hero eyebrow={t.servicesPage.eyebrow} title={t.servicesPage.title} accent={t.servicesPage.accent} description={t.servicesPage.intro}/>
    <section className="bg-warm-paper px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {ids.map(id=>{
            const title=id==="montage"?t.nav.montage:t.service[id].title;
            const description=id==="montage"?t.montage.intro:t.service[id].description;
            return <Link key={id} href={routeFor(locale,id)} className="group">
              <div className="relative mb-5 h-[340px] overflow-hidden bg-[#CFD9CD] sm:h-[410px]">
                <Image src={imageFor(id)} alt={title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105"/>
                <span className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-warm-paper text-deep-forest transition group-hover:rotate-45"><ArrowUpRight size={20} aria-hidden="true"/></span>
              </div>
              <h2 className="font-editorial text-3xl text-deep-forest sm:text-4xl">{title}</h2>
              <p className="mt-2 leading-7 text-slate-gray">{description}</p>
            </Link>;
          })}
        </div>
      </div>
    </section>
    <ContactCallout locale={locale}/>
  </>;
}

function Detail({locale,id}:{locale:Locale;id:ServiceId}){
  const t=copy[locale],s=t.service[id];
  return <>
    <section className="bg-warm-paper px-5 pb-20 pt-12 sm:px-10 sm:pb-28 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <nav aria-label={t.nav.services} className="mb-12 text-sm text-slate-gray">
          <Link href={routeFor(locale,"home")} className="hover:underline">{t.nav.home}</Link> <span aria-hidden="true">/</span>
          <Link href={routeFor(locale,"services")} className="hover:underline">{t.nav.services}</Link> <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-semibold text-forest-green">{s.title}</span>
        </nav>
        <p className="site-eyebrow mb-6 text-brown-sugar">{t.servicesPage.eyebrow}</p>
        <h1 className="font-editorial max-w-[1050px] text-[clamp(3.7rem,8vw,8.5rem)] leading-[.97] text-deep-forest">{s.title}<span className="text-brown-sugar">.</span></h1>
        <p className="mb-9 mt-8 max-w-2xl text-lg leading-9 text-slate-gray">{s.intro}</p>
        <Link href={routeFor(locale,"contact")} className="inline-flex items-center gap-3 rounded-full bg-deep-forest px-7 py-4 text-sm font-bold text-white hover:bg-forest-green">{t.servicesPage.detailButton}<ArrowUpRight size={18} aria-hidden="true"/></Link>
        <div className="relative mt-16 h-[420px] overflow-hidden bg-[#D3DBD0] sm:h-[640px]">
          <Image src={serviceImages[id]} alt={s.title} fill priority sizes="100vw" className="object-cover"/>
        </div>
      </div>
    </section>
    <section className="bg-white px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto grid max-w-[1320px] gap-12 lg:grid-cols-2 lg:gap-24">
        <div><p className="site-eyebrow mb-6 text-brown-sugar">{t.servicesPage.detailEyebrow}</p>
          <h2 className="font-editorial text-[clamp(3rem,5vw,5.8rem)] leading-none">{t.servicesPage.detailTitle} <em className="text-forest-green">{t.servicesPage.detailAccent}</em></h2>
          <p className="mt-8 max-w-md text-lg leading-8 text-slate-gray">{s.description}</p>
        </div>
        <ol className="border-t border-warm-line">{s.highlights.map((highlight,index)=><li key={highlight} className="flex gap-5 border-b border-warm-line py-7">
          <span className="font-editorial text-2xl italic text-brown-sugar">0{index+1}</span>
          <p className="flex items-start gap-3 text-lg leading-8 text-deep-forest"><Check className="mt-1 shrink-0 text-forest-green" size={18} aria-hidden="true"/>{highlight}</p>
        </li>)}</ol>
      </div>
    </section>
    <ContactCallout locale={locale}/>
  </>;
}

function Montage({locale}:{locale:Locale}){
  const t=copy[locale],m=t.montage;
  const images=["/images/seleccio-plantes.webp","/images/instalacio-gespa1.webp","/images/tot-tipus.webp","/images/instalacio-reg.webp"];
  return <>
    <section className="bg-warm-paper px-5 pb-20 pt-20 sm:px-10 sm:pb-28 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <p className="site-eyebrow mb-7 text-brown-sugar">{m.eyebrow}</p>
        <h1 className="font-editorial max-w-5xl text-[clamp(3.8rem,8vw,8.6rem)] leading-[.96]">{m.title} <em className="text-forest-green">{m.accent}</em></h1>
        <p className="mt-8 max-w-2xl text-lg leading-9 text-slate-gray">{m.intro}</p>
        <Link href={routeFor(locale,"contact")} className="mt-9 inline-flex items-center gap-3 rounded-full bg-deep-forest px-7 py-4 text-sm font-bold text-white hover:bg-forest-green">{t.servicesPage.detailButton}<ArrowUpRight size={18} aria-hidden="true"/></Link>
        <div className="relative mt-16 h-[430px] overflow-hidden bg-[#D0D6CD] sm:h-[680px]"><Image src="/images/muntatge.webp" alt={m.title} fill sizes="100vw" priority className="object-cover"/></div>
      </div>
    </section>
    <section className="bg-white px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <h2 className="font-editorial mb-16 text-[clamp(3rem,5.8vw,6.2rem)] leading-none">{m.detailTitle} <em className="text-forest-green">{m.detailAccent}</em></h2>
        <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">{m.steps.map((step,index)=><article key={step.title}>
          <div className="relative mb-6 h-[350px] overflow-hidden bg-[#C8D0C5] sm:h-[440px]"><Image src={images[index]} alt={step.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover"/></div>
          <div className="flex gap-5"><span className="font-editorial text-2xl italic text-brown-sugar">0{index+1}</span>
            <div><h3 className="font-editorial text-3xl sm:text-4xl">{step.title}</h3><p className="mt-3 leading-8 text-slate-gray">{step.text}</p></div></div>
        </article>)}</div>
      </div>
    </section>
    <ContactCallout locale={locale}/>
  </>;
}

function About({locale}:{locale:Locale}){
  const a=copy[locale].about;
  return <>
    <section className="bg-warm-paper px-5 pb-24 pt-20 sm:px-10 sm:pt-28 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <p className="site-eyebrow mb-7 text-brown-sugar">{a.eyebrow}</p>
        <div className="grid items-end gap-12 lg:grid-cols-[1.1fr_.9fr]"><h1 className="font-editorial text-[clamp(4rem,8vw,9rem)] leading-[.95]">{a.title} <em className="text-forest-green">{a.accent}</em></h1>
        <p className="pb-3 text-lg leading-9 text-slate-gray">{a.intro}</p></div>
        <div className="relative mt-16 h-[430px] overflow-hidden sm:h-[650px]">
          <Image src="/images/equip.webp" alt="Cesc Jardiners" fill priority sizes="100vw" className="object-cover"/>
          <div className="absolute bottom-0 left-0 bg-deep-forest p-7 text-white sm:p-12"><strong className="font-editorial block text-6xl sm:text-8xl">1988</strong><span className="site-eyebrow mt-2 block text-[#D3B38D]">{a.since}</span></div>
        </div>
      </div>
    </section>
    <section className="bg-white px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-2 lg:gap-24">
        <div><p className="site-eyebrow mb-6 text-brown-sugar">{a.originsEyebrow}</p><h2 className="font-editorial text-[clamp(3rem,5vw,6rem)] leading-[1.05]">{a.originsTitle} <em className="text-forest-green">{a.originsAccent}</em></h2></div>
        <div className="space-y-5 text-lg leading-9 text-slate-gray"><p>{a.originsBody}</p><p>{a.originsBody2}</p></div>
      </div>
    </section>
    <section className="bg-[#F0EFE8] px-5 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 lg:grid-cols-2">
        <div className="relative h-[500px] overflow-hidden sm:h-[620px]"><Image src="/images/treballantjardi.webp" alt={a.valuesTitle} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover"/></div>
        <div><p className="site-eyebrow mb-6 text-brown-sugar">{a.valuesEyebrow}</p><h2 className="font-editorial text-[clamp(3rem,5vw,6rem)] leading-none">{a.valuesTitle} <em className="text-forest-green">{a.valuesAccent}</em></h2>
          <p className="mt-8 text-lg leading-9 text-slate-gray">{a.valuesBody}</p>
          <div className="mt-10 grid grid-cols-3 gap-3 border-t border-warm-line pt-8">{a.areas.map((name,index)=><div key={name}><span className="site-eyebrow text-brown-sugar">0{index+1}</span><p className="font-editorial mt-2 text-xl">{name}</p></div>)}</div>
        </div>
      </div>
    </section>
  </>;
}

function Contact({locale}:{locale:Locale}){
  const c=copy[locale].contact;
  return <section className="bg-warm-paper px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
    <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
      <aside>
        <p className="site-eyebrow mb-6 text-brown-sugar">{c.eyebrow}</p>
        <h1 className="font-editorial text-[clamp(3.6rem,6vw,7rem)] leading-[.98]">{c.title} <em className="text-forest-green">{c.accent}</em></h1>
        <p className="mt-8 text-lg leading-9 text-slate-gray">{c.intro}</p>
        <div className="mt-12 border-t border-warm-line">
          <a href="tel:+34638158473" className="flex gap-4 border-b border-warm-line py-6 hover:text-brown-sugar"><Phone size={19} aria-hidden="true"/><span><strong className="block">{c.phoneTitle}</strong><span className="mt-1 block text-slate-gray">+34 638 15 84 73</span></span></a>
          <a href="mailto:cescjardiners@gmail.com" className="flex gap-4 border-b border-warm-line py-6 hover:text-brown-sugar"><Mail size={19} aria-hidden="true"/><span><strong className="block">{c.emailTitle}</strong><span className="mt-1 block break-all text-slate-gray">cescjardiners@gmail.com</span></span></a>
          <div className="flex gap-4 border-b border-warm-line py-6"><MapPin size={19} aria-hidden="true"/><span><strong className="block">{c.locationTitle}</strong><span className="mt-1 block text-slate-gray">{copy[locale].footer.locality}</span></span></div>
        </div>
        <div className="relative mt-12 hidden h-[350px] overflow-hidden lg:block"><Image src="/images/seleccio-plantes.webp" alt="" fill sizes="40vw" className="object-cover"/></div>
      </aside>
      <LocalizedContactForm locale={locale}/>
    </div>
  </section>;
}

function LegalPages({locale,id}:{locale:Locale;id:"privacy"|"cookies"|"legal"}){
  const t=copy[locale];
  const title=id==="privacy"?t.privacy.title:id==="cookies"?t.cookies.title:t.legal.title;
  const controller=<><p>Francisco Moreno Aguilar · NIF 52276597N</p><p>Ctra. Santas Creus, Km 14, Pol. 4, Parcela 33, 43765 La Secuita (Tarragona)</p><p><a className="underline" href="mailto:cescjardiners@gmail.com">cescjardiners@gmail.com</a></p></>;
  return <article className="bg-warm-paper px-5 py-20 sm:px-10 sm:py-28">
    <div className="mx-auto max-w-3xl">
      <h1 className="font-editorial mb-14 text-[clamp(3.3rem,6vw,6rem)] leading-tight text-deep-forest">{title}</h1>
      {id==="legal"&&<div className="space-y-10 text-slate-gray">
        <section><h2 className="mb-4 text-2xl font-semibold text-deep-forest">{t.legal.identity}</h2><div className="space-y-2 leading-8">{controller}</div></section>
        <section><h2 className="mb-4 text-2xl font-semibold text-deep-forest">{t.legal.website}</h2><p className="leading-8">{t.legal.websiteBody}</p></section>
        <p>{t.legal.links} <Link href={routeFor(locale,"privacy")} className="underline">{t.privacy.title}</Link> · <Link href={routeFor(locale,"cookies")} className="underline">{t.cookies.title}</Link></p>
      </div>}
      {id==="privacy"&&<div className="space-y-9 text-slate-gray">
        <section><h2 className="mb-3 text-2xl font-semibold text-deep-forest">{t.privacy.responsible}</h2><div className="space-y-2 leading-8">{controller}</div></section>
        <section><h2 className="mb-3 text-2xl font-semibold text-deep-forest">{t.privacy.dataTitle}</h2><p className="leading-8">{t.privacy.dataBody}</p><p className="mt-3 leading-8">{t.privacy.basis}</p></section>
        <section><h2 className="mb-3 text-2xl font-semibold text-deep-forest">{t.privacy.thirdTitle}</h2><p className="leading-8">{t.privacy.thirdBody}</p><p className="mt-3"><Link href={routeFor(locale,"cookies")} className="underline">{t.cookies.title}</Link></p></section>
        <section><h2 className="mb-3 text-2xl font-semibold text-deep-forest">{t.privacy.retention}</h2><p className="leading-8">{t.privacy.retentionBody}</p></section>
        <section><h2 className="mb-3 text-2xl font-semibold text-deep-forest">{t.privacy.rights}</h2><p className="leading-8">{t.privacy.rightsBody}</p></section>
        <p className="border-t border-warm-line pt-6 text-sm text-slate-gray">{t.privacy.review}</p>
      </div>}
      {id==="cookies"&&<div className="space-y-9 text-slate-gray">
        <p className="leading-8">{t.cookies.intro}</p>
        <section><h2 className="mb-3 text-2xl font-semibold text-deep-forest">{t.cookies.recaptcha}</h2><p className="leading-8">{t.cookies.recaptchaBody}</p>
          <p className="mt-4 flex flex-wrap gap-4 text-forest-green"><a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">{t.cookies.googlePrivacy}</a><a className="underline" href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer">{t.cookies.googleTerms}</a></p></section>
        <section><h2 className="mb-3 text-2xl font-semibold text-deep-forest">{t.cookies.alternatives}</h2><p className="leading-8">{t.cookies.alternativesBody}</p><a className="mt-3 inline-block underline" href="mailto:cescjardiners@gmail.com">cescjardiners@gmail.com</a></section>
        <Link href={routeFor(locale,"privacy")} className="underline">{t.privacy.title}</Link>
      </div>}
    </div>
  </article>;
}

export default async function Interior({params}:Props){
  const {locale,slug}=await params;
  if(!isLocale(locale))notFound();
  const id=pageForPath(locale,slug.join("/"));
  if(!id||id==="home")notFound();
  if(id==="services")return <Services locale={locale}/>;
  if(id==="montage")return <Montage locale={locale}/>;
  if(id==="about")return <About locale={locale}/>;
  if(id==="contact")return <Contact locale={locale}/>;
  if(id==="gallery")return <><Hero eyebrow={copy[locale].gallery.eyebrow} title={copy[locale].gallery.title} accent={copy[locale].gallery.accent} description={copy[locale].gallery.intro}/><LocalizedGallery locale={locale}/></>;
  if(id==="legal"||id==="privacy"||id==="cookies")return <LegalPages locale={locale} id={id}/>;
  return <Detail locale={locale} id={id as ServiceId}/>;
}
