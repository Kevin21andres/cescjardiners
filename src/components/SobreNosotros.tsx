"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const SobreNosotros = () => (
  <section className="py-20 bg-white px-4 sm:px-6">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center md:text-left"
      >
        <h3 className="text-2xl sm:text-3xl font-bold text-forest-green mb-4">
          Sobre Cesc Jardiners
        </h3>
        <p className="text-base sm:text-lg text-slate-gray leading-relaxed">
          Som un equip de professionals amb més de 35 anys d’experiència,
          especialitzats en jardineria i paisatgisme. La nostra missió és crear
          espais verds vius, funcionals i amb ànima.
        </p>
        <div className="mt-6">
          <Link
            href="/nosotros"
            className="inline-block bg-forest-green text-white px-6 py-2 rounded hover:bg-brown-sugar transition"
          >
            Saber-ne més
          </Link>
        </div>
      </motion.div>

      <div>
        <Image
          src="/images/equip.jpg"
          alt="Equip de CESC Jardiners"
          width={600}
          height={400}
          className="rounded-xl shadow-inner object-cover w-full h-64 sm:h-80 md:h-72"
        />
      </div>
    </div>
  </section>
);

export default SobreNosotros;
