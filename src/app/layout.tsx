import "./globals.css";
import Navbar from "@/components/Navbar";
import { Raleway } from "next/font/google";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/floatingWhatsapp";
import CookiesBanner from "@/components/CookiesBanner";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});


export const metadata = {
  title: "Jardiner a Tarragona | Cesc Jardiners | Disseny i Manteniment de Jardins",
  description:
    "Cesc Jardiners ofereix serveis professionals de jardineria a Tarragona, Reus, Cambrils i voltants. Especialistes en manteniment de jardins, gespa artificial, poda i reg automàtic.",
  keywords: [
    "jardiner Tarragona",
    "jardineria Reus",
    "manteniment jardins Cambrils",
    "paisatgisme Tarragona",
    "gespa artificial",
    "poda arbres Tarragona",
    "reg automàtic",
    "serveis jardiners",
    "empresa jardineria tarragona",
  ],
  icons: {
    icon: "/images/logocj.png",
  },
  openGraph: {
    title: "Cesc Jardiners | Jardineria a Tarragona i voltants",
    description:
      "Serveis de jardineria de confiança a Tarragona. Disseny, manteniment i cura de jardins mediterranis. Demana pressupost avui mateix!",
    url: "https://cescjardiners.cat",
    siteName: "Cesc Jardiners",
    images: [
      {
        url: "https://cescjardiners.cat/images/manteniment.jpg", // Substitueix per la teva imatge
        width: 1200,
        height: 630,
        alt: "Jardí mediterrani creat per Cesc Jardiners",
      },
    ],
    locale: "ca_ES",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  alternates: {
    canonical: "https://cescjardiners.cat",
  },
};



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ca">
      <body className={`${raleway.className} bg-white text-black`}>
        <Navbar />
        <main className="max-w-7xl mx-auto px-4">{children}</main>
        <FloatingWhatsapp />
        <CookiesBanner/>
        <div className="mt-24">
          <Footer />
        </div>
      </body>
    </html>
  );
}
