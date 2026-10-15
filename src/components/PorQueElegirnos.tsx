import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

const passos = [
  {
    number: "01",
    title: "Escoltem",
    description: "Coneixem l'espai, les necessitats i la manera com t'agradaria viure el jardí.",
  },
  {
    number: "02",
    title: "Imaginem",
    description: "Busquem la millor combinació d'estètica, funcionalitat i respecte per l'entorn.",
  },
  {
    number: "03",
    title: "Cuidem",
    description: "Posem atenció en cada detall i t'acompanyem en la cura de l'espai verd.",
  },
];

export default function PorQueElegirnos() {
  return (
    <section aria-labelledby="manera-title" className="border-y border-warm-line bg-[#F0EFE8] px-5 py-24 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto max-w-[1320px]">
        <div className="grid gap-12 lg:grid-cols-[.92fr_1.08fr] lg:gap-20">
          <div>
            <p className="site-eyebrow mb-6 text-brown-sugar">03 / La nostra manera de fer</p>
            <h2 id="manera-title" className="font-editorial text-[clamp(3.2rem,5.6vw,6rem)] leading-[1.02] text-deep-forest">Més que jardins.<br /><span className="italic text-forest-green">Maneres de viure.</span></h2>
            <p className="mt-7 max-w-sm leading-8 text-slate-gray">Ens agraden les coses ben fetes, els espais amb personalitat i les relacions que duren.</p>
            <Link href="/nosotros" className="editorial-link mt-9 text-forest-green">Coneix-nos <ArrowUpRight size={17} aria-hidden="true" /></Link>
          </div>
          <ol className="border-t border-[#C9D0C6]">
            {passos.map((p) => (
              <li key={p.number} className="grid grid-cols-[45px_1fr] gap-5 border-b border-[#C9D0C6] py-8 sm:grid-cols-[70px_1fr] sm:py-10">
                <span className="font-editorial pt-1 text-2xl italic text-brown-sugar">{p.number}</span>
                <div>
                  <h3 className="font-editorial text-[2.2rem] leading-tight text-deep-forest sm:text-[3rem]">{p.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-7 text-slate-gray sm:text-base">{p.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
