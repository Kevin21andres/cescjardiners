"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const CtaFinal = () => (
  <section className="relative bg-gradient-to-tr from-forest-green to-brown-sugar text-white text-center py-16 sm:py-20 px-4 sm:px-6 mb-16 sm:mb-24">
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="relative z-10"
    >
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
        Preparat per transformar el teu jardí?
      </h3>
      <p className="text-base sm:text-lg mb-6">
        Demana pressupost gratuït i sense compromís avui mateix.
      </p>
      <Link
        href="/contacto"
        className="inline-block bg-white text-forest-green font-bold px-6 py-3 rounded-full hover:bg-opacity-90 transition"
      >
        Contactar ara
      </Link>
    </motion.div>
    <div className="absolute w-60 h-60 sm:w-[300px] sm:h-[300px] bg-white/10 rounded-full blur-3xl -bottom-10 -right-10 z-0" />
  </section>
);

export default CtaFinal;
