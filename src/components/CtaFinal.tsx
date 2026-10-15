import Link from "next/link";
import { ArrowUpRight, Phone } from "lucide-react";

export default function CtaFinal() {
  return (
    <section className="bg-[#D6D8C7] px-5 py-24 sm:px-10 sm:py-32 lg:px-16" aria-labelledby="cta-title">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[1fr_250px] lg:items-end">
          <div>
            <p className="site-eyebrow mb-6 text-forest-green">05 / Comencem?</p>
            <h2 id="cta-title" className="font-editorial max-w-[950px] text-[clamp(3.8rem,8.4vw,9.2rem)] leading-[.96] text-deep-forest">
              El teu proper jardí<br /><span className="italic text-forest-green">comença aquí.</span>
            </h2>
          </div>
          <div className="lg:pb-2">
            <p className="mb-7 leading-8 text-[#3F5847]">Explica'ns què tens al cap. Ens encantaria formar part del teu projecte.</p>
            <Link href="/contacto" className="group flex w-fit items-center gap-5 rounded-full bg-deep-forest py-3 pl-6 pr-3 text-sm font-bold text-white transition hover:bg-forest-green">
              Demana pressupost
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-deep-forest transition group-hover:rotate-45"><ArrowUpRight size={18} aria-hidden="true" /></span>
            </Link>
            <a href="tel:+34638158473" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest-green hover:underline"><Phone size={15} aria-hidden="true" /> +34 638 15 84 73</a>
          </div>
        </div>
      </div>
    </section>
  );
}
