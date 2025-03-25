"use client";

const raons = [
  {
    icon: "🌿",
    title: "Disseny natural",
    desc: "Creem jardins en harmonia amb l'entorn i els teus gustos personals, adaptant-nos al paisatge mediterrani.",
  },
  {
    icon: "🧰",
    title: "Servei integral",
    desc: "Ens encarreguem de tot: disseny, instal·lació, reg automàtic i manteniment durant tot l’any.",
  },
  {
    icon: "🤝",
    title: "Tracte proper",
    desc: "Som d’aquí. Tracte personal i directe, amb compromís real amb cada client i projecte.",
  },
];

export default function PorQueElegirnos() {
  return (
    <section
      className="py-20 bg-white px-4 sm:px-6 text-center"
      aria-labelledby="per-que-escollir-nos"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="per-que-escollir-nos"
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-forest-green mb-14"
        >
          Per què escollir-nos?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {raons.map((r, i) => (
            <article
              key={i}
              className="flex flex-col items-center text-center px-4 py-6 bg-slate-50 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
              title={r.title}
            >
              <div className="text-5xl mb-4" aria-hidden="true">
                {r.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-brown-sugar mb-2">
                {r.title}
              </h3>
              <p className="text-slate-gray text-sm leading-relaxed max-w-xs">
                {r.desc}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
