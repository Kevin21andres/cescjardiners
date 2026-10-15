"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const serveis: { title: string; text: string; img: string; href?: string }[] = [
  {
    title: "Disseny de jardins",
    text: "Dissenyem el teu jardí totalment personalitzat, amb plànols a escala i suport tecnològic. Cada detall s’adapta als teus gustos i a l'entorn natural.",
    img: "/images/disseny.webp",
  },
  {
    title: "Manteniment de jardins",
    href: "/servicios/manteniment-jardins",
    text: "El nostre objectiu és que el teu jardí estigui sempre en les millors condicions. Comptem amb anys d’experiència i atenció constant per garantir-ho.",
    img: "/images/manteniment.webp",
  },
  {
    title: "Tractaments fitosanitaris",
    text: "Una part fonamental del manteniment del jardí és aplicar tractaments fitosanitaris eficaços. Som especialistes en la cura d’arbres i plantes.",
    img: "/images/tractaments-fitosanitaris.webp",
  },
  {
    title: "Muntatge de jardins",
    href: "/servicios/montaje",
    text: "Executem cada muntatge segons un pressupost optimitzat per assolir els objectius del teu jardí. La nostra experiència assegura resultats excel·lents.",
    img: "/images/muntatge.webp",
  },
  {
    title: "Poda d’arbres",
    href: "/servicios/poda-arbres",
    text: "A partir de l’experiència i el coneixement sobre fisiologia i morfologia dels arbres, estem capacitats per fer podes segures i efectives.",
    img: "/images/origens.webp",
  },
  {
    title: "Instal·lació de gespa",
    href: "/servicios/gespa-artificial",
    text: "Disposem de la maquinària adequada per a la instal·lació de gespa artificial o natural. Oferim una àmplia gamma de mostres per adaptar-nos a les teves preferències.",
    img: "/images/instalacio-gespa.webp",
  },
  {
    title: "Manteniment de piscines",
    href: "/servicios/manteniment-piscines",
    text: "També som experts en manteniment de piscines. Amb més de 30 anys d’experiència, assegurem un aspecte ideal i saludable per a la teva piscina.",
    img: "/images/manteniment-piscines.webp",
  },
  {
    title: "Tractaments d’aigua",
    href: "/servicios/manteniment-piscines",
    text: "Oferim productes químics actualitzats i segurs per garantir el tractament correcte de l’aigua i una presència neta i cristal·lina.",
    img: "/images/tractaments-aigua.webp",
  },
  {
    title: "Reparació de piscines",
    href: "/servicios/manteniment-piscines",
    text: "Comptem amb la preparació i experiència per afrontar qualsevol desperfecte o problema que pugui sorgir a la teva piscina.",
    img: "/images/reparacio_piscina.webp",
  },
];

export default function Serveis() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-forest-green mb-6 tracking-tight">
          Els nostres serveis
        </h1>
        <p className="text-lg text-slate-gray max-w-3xl mx-auto leading-relaxed">
          El nostre objectiu principal és que els nostres clients estiguin completament satisfets amb la nostra feina.
          Per aconseguir-ho, millorem constantment la nostra tècnica i cuidem tot el material per garantir un rendiment òptim.
          Comptem amb una àmplia gamma de serveis especialitzats en jardineria i piscines.
        </p>
      </motion.div>

      {/* Grid de serveis */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {serveis.map(({ title, text, img, href }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 overflow-hidden flex flex-col"
          >
            <div className="relative w-full h-72">
              <Image
                src={img}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-5 flex flex-col gap-2">

              <h2 className="text-xl font-semibold text-brown-sugar mb-2">
                {title}
              </h2>
              <p className="text-sm text-slate-gray leading-relaxed">{text}</p>
              <Link href={href ?? "/contacto"} className="mt-4 inline-flex self-start rounded-full bg-forest-green px-4 py-2 text-sm font-semibold text-white hover:bg-green-800">{href ? "Més informació" : "Consulta’ns"}</Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
