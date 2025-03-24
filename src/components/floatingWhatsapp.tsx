"use client";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function FloatingWhatsapp() {
  return (
    <motion.a
      href="https://web.whatsapp.com/send?phone=34638158473&text=Hola%20Cesc!!"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition transform hover:scale-105"
    >
      <FaWhatsapp className="w-6 h-6" />
    </motion.a>
  );
}
