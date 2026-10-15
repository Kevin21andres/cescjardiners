import Image from "next/image";
import Link from "next/link";
import HeroVideo from "./HeroVideo";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[76vh] w-full items-center justify-center overflow-hidden bg-slate-900 text-white sm:min-h-[86vh]" aria-labelledby="titol-inici">
      <Image
        src="/images/zona-jardi.webp"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover"
      />
      <HeroVideo />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/65 to-black/40" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 py-20 text-center">
        <p className="mb-5 text-sm font-bold uppercase tracking-[0.2em] text-green-200 sm:text-base">
          Disseny i manteniment de jardins
        </p>
        <h1 id="titol-inici" className="mb-6 text-5xl font-extrabold tracking-tight drop-shadow-lg sm:text-6xl lg:text-7xl">
          Cesc Jardiners
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-white/95 sm:text-2xl">
          Jardiners professionals a Tarragona i voltants. Disseny, muntatge i manteniment d'espais verds.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contacto" className="rounded-full bg-brown-sugar px-7 py-3.5 font-bold text-white shadow-lg transition hover:bg-white hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Sol·licita pressupost
          </Link>
          <Link href="/servicios" className="rounded-full border-2 border-white px-7 py-3.5 font-bold text-white transition hover:bg-white hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            Descobreix els serveis
          </Link>
        </div>
      </div>
    </section>
  );
}
