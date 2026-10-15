import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Raleway } from "next/font/google";
import Footer from "@/components/Footer";
import FloatingWhatsapp from "@/components/floatingWhatsapp";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cesc Jardiners | Jardineria a Tarragona",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Disseny, muntatge i manteniment de jardins a Tarragona, Reus, Cambrils i voltants. Demana pressupost a Cesc Jardiners.",
  applicationName: SITE_NAME,
  icons: { icon: "/images/logocj.png" },
  robots: { index: true, follow: true },
};

const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${SITE_URL}/#empresa`,
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/images/zona-jardi.webp`,
  logo: `${SITE_URL}/images/logocj.png`,
  email: "cescjardiners@gmail.com",
  telephone: "+34638158473",
  description: "Disseny, muntatge i manteniment de jardins i piscines a Tarragona i voltants.",
  areaServed: [
    { "@type": "Place", name: "Tarragona" },
    { "@type": "Place", name: "Reus" },
    { "@type": "Place", name: "Cambrils" },
    { "@type": "Place", name: "Salou" },
  ],
  sameAs: [
    "https://www.instagram.com/cesc.jardiners/",
    "https://www.tiktok.com/@cescjardiners",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ca">
      <body className={`${raleway.className} bg-white text-slate-950`}>
        <a
          href="#contingut-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-3 focus:text-black focus:shadow-xl"
        >
          Salta al contingut principal
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar />
        <main id="contingut-principal">{children}</main>
        <FloatingWhatsapp />
        <Footer />
      </body>
    </html>
  );
}
