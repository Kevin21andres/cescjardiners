"use client";

const raons = [
  {
    icon: "🌿",
    title: "Disseny natural",
    desc: "Creem jardins en harmonia amb l'entorn i els teus gustos.",
  },
  {
    icon: "🧰",
    title: "Servei integral",
    desc: "Ens encarreguem de tot: disseny, instal·lació i manteniment.",
  },
  {
    icon: "🤝",
    title: "Tracte proper",
    desc: "Som d’aquí. Treballem amb compromís real amb tu.",
  },
];

const PorQueElegirnos = () => (
  <section className="py-20 bg-white px-4 sm:px-6 text-center">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-forest-green mb-12">
        Per què escollir-nos?
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {raons.map((r, i) => (
          <div key={i} className="flex flex-col items-center px-4">
            <div className="text-5xl mb-4">{r.icon}</div>
            <h3 className="text-lg sm:text-xl font-semibold text-brown-sugar mb-2">{r.title}</h3>
            <p className="text-slate-gray text-sm">{r.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PorQueElegirnos;
