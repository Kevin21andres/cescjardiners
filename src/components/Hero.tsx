"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => (
  <section className="relative min-h-[90vh] sm:h-screen w-full overflow-hidden flex items-center justify-center text-white py-20 sm:py-0">
    {/* Vídeo de fons */}
    <video
      className="absolute inset-0 w-full h-full object-cover z-0"
      autoPlay
      loop
      muted
      playsInline
    >
      <source src="./video/fondohome.mp4" type="video/mp4" />
      El teu navegador no suporta vídeos HTML5.
    </video>

    {/* Capa fosca sobre el vídeo */}
    <div className="absolute inset-0 bg-gradient-to-tr from-black/70 to-black/40 z-10" />

    {/* Contingut */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative z-20 text-center px-4 sm:px-6"
    >
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
        Cesc Jardiners
      </h1>
      <p className="text-base sm:text-xl md:text-2xl max-w-2xl mx-auto mb-8 px-2 sm:px-0">
        La jardineria, al teu costat
      </p>
      <Link
        href="/contacto"
        className="inline-block bg-brown-sugar hover:bg-white hover:text-brown-sugar transition font-semibold px-6 py-3 rounded-full shadow-lg text-base sm:text-lg"
      >
        Sol·licita el teu pressupost
      </Link>
    </motion.div>
  </section>
);

export default Hero;
