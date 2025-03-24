"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "react-modal";

const images = [
  { src: "/images/manteniment.jpg", alt: "Projecte de jardí" },
  { src: "/images/manteniment-piscines.jpeg", alt: "Piscina envoltada de gespa" },
  { src: "/images/manteniment-comunitat.jpeg", alt: "Manteniment de comunitat" },
  { src: "/images/zona-jardi.jpeg", alt: "Zona enjardinada mediterrània" },
  { src: "/images/poda-comunitat.jpeg", alt: "Detall de poda i cura" },
  { src: "/images/gespa.jpeg", alt: "Disseny de jardí modern" },
  { src: "/images/piscina-detall.jpeg", alt: "Detall de piscina neta" },
  { src: "/images/escocell.jpeg", alt: "Escocell net i ordenat" },
  { src: "/images/entrada-jardi.jpeg", alt: "Entrada jardí" },
  { src: "/images/jardi-entrada.jpeg", alt: "Entrada enjardinada elegant" },
  { src: "/images/equip.jpg", alt: "Equip de treball en acció" },
  { src: "/images/retirada-arbre.jpeg", alt: "Retirada d'arbre" },
];

Modal.setAppElement("body");

export default function Fotografies() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<{ src: string; alt: string } | null>(null);

  const openModal = (img: { src: string; alt: string }) => {
    setActiveImage(img);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setModalOpen(false);
    setActiveImage(null);
    document.body.style.overflow = "auto";
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20 space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-forest-green mb-6 tracking-tight">
          Fotografies dels nostres treballs
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Aquí pots veure una selecció de jardins, zones verdes i espais que hem transformat amb passió i professionalitat.
        </p>
      </motion.div>

      {/* Galeria */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {images.map((img, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer"
            onClick={() => openModal(img)}
          >
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-300 hover:scale-105 hover:brightness-90"
              />
            </div>
            <div className="px-5 py-4 text-center">
              <h3 className="text-sm font-semibold text-brown-sugar">{img.alt}</h3>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50 outline-none"
        overlayClassName="fixed inset-0 bg-black bg-opacity-80 transition-opacity duration-300 z-40"
        closeTimeoutMS={200}
      >
        <div className="relative w-[92vw] max-w-5xl max-h-[90vh] overflow-auto rounded-xl shadow-lg">
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 text-white text-3xl bg-black/50 hover:bg-black/70 rounded-full px-3 py-1"
            aria-label="Tancar imatge"
          >
            &times;
          </button>
          {activeImage && (
            <Image
              src={activeImage.src}
              alt={activeImage.alt}
              width={1200}
              height={800}
              className="w-full h-auto rounded-xl"
            />
          )}
        </div>
      </Modal>
    </section>
  );
}
