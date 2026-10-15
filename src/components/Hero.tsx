import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, MoveDown } from "lucide-react";
import HeroVideo from "./HeroVideo";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[740px] items-center overflow-hidden bg-deep-forest text-white sm:min-h-[790px] lg:min-h-[calc(100svh-84px)]" aria-labelledby="hero-title">
      <Image
        src="/images/jardi-entrada.webp"
        alt=""
        fill
        sizes="100vw"
        priority
        className="object-cover object-center"
      />
      <HeroVideo />
      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,30,23,.91)_0%,rgba(9,30,23,.75)_43%,rgba(9,30,23,.15)_100%)]" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0c2019]/75 via-transparent to-[#0c2019]/15" />
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 pb-40 pt-20 sm:px-10 lg:px-16 lg:pb-44">
        <div className="mb-8 flex items-center gap-3">
          <span className="h-px w-10 bg-[#D3B38D]" />
          <p className="site-eyebrow text-[#F3D8B7]">Jardineria d'autor · Tarragona</p>
        </div>
        <h1 id="hero-title" className="font-editorial max-w-[980px] text-[clamp(4.15rem,10vw,9.6rem)] leading-[.92] text-[#F9F7EE]">
          Jardins que<br />
          <span className="italic text-[#D5DFCF]">inspiren vida.</span>
        </h1>
        <div className="mt-9 flex max-w-2xl flex-col gap-9 sm:mt-12 sm:flex-row sm:items-end sm:gap-14">
          <p className="max-w-sm text-base leading-8 text-white/85 sm:text-lg">
            Dissenyem, construïm i cuidem espais verds que et fan sentir a casa. Jardiners a Tarragona i voltants des de 1988.
          </p>
          <Link href="/contacto" className="group inline-flex w-fit shrink-0 items-center gap-4 rounded-full bg-[#F5F2E7] py-3 pl-6 pr-3 text-sm font-bold text-deep-forest transition hover:bg-[#E7D7C0] sm:py-4 sm:pl-7 sm:pr-4">
            Parlem del teu jardí
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-deep-forest text-white transition group-hover:rotate-45">
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </Link>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/20 bg-[#102B21]/70 backdrop-blur-md">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-y-6 px-6 py-6 sm:grid-cols-3 sm:px-10 lg:px-16">
          <div className="border-r border-white/20 pr-5">
            <span className="font-editorial block text-[2rem] leading-none text-[#E9DFC9] sm:text-[2.6rem]">1988</span>
            <span className="mt-2 block text-[.61rem] font-bold uppercase tracking-[.17em] text-white/70">Els nostres orígens</span>
          </div>
          <div className="pl-5 sm:border-r sm:border-white/20 sm:pl-10">
            <span className="block text-base font-bold text-[#E9DFC9] sm:text-lg">A prop teu</span>
            <span className="mt-2 block text-[.61rem] font-bold uppercase tracking-[.17em] text-white/70">Tarragona i voltants</span>
          </div>
          <div className="col-span-2 flex items-center justify-between border-t border-white/20 pt-5 sm:col-span-1 sm:border-0 sm:pl-10 sm:pt-0">
            <div>
              <span className="block text-base font-bold text-[#E9DFC9] sm:text-lg">Projectes amb ànima</span>
              <span className="mt-2 block text-[.61rem] font-bold uppercase tracking-[.17em] text-white/70">Jardins · Piscines · Manteniment</span>
            </div>
            <a href="#serveis" aria-label="Descobreix els serveis" className="rounded-full p-2 text-white/80 hover:text-white">
              <MoveDown size={21} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
      <ArrowDownRight aria-hidden="true" className="pointer-events-none absolute right-10 top-12 hidden h-6 w-6 text-white/50 lg:block" />
    </section>
  );
}
