# Security policy — Cesc Jardiners

## Supported deployment

The production branch is `main`; work is reviewed in a Pull Request and deployed to a protected Vercel Preview first. Keep Node.js and dependencies current.

## Contact API threat model

- POST-only, JSON only, origin checked against the request host. These are supplementary controls, **not authentication**.
- Strict lengths and formats; no silent truncation of user input.
- reCAPTCHA v2 token checked server-side against an explicit hostname list and maximum challenge age.
- Honeypot, server-side rate limit (5 requests per client in 10 minutes), bounded payload and timeouts.
- Shared rate limiting requires **Upstash Redis REST**; without it, local memory is an inadequate fallback for multi-instance serverless deployment. Set `RATE_LIMIT_REQUIRED=true` after providing `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
- An HMAC of the connection IP is used as a limiter key, not the raw IP. Use `RATE_LIMIT_KEY_SECRET`.
- Explicitly configure Vercel WAF / rate limiting and error alerting in the hosting console. Code does not replace a WAF.
- SMTP and anti-spam credentials must only be Vercel **server-side** environment variables. Do not log tokens, IPs, email payloads, or secrets.
- SMTP sends from the authorized account and sets Reply-To to the requester. No attachments or URL/file access are enabled.

## Browser hardening

Configured CSP, HSTS, nosniff, Referrer-Policy, frame protection, and Permissions-Policy. CSP needs `unsafe-inline` for the current statically prerendered Next.js inline scripts; measure the tradeoff before implementing a nonce-based dynamic layout. External reCAPTCHA resources are allowlisted.

## Reporting

For a suspected vulnerability, contact the site owner privately rather than opening a public issue with exploit details. Do not include personal data, secrets, or proof-of-concept spam in reports.

## Release checklist

- [ ] CI security gate, TypeScript, lint, browser quality, and build pass.
- [ ] Lighthouse and accessibility artifacts reviewed; regressions resolved.
- [ ] Real SMTP/reCAPTCHA test performed with authorized credentials.
- [ ] All 3 locales and responsive sizes reviewed in Vercel Preview.
- [ ] Upstash configured and `RATE_LIMIT_REQUIRED=true`; WAF enabled.
- [ ] Privacy and legal notices reviewed/approved by the owner.
- [ ] Deployment and rollback plan confirmed; secrets never committed.

## Build-time dependency advisories

The application dependencies used in production are gated by `npm audit --omit=dev --audit-level=high`.
The October 2026 full audit still flags the `eslint-config-next` development tooling chain
(`@next/eslint-plugin-next → fast-glob → micromatch → braces`) at high severity.
This tooling is installed for CI/development, not shipped as a production runtime dependency.
Do **not** treat this as a clean full-dependency audit or claim zero vulnerabilities.
Review upstream patched versions and upgrade the lint toolchain when a compatible fix is available;
do not downgrade the Next.js 16 lint integration solely to silence the report.
