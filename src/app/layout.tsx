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
  title: "Cesc Jardiners | La jardineria al teu costat",
  description: "Serveis professionals de jardineria, paisatgisme i manteniment.",
  icons: {
    icon: "./images/logocj.png",
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
