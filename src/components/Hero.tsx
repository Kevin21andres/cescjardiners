"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => (
  <section className="relative w-full min-h-[90vh] sm:min-h-screen flex items-center justify-center text-white overflow-hidden">
    {/* Vídeo de fons */}
    <video
      className="absolute inset-0 w-full h-full object-cover z-0"
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
    >
      <source src="/video/fondohome.mp4" type="video/mp4" />
      El teu navegador no suporta vídeos HTML5.
    </video>

    {/* Capa fosca sobre el vídeo */}
    <div className="absolute inset-0 bg-gradient-to-tr from-black/80 to-black/50 z-10" />

    {/* Contingut central */}
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative z-20 text-center px-4 sm:px-6 max-w-3xl mx-auto"
    >
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 tracking-tight drop-shadow">
        Cesc Jardiners
      </h1>
      <p className="text-base sm:text-xl md:text-2xl text-white/90 mb-8 drop-shadow">
        Jardiners professionals a Tarragona i voltants. Disseny, muntatge i manteniment d'espais verds.
      </p>
      <Link
        href="/contacto"
        className="inline-block bg-brown-sugar hover:bg-white hover:text-brown-sugar transition font-semibold px-6 py-3 rounded-full shadow-lg text-sm sm:text-base md:text-lg"
      >
        Sol·licita el teu pressupost
      </Link>
    </motion.div>
  </section>
);

export default Hero;
