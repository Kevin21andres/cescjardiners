"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Droplet, Sprout, TreePalm, Ruler } from "lucide-react"; // npm install lucide-react

const serveis = [
  {
    icon: <Sprout className="text-forest-green w-6 h-6 mb-3 mx-auto" />,
    img: "/images/seleccio-plantes.webp",
    alt: "Selecció de plantes",
    title: "Selecció de plantes",
    text: "Triem espècies adaptades al clima, el tipus de sòl i les preferències estètiques de cada client.",
  },
  {
    icon: <Ruler className="text-forest-green w-6 h-6 mb-3 mx-auto" />,
    img: "/images/instalacio-gespa1.webp",
    alt: "Instal·lació de gespa",
    title: "Instal·lació de gespa",
    text: "Instal·lem gespa natural o artificial amb una preparació acurada del terreny i un acabat professional.",
  },
  {
    icon: <TreePalm className="text-forest-green w-6 h-6 mb-3 mx-auto" />,
    img: "/images/tot-tipus.webp",
    alt: "Plantació de vegetació",
    title: "Plantació de tot tipus",
    text: "Plantem arbres, arbustos, flors i tanques vegetals segons el projecte i l’estil desitjat.",
  },
  {
    icon: <Droplet className="text-forest-green w-6 h-6 mb-3 mx-auto" />,
    img: "/images/instalacio-reg.webp",
    alt: "Instal·lació de reg",
    title: "Instal·lació de reg",
    text: "Sistemes de reg automàtic i eficient per optimitzar l’ús d’aigua i garantir la salut del jardí.",
  },
];

export default function MontatgeJardins() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-forest-green mb-4 tracking-tight">
          Muntatge de jardins
        </h1>
        <p className="text-lg text-slate-gray max-w-3xl mx-auto leading-relaxed">
          A Cesc Jardiners ens encarreguem de complir totes les teves necessitats relacionades amb el jardí. Des del disseny personalitzat amb plànols i eines tecnològiques, fins a la selecció de materials clau per crear un espai verd funcional, estètic i durador.
        </p>
      </motion.header>

      {/* Descripció */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-slate-gray text-base leading-relaxed space-y-6 max-w-4xl mx-auto"
      >
        <p>
          Per garantir un resultat òptim, treballem amb un pressupost clar i detallat que s’adapta als teus objectius. La nostra experiència i professionalitat ens permeten oferir solucions eficients i resultats que superen expectatives.
        </p>
        <p>
          A continuació, et mostrem alguns dels elements clau que formen part del nostre servei de muntatge:
        </p>
      </motion.div>

      {/* Llistat de serveis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {serveis.map(({ img, alt, title, text, icon }, i) => (
          <motion.article
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, boxShadow: "0px 8px 24px rgba(0,0,0,0.08)" }}
            transition={{ duration: 0.5 + i * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="relative w-full h-64 sm:h-72">
              <Image
                src={img}
                alt={`Imatge de servei: ${alt}`}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 text-center">
              {icon}
              <h3 className="text-xl font-semibold text-brown-sugar mb-2">{title}</h3>
              <p className="text-slate-gray">{text}</p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center pt-8">
        <a
          href="/contacto"
          className="inline-block px-6 py-3 bg-forest-green text-white font-medium rounded-full shadow-md hover:bg-green-700 transition"
        >
          Demana pressupost
        </a>
      </div>
    </section>
  );
}
