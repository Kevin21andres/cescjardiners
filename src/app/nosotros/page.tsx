"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { FaLeaf, FaSwimmingPool, FaUsers } from "react-icons/fa";

export default function Nosotros() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-32">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <motion.h1 
          className="text-4xl md:text-5xl font-extrabold text-forest-green mb-6 tracking-tight"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Sobre nosaltres
        </motion.h1>
        <motion.p 
          className="text-lg text-slate-gray max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          A Cesc Jardiners som un petit equip de professionals en jardineria. Ens dediquem amb passió al manteniment de jardins, piscines i espais comunitaris. Sempre estem a la disposició del client.
        </motion.p>
      </motion.div>

      {/* Orígens */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 items-center gap-12 bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-brown-sugar mb-4">Els nostres orígens</h2>
          <p className="text-slate-gray text-base leading-relaxed">
            La nostra empresa va néixer l'any 1988 iniciant-se al món de la jardineria. Amb els anys, hem evolucionat i ens hem format per millorar i ampliar els nostres serveis. Treballem per adaptar-nos a les necessitats dels clients, especialitzant-nos en jardins de clima mediterrani, sostenibilitat i integració de serveis complementaris.
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src="/images/origens.webp"
            alt="Equip de Cesc Jardiners"
            width={500}
            height={350}
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Filosofia */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 items-center gap-12 bg-forest-green/5 rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300"
      >
        <div className="order-2 md:order-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown-sugar mb-4">Professionalitat i satisfacció</h2>
          <p className="text-slate-gray text-base leading-relaxed">
            Ens dona molta satisfacció veure que el client té totes les seves necessitats cobertes. Així percebrà que els nostres resultats són excel·lents. Tractem cada àmbit amb gran professionalitat.
          </p>
        </div>
        <motion.div
          className="order-1 md:order-1"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src="/images/treballantjardi.webp"
            alt="Treballant al jardí"
            width={500}
            height={350}
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Especialitzacions */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-brown-sugar mb-4">
          En què estem especialitzats?
        </h2>
        <p className="text-slate-gray text-base leading-relaxed mb-8">
          Som experts en manteniment de jardins, la nostra feina més habitual. També oferim serveis complets de jardineria per a tot tipus d'espais i clients.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: FaLeaf, text: "Manteniment de jardins" },
            { icon: FaSwimmingPool, text: "Cura de piscines" },
            { icon: FaUsers, text: "Espais comunitaris" },
          ].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <item.icon className="text-4xl text-forest-green mb-4 mx-auto" />
              <p className="text-slate-gray">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        className="text-center bg-forest-green text-white p-8 rounded-2xl shadow-lg"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Vols saber més sobre nosaltres?</h2>
        <p className="mb-6">Estem aquí per ajudar-te amb qualsevol pregunta o projecte que tinguis en ment.</p>
        <motion.button
          className="bg-white text-forest-green font-semibold py-2 px-6 rounded-full hover:bg-opacity-90 transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Contacta'ns
        </motion.button>
        <motion.div
          className="mt-4 text-sm opacity-0"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          Estarem encantats d'escoltar-te!
        </motion.div>
      </motion.div>
    </section>
  );
}
