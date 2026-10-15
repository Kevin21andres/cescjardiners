"use client";

import { useEffect, useRef, useState } from "react";

/**
 * El vídeo és decoratiu: la imatge prioritària ja proporciona el contingut.
 * No descarreguem 7,6 MB si hi ha estalvi de dades, connexió lenta, pantalla
 * petita o preferència de moviment reduït.
 */
type NetworkInfo = { saveData?: boolean; effectiveType?: string; addEventListener?: (type:string, listener:()=>void)=>void; removeEventListener?: (type:string, listener:()=>void)=>void };
type NetworkNavigator = Navigator & { connection?: NetworkInfo };
export default function HeroVideo() {
  const [allowed, setAllowed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
    const connection = (navigator as NetworkNavigator).connection;
    const reevaluate = () => {
      const slow = connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g";
      setAllowed(media.matches && !connection?.saveData && !slow);
    };
    reevaluate();
    media.addEventListener("change", reevaluate);
    connection?.addEventListener?.("change", reevaluate);
    return () => {
      media.removeEventListener("change", reevaluate);
      connection?.removeEventListener?.("change", reevaluate);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!allowed || !video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.12 },
    );
    const onVisibility = () => {
      if (document.hidden) video.pause();
      else if (observer) void video.play().catch(() => {});
    };
    observer.observe(video);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [allowed]);

  if (!allowed) return null;
  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      poster="/images/zona-jardi.webp"
      tabIndex={-1}
    >
      <source src="/video/fondohome.mp4" type="video/mp4" />
    </video>
  );
}
