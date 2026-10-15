"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, MessageSquare, Phone, User } from "lucide-react";

type RecaptchaApi = {
  render: (element: HTMLElement, options: { sitekey: string }) => number;
  getResponse: (widgetId?: number) => string;
  reset: (widgetId?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: RecaptchaApi;
  }
}

type ContactForm = {
  nom: string;
  email: string;
  telefon: string;
  codiPostal: string;
  missatge: string;
  empresa: string;
};

const initialForm: ContactForm = {
  nom: "",
  email: "",
  telefon: "",
  codiPostal: "",
  missatge: "",
  empresa: "",
};

const RECAPTCHA_SITE_KEY = "6Lc-sP0qAAAAAI_dlSqjTgWbFLcgmnjCBHFhPXy_";

const fields = [
  { name: "nom", label: "Nom", type: "text", required: true, maxLength: 100, autoComplete: "name", icon: User },
  { name: "email", label: "Correu electrònic", type: "email", required: true, maxLength: 254, autoComplete: "email", icon: Mail },
  { name: "telefon", label: "Telèfon (opcional)", type: "tel", required: false, maxLength: 30, autoComplete: "tel", icon: Phone },
  { name: "codiPostal", label: "Codi postal (opcional)", type: "text", required: false, maxLength: 15, autoComplete: "postal-code", icon: MapPin },
] as const;

