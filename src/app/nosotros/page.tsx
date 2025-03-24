"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Nosotros() {
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
        <h1 className="text-4xl md:text-5xl font-extrabold text-forest-green mb-6 tracking-tight">
          Sobre nosaltres
        </h1>
        <p className="text-lg text-slate-gray max-w-2xl mx-auto leading-relaxed">
          A Cesc Jardiners som un petit equip de professionals en jardineria. Ens dediquem amb passió al manteniment de jardins, piscines i espais comunitaris. Sempre estem a la disposició del client.
        </p>
      </motion.div>

      {/* Orígens */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 items-center gap-12 bg-white rounded-2xl p-8 shadow-md"
      >
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold text-brown-sugar mb-4">Els nostres orígens</h2>
          <p className="text-slate-gray text-base leading-relaxed">
            La nostra empresa va néixer l’any 1988 iniciant-se al món de la jardineria. Amb els anys, hem evolucionat i ens hem format per millorar i ampliar els nostres serveis. Treballem per adaptar-nos a les necessitats dels clients, especialitzant-nos en jardins de clima mediterrani, sostenibilitat i integració de serveis complementaris.
          </p>
        </div>
        <div>
          <Image
            src="/images/origens.jpeg"
            alt="Equip de Cesc Jardiners"
            width={500}
            height={350}
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
      </motion.div>

      {/* Filosofia */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 items-center gap-12 bg-forest-green/5 rounded-2xl p-8 shadow-md"
      >
        <div className="order-2 md:order-2">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown-sugar mb-4">Professionalitat i satisfacció</h2>
          <p className="text-slate-gray text-base leading-relaxed">
            Ens dona molta satisfacció veure que el client té totes les seves necessitats cobertes. Així percebrà que els nostres resultats són excel·lents. Tractem cada àmbit amb gran professionalitat.
          </p>
        </div>
        <div className="order-1 md:order-1">
          <Image
            src="/images/treballantjardi.jpg"
            alt="Treballant al jardí"
            width={500}
            height={350}
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
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
        <p className="text-slate-gray text-base leading-relaxed">
          Som experts en manteniment de jardins, la nostra feina més habitual. També oferim serveis complets de jardineria per a tot tipus d'espais i clients.
        </p>
      </motion.div>
    </section>
  );
}
