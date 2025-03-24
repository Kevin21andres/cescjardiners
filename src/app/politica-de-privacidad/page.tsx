"use client";

import { motion } from "framer-motion";

export default function PoliticaPrivacitat() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20 space-y-12">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-forest-green text-center"
      >
        Política de Privacitat
      </motion.h1>

      <div className="space-y-10 text-slate-700 text-base leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold text-brown-sugar mb-2">Compromís amb la teva privacitat</h2>
          <p>
            Som una empresa que valora la transparència i la protecció de les dades personals. Mitjançant aquesta política, t'informem de com recollim i tractem la teva informació.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-brown-sugar mb-2">Responsable del tractament</h2>
          <ul className="list-disc pl-5">
            <li><strong>Nom:</strong> Francisco Moreno Aguilar</li>
            <li><strong>NIF:</strong> 52276597N</li>
            <li><strong>Adreça:</strong> Ctra. Santas Creus, Km 14, Pol. 4, Parcela 33, 43765, La Secuita (Tarragona)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-brown-sugar mb-2">Dades que recollim</h2>
          <p>
            Recollim dades com el teu nom, correu electrònic, telèfon, codi postal i altres dades que ens proporcionis mitjançant formularis, subscripcions o comentaris.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-brown-sugar mb-2">Finalitats del tractament</h2>
          <ul className="list-disc pl-5">
            <li>Respondre consultes i sol·licituds d'informació</li>
            <li>Gestió de subscripcions al butlletí</li>
            <li>Tramitació de candidatures (CV)</li>
            <li>Gestió de perfils d’usuari</li>
            <li>Comentaris en el blog</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-brown-sugar mb-2">Drets de l’usuari</h2>
          <ul className="list-disc pl-5">
            <li>Dret d'accés</li>
            <li>Dret de rectificació</li>
            <li>Dret d'oposició</li>
            <li>Dret de supressió</li>
            <li>Dret a la portabilitat</li>
            <li>Dret a la limitació del tractament</li>
          </ul>
          <p className="mt-2">
            Pots exercir aquests drets enviant un correu a <strong>cescjardiners@gmail.com</strong> o dirigint-te a l’adreça anteriorment indicada.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-brown-sugar mb-2">Temps de conservació</h2>
          <p>
            Les teves dades es conservaran durant el temps estrictament necessari per complir amb la finalitat per la qual es van recollir.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-brown-sugar mb-2">Compartició de dades</h2>
          <p>
            No compartim dades amb tercers llevat d'obligació legal o si és necessari per prestar el servei sol·licitat. No hi ha transferències internacionals previstes.
          </p>
        </div>
      </div>
    </section>
  );
}
