import Link from "next/link";

export default function PoliticaPrivacitat() {
  return (
    <article className="mx-auto max-w-3xl space-y-9 px-5 py-16 leading-relaxed text-slate-700 sm:py-24">
      <h1 className="text-4xl font-extrabold text-forest-green">Política de privacitat</h1>
      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-slate-900">Responsable del tractament</h2>
        <p>Francisco Moreno Aguilar · NIF 52276597N.</p>
        <p>Ctra. Santas Creus, Km 14, Pol. 4, Parcela 33, 43765, La Secuita (Tarragona).</p>
        <p>Contacte: <a href="mailto:cescjardiners@gmail.com" className="underline">cescjardiners@gmail.com</a>.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-slate-900">Dades que recollim i finalitat</h2>
        <p>Quan ens envies una consulta mitjançant el formulari, podem recollir el nom, l'adreça electrònica i el missatge. El telèfon i el codi postal són opcionals. Utilitzem aquestes dades exclusivament per atendre la consulta i, si ho demanes, preparar o gestionar un pressupost.</p>
        <p>La base jurídica del tractament pot ser l'aplicació de mesures precontractuals sol·licitades per la persona interessada o, per a consultes generals, l'interès legítim d'atendre els missatges rebuts, segons el cas concret.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-slate-900">Destinataris i serveis de tercers</h2>
        <p>Els missatges del formulari s'envien al correu electrònic de Cesc Jardiners, que actualment utilitza infraestructura de Google. Per prevenir enviaments automatitzats, el formulari ofereix Google reCAPTCHA, que només s'activa si ho decideixes. Aquests serveis poden implicar tractaments de dades per part dels proveïdors i transferències internacionals subjectes a les garanties aplicables.</p>
        <p>Consulta la <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">política de privacitat de Google</a> i la nostra <Link href="/politica-de-cookies" className="underline">informació sobre cookies</Link>.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-slate-900">Conservació</h2>
        <p>Conservarem les dades durant el temps necessari per respondre i gestionar la sol·licitud, així com durant els terminis addicionals que, si escau, exigeixi la normativa aplicable.</p>
      </section>
      <section className="space-y-3">
        <h2 className="text-2xl font-bold text-slate-900">Drets de les persones interessades</h2>
        <p>Pots sol·licitar l'accés, rectificació, supressió, oposició, limitació o portabilitat quan correspongui. Per exercir aquests drets, escriu a <a href="mailto:cescjardiners@gmail.com" className="underline">cescjardiners@gmail.com</a>. També pots presentar una reclamació davant l'autoritat de protecció de dades competent.</p>
      </section>
      <p className="border-t border-slate-200 pt-6 text-sm text-slate-500">Aquest text ha de validar-se amb el titular i, si escau, amb assessorament legal abans de publicar canvis substancials.</p>
    </article>
  );
}
