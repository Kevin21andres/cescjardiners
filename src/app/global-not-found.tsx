import "./globals.css";
import Global404Content from "@/components/Global404Content";

export const metadata={
  title:"404 | Cesc Jardiners",
  robots:{index:false,follow:false},
};

export default function GlobalNotFound(){
  return (
    <html lang="ca">
      <body className="bg-warm-paper text-deep-forest">
        <Global404Content/>
      </body>
    </html>
  );
}
