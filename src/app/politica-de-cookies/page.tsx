import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Informació sobre cookies",
  description: "Informació sobre cookies i el servei de verificació reCAPTCHA de Cesc Jardiners.",
  path: "/politica-de-cookies",
});

export default function CookiesPolicy() {
  return (
    <article className="mx-auto max-w-3xl space-y-8 px-5 py-20 text-slate-700">
      <h1 className="text-4xl font-bold text-forest-green">Informació sobre cookies</h1>
      <p>Aquest web no integra eines pròpies d'analítica o publicitat al codi revisat. Per protegir el formulari de contacte s'ofereix una verificació de Google reCAPTCHA.</p>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900">Google reCAPTCHA</h2>
        <p>El formulari no carrega reCAPTCHA automàticament: primer cal que activis voluntàriament aquesta verificació. En activar-la, el teu navegador es comunica amb Google, que pot utilitzar cookies o altres identificadors segons les seves condicions.</p>
        <p>Pots consultar la <a href="https://policies.google.com/privacy" className="underline" target="_blank" rel="noopener noreferrer">política de privacitat de Google</a> i les <a href="https://policies.google.com/terms" className="underline" target="_blank" rel="noopener noreferrer">condicions del servei</a>.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900">Alternatives de contacte</h2>
        <p>Si no vols activar reCAPTCHA, pots contactar directament per correu electrònic a <a className="underline" href="mailto:cescjardiners@gmail.com">cescjardiners@gmail.com</a> o utilitzar el telèfon publicat al web.</p>
      </section>
      <p>Per saber com tractem les dades personals, consulta la <Link href="/politica-de-privacidad" className="underline">política de privacitat</Link>.</p>
    </article>
  );
}
