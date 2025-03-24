"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const serveis = [
  {
    title: "Disseny de jardins",
    text: "Transformem la teva idea en un jardí real. Estil, funcionalitat i bellesa.",
    image: "/images/disseny.jpeg",
    alt: "Disseny de jardins mediterranis a Tarragona",
  },
  {
    title: "Manteniment professional",
    text: "Cuidem el teu jardí amb visites periòdiques i atenció experta.",
    image: "/images/manteniment.jpg",
    alt: "Manteniment de jardins a Tarragona i voltants",
  },
  {
    title: "Instal·lació de gespa",
    text: "Solucions netes i duradores amb gespa artificial d’alta qualitat.",
    image: "/images/gespa.jpeg",
    alt: "Gespa artificial instal·lada per jardiners a Tarragona",
  },
];

const ServiciosDestacados = () => (
  <section
    className="py-20 px-4 sm:px-6 bg-slate-50"
    aria-labelledby="serveis-destacats"
  >
    <div className="max-w-6xl mx-auto">
      <h2
        id="serveis-destacats"
        className="text-3xl md:text-4xl font-bold text-center text-forest-green mb-16"
      >
        Serveis de jardineria a Tarragona
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-12">
        {serveis.map((s, i) => (
          <motion.article
            key={i}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative w-full h-56 sm:h-64 md:h-72">
              <Image
                src={s.image}
                alt={s.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-brown-sugar mb-2">
                {s.title}
              </h3>
              <p className="text-slate-gray text-sm">{s.text}</p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Text SEO + CTA enllaç intern */}
      <div className="text-center max-w-3xl mx-auto text-slate-gray text-base leading-relaxed">
        <p className="mb-4">
          A <strong>Cesc Jardiners</strong>, oferim serveis de jardineria a <strong>Tarragona, Cunit, Cambrils, Salou i voltants</strong>. Estem especialitzats en jardins mediterranis, manteniment, gespa artificial i més.
        </p>
        <p>
          <Link
            href="/contacto"
            className="text-forest-green font-semibold underline hover:text-brown-sugar transition"
          >
            Demana pressupost sense compromís
          </Link>
        </p>
      </div>
    </div>
  </section>
);

export default ServiciosDestacados;
