import type {
  NextApiRequest,
  NextApiResponse,
} from "next";
import nodemailer from "nodemailer";

const RECAPTCHA_SECRET =
  process.env.RECAPTCHA_SECRET;
const SMTP_EMAIL = process.env.SMTP_EMAIL;
const SMTP_PASS = process.env.SMTP_PASS;

type RecaptchaVerificationResponse = {
  success?: boolean;
  challenge_ts?: string;
  hostname?: string;
  "error-codes"?: string[];
};

// Confiem únicament en dominis configurats, mai en el header Host de la petició.
const ALLOWED_RECAPTCHA_HOSTNAMES = new Set(
  (process.env.RECAPTCHA_ALLOWED_HOSTNAMES ??
    "cescjardiners.cat,www.cescjardiners.cat,cescjardiners.vercel.app,localhost")
    .split(",")
    .map((hostname) => hostname.trim().toLowerCase())
    .filter(Boolean),
);

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "32kb",
    },
  },
};

function getString(
  value: unknown,
  maxLength: number,
): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email,
  );
}

async function verifyRecaptcha(
  token: string,
): Promise<boolean> {
  if (!RECAPTCHA_SECRET) {
    return false;
  }

  const params = new URLSearchParams({
    secret: RECAPTCHA_SECRET,
    response: token,
  });

  const controller = new AbortController();

  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000);

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
        body: params.toString(),
        signal: controller.signal,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      console.error(
        "Google reCAPTCHA ha retornat un estat HTTP no vàlid:",
        response.status,
      );

      return false;
    }

    const data =
      (await response.json()) as RecaptchaVerificationResponse;

    if (!data.success) {
      console.warn(
        "Verificació reCAPTCHA rebutjada:",
        data["error-codes"] ?? [],
      );

      return false;
    }

    if (!data.hostname || !ALLOWED_RECAPTCHA_HOSTNAMES.has(data.hostname.toLowerCase())) {
      console.warn("Host reCAPTCHA no autoritzat.");
      return false;
    }

    return true;
  } finally {
    clearTimeout(timeout);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      error: "Mètode no permès.",
    });
  }

  if (
    !RECAPTCHA_SECRET ||
    !SMTP_EMAIL ||
    !SMTP_PASS
  ) {
    console.error(
      "Falten variables d'entorn necessàries per al formulari de contacte.",
    );

    return res.status(500).json({
      error:
        "La configuració del formulari no està disponible.",
    });
  }

  // Honeypot: no es mostra a persones usuàries; evita enviar correu per a bots simples.
  if (getString(req.body?.empresa, 200)) {
    return res.status(200).json({ success: true });
  }

  const nom = getString(
    req.body?.nom,
    100,
  );

  const email = getString(
    req.body?.email,
    254,
  );

  const telefon = getString(
    req.body?.telefon,
    30,
  );

  const codiPostal = getString(
    req.body?.codiPostal,
    15,
  );

  const missatge = getString(
    req.body?.missatge,
    5000,
  );

  const token = getString(
    req.body?.token,
    4096,
  );

  if (
    !nom ||
    !email ||
    !missatge
  ) {
    return res.status(400).json({
      error:
        "Nom, correu electrònic i missatge són obligatoris.",
    });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({
      error:
        "El correu electrònic no és vàlid.",
    });
  }

  if (!token) {
    return res.status(400).json({
      error:
        "Falta el token de reCAPTCHA.",
    });
  }

  try {
    const recaptchaValid =
      await verifyRecaptcha(token);

    if (!recaptchaValid) {
      return res.status(400).json({
        error:
          "Verificació reCAPTCHA fallida.",
      });
    }
  } catch (error) {
    console.error(
      "Error verificant reCAPTCHA:",
      error,
    );

    return res.status(500).json({
      error:
        "Error en verificar reCAPTCHA.",
    });
  }

  const safeNom =
    escapeHtml(nom);

  const safeEmail =
    escapeHtml(email);

  const safeTelefon =
    escapeHtml(
      telefon || "No indicat",
    );

  const safeCodiPostal =
    escapeHtml(
      codiPostal || "No indicat",
    );

  const safeMissatge =
    escapeHtml(missatge).replace(
      /\n/g,
      "<br />",
    );

  // Evita salts de línia al subject.
  const subjectName = nom
    .replace(/[\r\n]+/g, " ")
    .slice(0, 100);

  try {
    const transporter =
      nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: SMTP_EMAIL,
          pass: SMTP_PASS,
        },
      });

    await transporter.sendMail({
      from: `"Cesc Jardiners" <${SMTP_EMAIL}>`,
      to: SMTP_EMAIL,
      replyTo: email,
      subject: `Nou missatge de ${subjectName}`,

      text: [
        "Nou missatge de Cesc Jardiners",
        "",
        `Nom: ${nom}`,
        `Email: ${email}`,
        `Telèfon: ${
          telefon || "No indicat"
        }`,
        `Codi Postal: ${
          codiPostal || "No indicat"
        }`,
        "",
        "Missatge:",
        missatge,
      ].join("\n"),

      html: `
        <div
          style="
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f9f9f9;
          "
        >
          <h2 style="color: #22543d;">
            Nou missatge de Cesc Jardiners
          </h2>

          <table
            cellpadding="10"
            style="
              border-collapse: collapse;
              width: 100%;
              background: #ffffff;
              border: 1px solid #dddddd;
            "
          >
            <tr>
              <td>
                <strong>Nom:</strong>
              </td>

              <td>
                ${safeNom}
              </td>
            </tr>

            <tr>
              <td>
                <strong>Email:</strong>
              </td>

              <td>
                ${safeEmail}
              </td>
            </tr>

            <tr>
              <td>
                <strong>Telèfon:</strong>
              </td>

              <td>
                ${safeTelefon}
              </td>
            </tr>

            <tr>
              <td>
                <strong>Codi Postal:</strong>
              </td>

              <td>
                ${safeCodiPostal}
              </td>
            </tr>

            <tr>
              <td
                colspan="2"
                style="
                  border-top:
                    1px solid #dddddd;
                "
              >
                <strong>Missatge:</strong>

                <br />

                <p style="margin-top: 8px;">
                  ${safeMissatge}
                </p>
              </td>
            </tr>
          </table>

          <p
            style="
              font-size: 12px;
              color: #666666;
              margin-top: 20px;
            "
          >
            Aquest correu ha estat enviat
            automàticament des del formulari
            de contacte de Cesc Jardiners.
          </p>
        </div>
      `,

      disableFileAccess: true,
      disableUrlAccess: true,
    });

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Error enviant el correu:",
      error,
    );

    return res.status(500).json({
      error:
        "Error en enviar el correu.",
    });
  }
}