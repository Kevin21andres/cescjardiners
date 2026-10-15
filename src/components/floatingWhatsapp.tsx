import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsapp() {
  return (
    <a
      href="https://wa.me/34638158473?text=Hola%20Cesc%21%20Estic%20interessat%20en%20els%20serveis%20de%20jardineria."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contacta amb Cesc Jardiners per WhatsApp (s'obre en una pestanya nova)"
      className="fixed bottom-5 right-5 z-40 rounded-full bg-green-600 p-4 text-white shadow-xl transition hover:scale-105 hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-700"
    >
      <FaWhatsapp aria-hidden="true" className="h-6 w-6" />
    </a>
  );
}
