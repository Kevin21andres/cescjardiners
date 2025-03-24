"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function MontatgeJardins() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
      {/* Encapçalament */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h1 className="text-4xl font-extrabold text-forest-green mb-4">
          Muntatge de jardins
        </h1>
        <p className="text-lg text-slate-gray max-w-3xl mx-auto">
          A Cesc Jardiners ens encarreguem de complir totes les teves necessitats relacionades amb el jardí.
          Des del disseny personalitzat amb plànols i eines tecnològiques, fins a la selecció de materials clau per crear un espai verd funcional, estètic i durador.
        </p>
      </motion.div>

      {/* Explicació general */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-slate-gray text-base leading-relaxed space-y-6"
      >
        <p>
          Per garantir un resultat òptim, treballem amb un pressupost clar i detallat que s’adapta als teus objectius amb el jardí.
          La nostra experiència i professionalitat són claus per oferir solucions eficients i resultats que superen expectatives.
        </p>
        <p>
          A continuació, et mostrem alguns dels elements clau que formen part del nostre servei de muntatge:
        </p>
      </motion.div>

      {/* Llistat de serveis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
        {[
          {
            img: "/images/seleccio-plantes.jpeg",
            alt: "Selecció de plantes",
            title: "Selecció de plantes",
            text: "Triem acuradament espècies que s’adaptin al clima, tipus de sòl i preferències estètiques de cada client.",
          },
          {
            img: "/images/instalacio-gespa1.jpeg",
            alt: "Instal·lació de gespa",
            title: "Instal·lació de gespa",
            text: "Col·loquem gespa natural o artificial amb acabats professionals, drenatge i preparació del terreny.",
          },
          {
            img: "/images/tot-tipus.jpeg",
            alt: "Plantació de vegetació",
            title: "Plantació de tot tipus",
            text: "Realitzem plantació d’arbres, arbustos, flors, tanques vegetals i tota mena de vegetació segons el projecte.",
          },
          {
            img: "/images/instalacio-reg.jpeg",
            alt: "Instal·lació de reg",
            title: "Instal·lació de reg",
            text: "Instal·lem sistemes automàtics i eficients per garantir un reg adequat i sostenible per al teu jardí.",
          },
        ].map(({ img, alt, title, text }, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 + i * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl shadow-md overflow-hidden"
          >
            <div className="relative w-full h-64 sm:h-72">
              <Image
                src={img}
                alt={alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-brown-sugar mb-2">{title}</h3>
              <p className="text-slate-gray">{text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
