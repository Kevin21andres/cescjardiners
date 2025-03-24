"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, User, MessageSquare, Phone, MapPin } from "lucide-react";

export default function Contacte() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    telefon: "",
    codiPostal: "",
    missatge: "",
  });

  const [enviat, setEnviat] = useState(false);
  const [error, setError] = useState("");
  const recaptchaRef = useRef<HTMLDivElement>(null);

  const siteKey = "6Lc-sP0qAAAAAI_dlSqjTgWbFLcgmnjCBHFhPXy_";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js`;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const token = (window as any).grecaptcha?.getResponse();
    if (!token) {
      setError("Si us plau, completa el reCAPTCHA.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      const data = await res.json();
      if (res.ok) {
        setEnviat(true);
      } else {
        setError(data.error || "S'ha produït un error en enviar.");
      }
    } catch (err) {
      setError("No s'ha pogut enviar el missatge.");
    } finally {
      (window as any).grecaptcha?.reset();
    }
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 bg-gradient-to-br from-forest-green/10 to-white/80">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-full sm:max-w-3xl mx-auto bg-white/90 backdrop-blur-lg p-6 sm:p-10 rounded-3xl shadow-2xl border border-slate-200 relative z-10"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-forest-green mb-3">
          Contacta amb nosaltres
        </h1>
        <p className="text-center text-slate-600 mb-10 text-sm sm:text-base">
          Estarem encantats d’escoltar-te. Envia’ns un missatge i et respondrem tan aviat com puguem.
        </p>

        {!enviat ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { name: "nom", type: "text", icon: <User />, placeholder: "Nom" },
              { name: "email", type: "email", icon: <Mail />, placeholder: "Correu electrònic" },
              { name: "telefon", type: "tel", icon: <Phone />, placeholder: "Telèfon" },
              { name: "codiPostal", type: "text", icon: <MapPin />, placeholder: "Codi postal" },
            ].map((field, i) => (
              <div key={i} className="relative">
                <span className="absolute left-3 top-3.5 text-brown-sugar w-5 h-5">{field.icon}</span>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  required
                  value={(formData as any)[field.name]}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-sugar text-sm sm:text-base"
                />
              </div>
            ))}

            {/* Missatge */}
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3.5 text-brown-sugar w-5 h-5" />
              <textarea
                name="missatge"
                placeholder="Missatge"
                rows={5}
                required
                value={formData.missatge}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-sugar text-sm sm:text-base"
              ></textarea>
            </div>

            {/* Recaptcha */}
            <div className="pt-2" ref={recaptchaRef}>
              <div className="g-recaptcha" data-sitekey={siteKey}></div>
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-brown-sugar text-white px-6 py-3 rounded-md font-semibold text-lg"
            >
              Enviar missatge
            </motion.button>

          </form>
        ) : (
          <motion.div
            className="text-center text-green-700 font-semibold text-xl bg-green-50 p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Gràcies per contactar! Et respondrem ben aviat.
          </motion.div>
        )}
      </motion.div>

      {/* Fons decoratiu */}
      <div className="absolute top-0 left-0 w-52 h-52 sm:w-64 sm:h-64 bg-green-200 rounded-full opacity-20 blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-0 w-52 h-52 sm:w-64 sm:h-64 bg-yellow-100 rounded-full opacity-20 blur-3xl -z-10"></div>
    </section>
  );
}
