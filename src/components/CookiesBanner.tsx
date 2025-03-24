"use client";

import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import Link from "next/link";

export default function CookiesBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-50 bg-white border border-slate-200 shadow-2xl rounded-xl p-5 animate-fade-in-up">
      <div className="flex items-start gap-4">
        <div className="text-brown-sugar mt-1 shrink-0">
          <Cookie className="w-6 h-6" />
        </div>
        <div className="text-sm text-slate-700 space-y-3">
          <p>
            Utilitzem cookies per oferir-te una millor experiència. En continuar navegant, acceptes la nostra{" "}
            <Link
              href="/politica-de-privacidad"
              className="underline hover:text-brown-sugar transition-colors"
            >
              política de cookies
            </Link>.
          </p>
          <div className="flex justify-end">
            <button
              onClick={acceptCookies}
              className="bg-brown-sugar text-white px-4 py-2 rounded-md hover:bg-forest-green transition-colors text-sm font-medium"
            >
              Acceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
