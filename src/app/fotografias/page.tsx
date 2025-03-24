"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const images = [
  { src: "/images/manteniment.jpg", alt: "Projecte de jardí" },
  { src: "/images/manteniment-piscines.jpeg", alt: "Piscina envoltada de gespa" },
  { src: "/images/manteniment-comunitat.jpeg", alt: "Manteniment de comunitat" },
  { src: "/images/zona-jardi.jpeg", alt: "Zona enjardinada mediterrània" },
  { src: "/images/poda-comunitat.jpeg", alt: "Detall de poda i cura" },
  { src: "/images/gespa.jpeg", alt: "Disseny de jardí modern" },
];

export default function Fotografies() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h1 className="text-4xl font-extrabold text-forest-green mb-4">
          Fotografies dels nostres treballs
        </h1>
        <p className="text-lg text-slate-gray max-w-2xl mx-auto">
          Aquí pots veure una selecció de jardins, zones verdes i espais que hem transformat amb passió i professionalitat.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={480}
              className="object-cover w-full h-60 sm:h-72 hover:scale-105 transition-transform duration-300"
            />
            <div className="px-4 py-3 text-center">
              <h3 className="text-brown-sugar font-semibold text-sm">{img.alt}</h3>
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
