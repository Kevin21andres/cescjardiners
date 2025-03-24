"use client";
import { motion } from "framer-motion";

export const SparklesCore = ({ className = "" }: { className?: string }) => {
  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 overflow-hidden max-h-screen ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.25 }}
      transition={{ duration: 1 }}
      aria-hidden="true"
    >
      <div className="w-full h-full bg-[radial-gradient(#ffffff33_1px,transparent_1px)] bg-[size:16px_16px] animate-pulse" />
    </motion.div>
  );
};
