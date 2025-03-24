"use client";
import { motion } from "framer-motion";

const serveis = [
  {
    title: "Disseny de jardins",
    text: "Transformem la teva idea en un jardí real. Estil, funcionalitat i bellesa.",
    image: "/images/disseny.jpeg",
  },
  {
    title: "Manteniment professional",
    text: "Cuidem el teu jardí amb visites periòdiques i atenció experta.",
    image: "/images/manteniment.jpg",
  },
  {
    title: "Instal·lació de gespa",
    text: "Solucions netes i duradores amb gespa artificial d’alta qualitat.",
    image: "/images/gespa.jpeg",
  },
];

const ServiciosDestacados = () => (
  <section className="py-20 px-4 sm:px-6 bg-slate-50">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-forest-green mb-16">
        Serveis destacats
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {serveis.map((s, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            viewport={{ once: true }}
          >
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-56 sm:h-64 md:h-72 object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg sm:text-xl font-semibold text-brown-sugar mb-2">{s.title}</h3>
              <p className="text-slate-gray text-sm">{s.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ServiciosDestacados;
