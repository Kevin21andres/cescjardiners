import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Avís legal",
  description: "Informació legal i de contacte de Cesc Jardiners.",
  path: "/avis-legal",
});

export default function AvisLegal() {
  return (
    <article className="mx-auto max-w-3xl space-y-8 px-5 py-20 text-slate-700">
      <h1 className="text-4xl font-bold text-forest-green">Avís legal</h1>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900">Identificació del titular</h2>
        <p>Nom: Francisco Moreno Aguilar.</p>
        <p>NIF: 52276597N.</p>
        <p>Adreça: Ctra. Santas Creus, Km 14, Pol. 4, Parcela 33, 43765, La Secuita (Tarragona).</p>
        <p>Contacte: <a className="underline" href="mailto:cescjardiners@gmail.com">cescjardiners@gmail.com</a>.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-900">Continguts del lloc web</h2>
        <p>Els continguts descriuen els serveis de jardineria i les vies per contactar amb el titular. Les fotografies i els textos no es poden reutilitzar sense l'autorització de qui n'ostenti els drets.</p>
      </section>
      <p>Consulta també la nostra <Link href="/politica-de-privacidad" className="underline">política de privacitat</Link> i la <Link href="/politica-de-cookies" className="underline">informació sobre cookies</Link>.</p>
    </article>
  );
}
