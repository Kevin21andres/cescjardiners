import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import axios from "axios";

const RECAPTCHA_SECRET = "6Lc-sP0qAAAAALN9tD2qngsbwehJqYW5rb1L3I1r";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { nom, email, telefon, codiPostal, missatge, token } = req.body;

  if (!token) return res.status(400).json({ error: "Falta el token de reCAPTCHA." });

  // Verificació reCAPTCHA
  try {
    const response = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET}&response=${token}`
    );

    if (!response.data.success) {
      return res.status(400).json({ error: "Verificació reCAPTCHA fallida." });
    }
  } catch (err) {
    return res.status(500).json({ error: "Error en verificar reCAPTCHA." });
  }

  // Enviar correu amb format HTML
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL,
      subject: `Nou missatge de ${nom}`,
      text: `Missatge de ${nom}: ${missatge}`, // Versió "text pla"
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f9f9f9;">
          <h2 style="color: #22543d;">Nou missatge de Cesc Jardiners</h2>
          <table cellpadding="10" style="border-collapse: collapse; width: 100%; background: #fff; border: 1px solid #ddd;">
            <tr>
              <td><strong>Nom:</strong></td>
              <td>${nom}</td>
            </tr>
            <tr>
              <td><strong>Email:</strong></td>
              <td>${email}</td>
            </tr>
            <tr>
              <td><strong>Telèfon:</strong></td>
              <td>${telefon}</td>
            </tr>
            <tr>
              <td><strong>Codi Postal:</strong></td>
              <td>${codiPostal}</td>
            </tr>
            <tr>
              <td colspan="2" style="border-top: 1px solid #ddd;">
                <strong>Missatge:</strong><br />
                <p style="margin-top: 8px;">${missatge}</p>
              </td>
            </tr>
          </table>
          <p style="font-size: 12px; color: #666; margin-top: 20px;">Aquest correu ha estat enviat automàticament des del formulari de contacte.</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Error en enviar el correu." });
  }
}
