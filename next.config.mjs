/** @type {import('next').NextConfig} */
const nextConfig={
  reactStrictMode:true,
  experimental:{globalNotFound:true},
  poweredByHeader:false,
  // WebP is already the format of our source assets; avoid slow cold AVIF encoding.
  images:{formats:["image/webp"]},
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
        {key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=(), payment=()"},
        {key:"Strict-Transport-Security",value:"max-age=31536000"},
        {key:"X-Permitted-Cross-Domain-Policies",value:"none"},
        {key:"Cross-Origin-Opener-Policy",value:"same-origin-allow-popups"},
        {key:"Cross-Origin-Resource-Policy",value:"same-origin"},
        {key:"Content-Security-Policy",value:[
          "default-src 'self'",
          "base-uri 'self'",
          "object-src 'none'",
          "frame-ancestors 'none'",
          "form-action 'self'",
          "script-src 'self' 'unsafe-inline' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https://www.google.com https://www.gstatic.com",
          "font-src 'self' data:",
          "connect-src 'self' https://www.google.com/recaptcha/",
          "frame-src https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/",
          "media-src 'self'",
          "manifest-src 'self'",
        ].join("; ")},
      ],
    }];
  },
};
export default nextConfig;
