# Cesc Jardiners — web corporativa

Web en català de **Cesc Jardiners**, desenvolupada amb Next.js (App Router), TypeScript i Tailwind CSS.

## Requisits

- Node.js compatible amb la versió de Next.js indicada a `package.json`
- npm
- Compte de Vercel o servidor compatible per desplegar Next.js

## Inici ràpid

```bash
npm ci
npm run dev
```

Visita http://localhost:3000.

## Verificacions

```bash
npm run lint
npm run typecheck
npm run build
```

## Formulari de contacte

La ruta `/api/contact` utilitza Nodemailer i Google reCAPTCHA v2. Configura les variables **només al servidor**:

```dotenv
RECAPTCHA_SECRET=
SMTP_EMAIL=
SMTP_PASS=
# Opcional: hostnames separats per comes
RECAPTCHA_ALLOWED_HOSTNAMES=cescjardiners.cat,www.cescjardiners.cat,cescjardiners.vercel.app,localhost
```

La **site key pública** de reCAPTCHA es troba al component de contacte. Registra a Google els dominis on s'utilitzi el widget. No incloguis les claus secretes al repositori ni utilitzis variables `NEXT_PUBLIC_` per a secrets.

reCAPTCHA es carrega únicament després que el visitant activi la verificació. El sistema d'enviament evita injecció HTML al cos del correu, limita la mida de la petició i valida les dades al servidor. Per mitigar el correu brossa a escala, configura també limitació de peticions al proveïdor de desplegament (WAF/rate limiting).

## SEO i publicació

- Les metadades es defineixen a `src/lib/seo.ts` i als layouts de ruta.
- `/sitemap.xml` i `/robots.txt` són generats per Next.js.
- El domini canònic configurat és https://cescjardiners.cat.
- La web incorpora dades estructurades `LocalBusiness`.

## Notes per a la posada en producció

- Verifica que el domini, correu, telèfon, serveis i dades legals són correctes.
- Revisa jurídicament els textos de privacitat, cookies i avís legal segons els serveis de tercers reals del desplegament.
- Comprova el funcionament de reCAPTCHA i SMTP a l'entorn de Vercel abans de publicar.
- Mesura Core Web Vitals i accessibilitat en dispositius reals.
- No incorporis cookies d'analítica/publicitat sense implantar el consentiment corresponent.

## Web multilingüe

La web admet tres idiomes amb rutes i metadades pròpies:
- Català: `/ca`
- Castellà: `/es`
- Anglès: `/en`

Les rutes es declaren a `src/lib/i18n.ts` i la mateixa pàgina s'obre en cada idioma des del selector CAT / ES / EN. Per modificar continguts o traduccions, actualitza els diccionaris d'aquest fitxer. `src/lib/seo-localized.ts` genera canonicals i alternatius `hreflang`, i `src/app/sitemap.ts` publica les versions lingüístiques.

Per validar les tres versions localment:
```bash
npm ci
npm run build
npm run test:i18n
```

**Important per al formulari:** configura `RECAPTCHA_ALLOWED_HOSTNAMES` amb els noms de domini reals de producció i de la previsualització autoritzats per Google. No utilitzis el comodí ni desactivis la verificació del hostname. Comprova SMTP amb un enviament de prova abans del desplegament.
