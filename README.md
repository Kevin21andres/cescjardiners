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

## Seguretat en producció (obligatori abans del merge)

La configuració sense secrets no és suficient per garantir la seguretat del formulari.

1. Variables de Vercel: `RECAPTCHA_SECRET`, `SMTP_EMAIL`, `SMTP_PASS` i `RECAPTCHA_ALLOWED_HOSTNAMES`. Verifica que el domini de Preview autoritzat coincideix amb el que Google rep realment (el hostname de reCAPTCHA **no** inclou el protocol).
2. Límit de peticions **compartit entre instàncies**: afegeix `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` i un secret aleatori `RATE_LIMIT_KEY_SECRET`. Configura `RATE_LIMIT_REQUIRED=true` per **bloquejar l'enviament** quan Redis no estigui configurat. Sense Redis, el projecte utilitza un limitador local en memòria que NO és suficient en un despliegament serverless distribuït.
3. Configura també un WAF / rate limiting a Vercel per reduir càrrega i bots abans d'arribar al servidor. Revisa la quota i les alertes del proveïdor de correu.
4. Fes un enviament real al formulari des de `/ca/contacte`, `/es/contacto` i `/en/contact`: revisa lliurament, Spam, `reply-to` i errors de reCAPTCHA. Aquesta prova necessita accés als serveis externs i no es pot simular en CI.
5. Revisa i aprova amb el titular les dades comercials i legals, cookies / reCAPTCHA, tractament de dades, conservació i transferències internacionals abans de la publicació.

El formulari valida longituds i formats, origen, tipus de contingut, reCAPTCHA (host i temps de validesa), incorpora honeypot, límit de sol·licituds i evita injectar HTML o capçaleres de correu a partir de l'entrada. La política CSP permet scripts inline de Next.js per compatibilitat amb el renderitzat estàtic: **no és una CSP estricta basada en nonces**. Cal valorar una migració separada si es canvia la política de renderització.

## Auditoria de qualitat

```bash
npm run test:unit
npm run test:i18n
```

El workflow `Browser and Lighthouse quality` executa Playwright/Chromium amb diferents mides de pantalla, revisió WCAG amb axe-core, captures de pantalla, comprovacions del formulari sense enviar correus reals i auditories Lighthouse. Els resultats es guarden com a artefactes de GitHub Actions. Les puntuacions Lighthouse poden variar segons el maquinari i no substitueixen Core Web Vitals de visitants reals.
