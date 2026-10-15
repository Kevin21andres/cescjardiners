export type ContactLocale = "ca" | "es" | "en";

export type ContactPayload = {
  nom: string;
  email: string;
  telefon: string;
  codiPostal: string;
  missatge: string;
  token: string;
  locale: ContactLocale;
  empresa: string;
};

type Result = { ok: true; data: ContactPayload } | { ok: false; code: "invalid" | "too_long" };

function textValue(value: unknown, max: number): string | null {
  if (typeof value !== "string" || value.length > max) return null;
  return value.trim();
}

export function parseContactPayload(body: unknown): Result {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { ok: false, code: "invalid" };
  const b = body as Record<string, unknown>;
  const nom = textValue(b.nom, 100);
  const email = textValue(b.email, 254);
  const telefon = textValue(b.telefon ?? "", 30);
  const codiPostal = textValue(b.codiPostal ?? "", 15);
  const missatge = textValue(b.missatge, 5000);
  const token = textValue(b.token, 4096);
  const empresa = textValue(b.empresa ?? "", 200);
  const locale = b.locale === "es" || b.locale === "en" ? b.locale : "ca";
  if ([nom,email,telefon,codiPostal,missatge,token,empresa].some(v => v === null)) return {ok:false,code:"too_long"};
  if (!nom || !email || !missatge || !token) return {ok:false,code:"invalid"};
  if (nom.length < 2 || /[\r\n<>]/.test(nom)) return {ok:false,code:"invalid"};
  if (!/^[^\s@<>\r\n]{1,64}@[^\s@<>\r\n]{1,189}\.[a-zA-Z]{2,63}$/.test(email)) return {ok:false,code:"invalid"};
  if (telefon && !/^[+()0-9 .-]{5,30}$/.test(telefon)) return {ok:false,code:"invalid"};
  if (codiPostal && !/^[\p{L}\p{N} .-]{1,15}$/u.test(codiPostal)) return {ok:false,code:"invalid"};
  if (missatge.length < 8 || /\u0000/.test(missatge)) return {ok:false,code:"invalid"};
  return {ok:true,data:{nom,email,telefon:telefon!,codiPostal:codiPostal!,missatge,token,locale,empresa:empresa!}};
}

export function escapeHtml(text: string): string {
  return text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#39;");
}

export function isAllowedOrigin(origin: string | undefined, host: string | undefined): boolean {
  if (!origin) return true; // Server-to-server clients still require reCAPTCHA and rate limit.
  if (!host || /[\r\n/]/.test(host)) return false;
  try {
    const parsed = new URL(origin);
    if (!["https:","http:"].includes(parsed.protocol)) return false;
    if (parsed.username || parsed.password || parsed.pathname !== "/" || parsed.search || parsed.hash) return false;
    return parsed.host.toLowerCase() === host.toLowerCase();
  } catch { return false; }
}