export default function Contacte() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [privacyRead, setPrivacyRead] = useState(false);
  const [captchaEnabled, setCaptchaEnabled] = useState(false);
  const [captchaStatus, setCaptchaStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const captchaContainer = useRef<HTMLDivElement>(null);
  const captchaWidgetId = useRef<number | null>(null);

  useEffect(() => {
    if (!captchaEnabled) return;
    let active = true;

    const render = () => {
      if (!active || !captchaContainer.current || captchaWidgetId.current !== null || !window.grecaptcha) return;
      try {
        captchaWidgetId.current = window.grecaptcha.render(captchaContainer.current, {
          sitekey: RECAPTCHA_SITE_KEY,
        });
        setCaptchaStatus("ready");
      } catch {
        setCaptchaStatus("error");
      }
    };

    const onError = () => {
      if (!active) return;
      setCaptchaStatus("error");
      document.getElementById("cesc-recaptcha-script")?.remove();
    };

    let script = document.getElementById("cesc-recaptcha-script") as HTMLScriptElement | null;
    if (!script && !window.grecaptcha) {
      script = document.createElement("script");
      script.id = "cesc-recaptcha-script";
      script.src = "https://www.google.com/recaptcha/api.js?render=explicit&hl=ca";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    script?.addEventListener("load", render);
    script?.addEventListener("error", onError);
    render();

    return () => {
      active = false;
      script?.removeEventListener("load", render);
      script?.removeEventListener("error", onError);
    };
  }, [captchaEnabled]);

  const change = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const field = event.target.name as keyof ContactForm;
    setForm((previous) => ({ ...previous, [field]: event.target.value }));
  };

  const activateCaptcha = () => {
    setError("");
    setCaptchaStatus("loading");
    setCaptchaEnabled(true);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!privacyRead) {
      setError("Cal llegir la política de privacitat abans d'enviar.");
      return;
    }

    const token = window.grecaptcha?.getResponse(captchaWidgetId.current ?? undefined);
    if (!token) {
      setError("Si us plau, completa la verificació reCAPTCHA.");
      return;
    }

    setSending(true);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        signal: controller.signal,
        body: JSON.stringify({ ...form, token }),
      });

      const result: { success?: boolean; error?: string } = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || "No s'ha pogut enviar el missatge.");
      }
      setSent(true);
      setForm(initialForm);
    } catch (caught) {
      setError(caught instanceof Error && caught.name !== "AbortError"
        ? caught.message
        : "La connexió ha trigat massa. Torna-ho a provar.");
      window.grecaptcha?.reset(captchaWidgetId.current ?? undefined);
    } finally {
      window.clearTimeout(timeout);
      setSending(false);
    }
  };

  return (
    <section className="bg-warm-paper px-5 py-20 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto grid max-w-[1320px] gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <aside>
          <p className="site-eyebrow mb-6 text-brown-sugar">Tens una idea?</p>
          <h1 className="font-editorial text-[clamp(3.8rem,6.4vw,7rem)] leading-[.98] text-deep-forest">
            Fem-la <span className="italic text-forest-green">créixer.</span>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-9 text-slate-gray">Tens un projecte de jardineria, vols cuidar un jardí o necessites informació? Explica'ns-ho i en parlem sense compromís.</p>
          <div className="mt-12 border-t border-warm-line">
            <a href="tel:+34638158473" className="flex items-start gap-4 border-b border-warm-line py-6 transition hover:text-brown-sugar">
              <Phone size={19} className="mt-1 shrink-0" aria-hidden="true"/>
              <span><strong className="block text-sm text-deep-forest">Truca'ns</strong><span className="mt-2 block text-slate-gray">+34 638 15 84 73</span></span>
            </a>
            <a href="mailto:cescjardiners@gmail.com" className="flex items-start gap-4 border-b border-warm-line py-6 transition hover:text-brown-sugar">
              <Mail size={19} className="mt-1 shrink-0" aria-hidden="true"/>
              <span><strong className="block text-sm text-deep-forest">Escriu-nos</strong><span className="mt-2 block break-all text-slate-gray">cescjardiners@gmail.com</span></span>
            </a>
            <div className="flex items-start gap-4 border-b border-warm-line py-6">
              <MapPin size={19} className="mt-1 shrink-0" aria-hidden="true"/>
              <span><strong className="block text-sm text-deep-forest">On treballem</strong><span className="mt-2 block text-slate-gray">Tarragona i voltants</span></span>
            </div>
          </div>
          <div className="relative mt-12 hidden h-[350px] overflow-hidden lg:block">
            <Image src="/images/seleccio-plantes.webp" alt="Selecció de plantes i vegetació per a jardins" fill sizes="40vw" className="object-cover"/>
          </div>
        </aside>
        <div className="border border-warm-line bg-white p-6 shadow-editorial sm:p-9 xl:p-12">
          <p className="site-eyebrow mb-4 text-brown-sugar">Formulari de contacte</p>
          <h2 className="font-editorial mb-4 text-4xl text-deep-forest sm:text-5xl">Explica'ns el teu projecte.</h2>
          <p className="mb-10 leading-8 text-slate-gray">Omple el formulari i et respondrem tan aviat com sigui possible.</p>

        {sent ? (
          <div role="status" className="border border-[#D3DACF] bg-[#ECF2E9] p-8 text-center">
            <h2 className="mb-3 text-2xl font-bold text-green-800">Missatge enviat correctament!</h2>
            <p className="text-green-900">Gràcies per contactar. Et respondrem ben aviat.</p>
            <button type="button" onClick={() => { setSent(false); setPrivacyRead(false); setCaptchaEnabled(false); setCaptchaStatus("idle"); captchaWidgetId.current = null; }} className="mt-6 rounded-full bg-forest-green px-5 py-2 font-semibold text-white hover:bg-green-800">
              Enviar un altre missatge
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-7">
            <div className="grid gap-5 sm:grid-cols-2">
              {fields.map((field) => (
                <div key={field.name}>
                  <label htmlFor={field.name} className="mb-2 block text-sm font-semibold text-slate-800">{field.label}</label>
                  <div className="relative">
                    <field.icon aria-hidden="true" className="absolute left-3 top-3.5 h-5 w-5 text-brown-sugar" />
                    <input id={field.name} name={field.name} type={field.type} required={field.required}
                      maxLength={field.maxLength} autoComplete={field.autoComplete}
                      value={form[field.name]} onChange={change}
                      className="w-full rounded-none border-0 border-b border-[#C5D0C3] bg-transparent py-3 pl-11 pr-4 text-slate-950 placeholder:text-slate-500 focus:border-forest-green focus:outline-none focus:ring-0"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div>
              <label htmlFor="missatge" className="mb-2 block text-sm font-semibold text-slate-800">Missatge</label>
              <div className="relative">
                <MessageSquare aria-hidden="true" className="absolute left-3 top-3.5 h-5 w-5 text-brown-sugar" />
                <textarea name="missatge" id="missatge" required rows={5} maxLength={5000}
                  value={form.missatge} onChange={change}
                  className="w-full rounded-none border-0 border-b border-[#C5D0C3] bg-transparent py-3 pl-11 pr-4 text-slate-950 focus:border-forest-green focus:outline-none focus:ring-0"
                />
              </div>
            </div>

            <div className="absolute -left-[10000px]" aria-hidden="true">
              <label htmlFor="empresa">No omplis aquest camp</label>
              <input id="empresa" name="empresa" value={form.empresa} onChange={change} tabIndex={-1} autoComplete="off" />
            </div>

            <label className="flex items-start gap-3 text-sm leading-relaxed text-slate-700">
              <input type="checkbox" checked={privacyRead} onChange={(event) => setPrivacyRead(event.target.checked)} required
                className="mt-1 h-4 w-4 shrink-0 accent-green-700" />
              <span>He llegit la <Link href="/politica-de-privacidad" className="font-semibold underline hover:text-forest-green">política de privacitat</Link> i entenc com es tractaran les meves dades.</span>
            </label>

            <div className="border border-warm-line bg-[#F7F7F2] p-5">
              {!captchaEnabled ? (
                <>
                  <p className="mb-3 text-sm text-slate-700">Per protegir el formulari contra el correu brossa, utilitzem Google reCAPTCHA. El servei només es carregarà si l'actives; Google pot tractar dades tècniques i utilitzar cookies. Consulta la <Link href="/politica-de-cookies" className="underline">informació sobre cookies</Link>.</p>
                  <button type="button" onClick={activateCaptcha} className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-forest-green shadow-sm ring-1 ring-forest-green hover:bg-green-50">Activar verificació reCAPTCHA</button>
                </>
              ) : (
                <>
                  {captchaStatus === "loading" && <p role="status" className="mb-3 text-sm text-slate-600">Carregant verificació…</p>}
                  {captchaStatus === "error" && (
                    <div role="alert">
                      <p className="mb-3 text-sm text-red-700">No s'ha pogut carregar reCAPTCHA. Comprova la connexió.</p>
                      <button type="button" onClick={() => { setCaptchaEnabled(false); setCaptchaStatus("idle"); }} className="text-sm font-semibold underline">Torna-ho a provar</button>
                    </div>
                  )}
                  <div ref={captchaContainer} className="max-w-full overflow-x-auto" />
                </>
              )}
            </div>

            {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}

            <button type="submit" disabled={sending || captchaStatus !== "ready"}
              className="w-full rounded-full bg-deep-forest px-8 py-4 font-bold text-white shadow-md transition hover:bg-forest-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-forest-green disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
              {sending ? "Enviant missatge…" : "Enviar missatge"}
            </button>

            <p className="text-sm text-slate-600">
              També pots escriure directament a <a className="font-semibold underline" href="mailto:cescjardiners@gmail.com">cescjardiners@gmail.com</a> o trucar al <a className="font-semibold underline" href="tel:+34638158473">638 15 84 73</a>.
            </p>
          </form>
        )}
        </div>
      </div>
    </section>
  );
}
