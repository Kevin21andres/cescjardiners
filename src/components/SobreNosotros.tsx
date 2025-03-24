"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const SobreNosaltres = () => (
  <section
    className="py-20 bg-white px-4 sm:px-6"
    aria-labelledby="heading-sobre-nosaltres"
  >
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Contingut textual */}
      <motion.article
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center md:text-left"
      >
        <h2
          id="heading-sobre-nosaltres"
          className="text-2xl sm:text-3xl font-bold text-forest-green mb-4"
        >
          Jardiner a Tarragona – Sobre Cesc Jardiners
        </h2>
        <p className="text-base sm:text-lg text-slate-gray leading-relaxed">
          Som un equip de professionals amb més de 35 anys d’experiència en
          jardineria i paisatgisme a Tarragona i voltants. La nostra missió és
          crear espais verds vius, funcionals i amb identitat pròpia, adaptats
          al clima mediterrani.
        </p>
        <div className="mt-6">
          <Link
            href="/nosotros"
            title="Coneix més sobre Cesc Jardiners"
            aria-label="Més informació sobre Cesc Jardiners, jardineria a Tarragona"
            className="inline-block bg-forest-green text-white px-6 py-2 rounded hover:bg-brown-sugar transition"
          >
            Saber-ne més sobre l’equip
          </Link>
        </div>
      </motion.article>

      {/* Imatge representativa */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Image
          src="/images/equip.webp"
          alt="Equip de jardiners de Cesc Jardiners treballant a Tarragona"
          title="Jardiners professionals a Tarragona - Cesc Jardiners"
          width={600}
          height={400}
          className="rounded-xl shadow-inner object-cover w-full h-64 sm:h-80 md:h-72"
          priority
        />
      </motion.div>
    </div>
  </section>
);

export default SobreNosaltres;
