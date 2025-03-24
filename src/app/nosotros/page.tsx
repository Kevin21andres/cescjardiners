"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Nosotros() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-24">
      {/* Introducció */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-forest-green mb-4">Sobre nosaltres</h1>
        <p className="text-lg text-slate-gray max-w-2xl mx-auto">
          A Cesc Jardiners som un petit equip de professionals en jardineria. Ens dediquem amb passió al manteniment de jardins, piscines i espais comunitaris. Sempre estem a la disposició del client.
        </p>
      </motion.div>

      {/* Orígens */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 items-center gap-10"
      >
        <div>
          <h2 className="text-2xl font-semibold text-brown-sugar mb-4">Els nostres orígens</h2>
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
            className="rounded-xl shadow-md w-full h-auto mt-6 md:mt-0"
          />
        </div>
      </motion.div>

      {/* Lema i filosofia */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-2 items-center gap-10"
      >
        <div>
          <h2 className="text-2xl font-semibold text-brown-sugar mb-4">Professionalitat i satisfacció</h2>
          <p className="text-slate-gray text-base leading-relaxed">
            Ens dona molta satisfacció veure que el client té totes les seves necessitats cobertes. Així percebrà que els nostres resultats són excel·lents. Tractem cada àmbit amb gran professionalitat.
          </p>
        </div>
        <div>
          <Image
            src="/images/treballantjardi.jpg"
            alt="Treballant al jardí"
            width={500}
            height={350}
            className="rounded-xl shadow-md w-full h-auto mt-6 md:mt-0"
          />
        </div>
      </motion.div>

      {/* Especialitzacions */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold text-brown-sugar mb-4 text-center">En què estem especialitzats?</h2>
        <p className="text-slate-gray text-base text-center max-w-2xl mx-auto">
          Som experts en manteniment de jardins, la nostra feina més habitual. També oferim serveis complets de jardineria per a tot tipus d'espais i clients.
        </p>
      </motion.div>
    </section>
  );
}
