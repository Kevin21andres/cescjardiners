/** @type {import('next').NextConfig} */
const nextConfig={
  reactStrictMode:true,
  experimental:{globalNotFound:true},
  poweredByHeader:false,
  images:{formats:["image/avif","image/webp"]},
  async redirects(){
    return [
      {source:"/",destination:"/ca",permanent:true},
      {source:"/nosotros",destination:"/ca/nosaltres",permanent:true},
      {source:"/fotografias",destination:"/ca/projectes",permanent:true},
      {source:"/contacto",destination:"/ca/contacte",permanent:true},
      {source:"/politica-de-privacidad",destination:"/ca/politica-privacitat",permanent:true},
      {source:"/politica-de-cookies",destination:"/ca/politica-cookies",permanent:true},
      {source:"/avis-legal",destination:"/ca/avis-legal",permanent:true},
      {source:"/servicios/montaje",destination:"/ca/serveis/muntatge-jardins",permanent:true},
      {source:"/servicios/manteniment-jardins",destination:"/ca/serveis/manteniment-jardins",permanent:true},
      {source:"/servicios/manteniment-piscines",destination:"/ca/serveis/manteniment-piscines",permanent:true},
      {source:"/servicios/gespa-artificial",destination:"/ca/serveis/installacio-gespa",permanent:true},
      {source:"/servicios/poda-arbres",destination:"/ca/serveis/poda-arbres",permanent:true},
      {source:"/servicios/reg-automatic",destination:"/ca/serveis/reg-automatic",permanent:true},
      {source:"/servicios/:rest*",destination:"/ca/serveis",permanent:true},
    ];
  },
  async headers(){
    return [{
      source:"/:path*",
      headers:[
        {key:"X-Content-Type-Options",value:"nosniff"},
        {key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},
        {key:"X-Frame-Options",value:"DENY"},
        {key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"},
      ],
    }];
  },
};
export default nextConfig;
