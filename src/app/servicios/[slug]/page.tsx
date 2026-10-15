import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/seo";
import { servicePages, serviceSlugs, type ServiceSlug } from "@/lib/service-pages";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = servicePages[slug as ServiceSlug];
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.description,
    path: `/servicios/${slug}`,
    image: service.image,
  });
}

export default async function ServeiDetall({ params }: Props) {
  const { slug } = await params;
  const service = servicePages[slug as ServiceSlug];
  if (!service) notFound();

  return (
    <article className="mx-auto max-w-6xl px-5 py-16 sm:py-24">
      <nav aria-label="Ruta de navegació" className="mb-8 text-sm text-slate-600">
        <Link href="/" className="underline-offset-4 hover:underline">Inici</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <Link href="/servicios" className="underline-offset-4 hover:underline">Serveis</Link>
        <span aria-hidden="true" className="mx-2">/</span>
        <span aria-current="page">{service.title}</span>
      </nav>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p className="mb-3 font-semibold uppercase tracking-wider text-brown-sugar">Jardineria a Tarragona</p>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight text-forest-green sm:text-5xl">{service.title}</h1>
          <p className="mb-5 text-lg leading-relaxed text-slate-700">{service.intro}</p>
          <p className="mb-8 text-slate-600">{service.short}</p>
          <Link href="/contacto" className="inline-flex rounded-full bg-forest-green px-7 py-3 font-semibold text-white transition hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-green">
            Demana un pressupost
          </Link>
        </div>
        <div className="relative min-h-80 overflow-hidden rounded-3xl shadow-xl sm:min-h-[460px]">
          <Image src={service.image} alt={service.title + " de Cesc Jardiners"} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
        </div>
      </div>
      <section className="mt-20 rounded-3xl bg-slate-50 p-8 sm:p-12">
        <h2 className="mb-7 text-2xl font-bold text-forest-green">Què inclou el servei?</h2>
        <ul className="grid gap-4 md:grid-cols-3">
          {service.highlights.map((highlight) => (
            <li key={highlight} className="rounded-xl border border-green-100 bg-white p-5 leading-relaxed text-slate-700">
              <span aria-hidden="true" className="mr-2 text-forest-green">✓</span>{highlight}
            </li>
          ))}
        </ul>
      </section>
      <div className="mt-16 text-center">
        <h2 className="mb-4 text-2xl font-bold text-forest-green">Parlem del teu projecte?</h2>
        <p className="mb-6 text-slate-700">Explica'ns què necessites i t'ajudarem a trobar una solució adequada.</p>
        <Link href="/contacto" className="inline-flex rounded-full bg-brown-sugar px-7 py-3 font-semibold text-white hover:bg-forest-green">Contacta amb nosaltres</Link>
      </div>
    </article>
  );
}
