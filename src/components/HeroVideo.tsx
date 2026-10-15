"use client";

import { useEffect, useState } from "react";

/** El vídeo no es descarrega en mòbils ni amb moviment reduït. */
export default function HeroVideo() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <video
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster="/images/zona-jardi.webp"
    >
      <source src="/video/fondohome.mp4" type="video/mp4" />
    </video>
  );
}
