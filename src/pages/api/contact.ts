import type {NextApiRequest, NextApiResponse} from "next";
import nodemailer from "nodemailer";
import {parseContactPayload,escapeHtml,isAllowedOrigin} from "@/lib/contact-validation";
import {contactRateLimit} from "@/lib/contact-rate-limit";

type RecaptchaResponse = {success?:boolean;hostname?:string;challenge_ts?:string;"error-codes"?:string[]};
const hostnames=new Set((process.env.RECAPTCHA_ALLOWED_HOSTNAMES || "cescjardiners.cat,www.cescjardiners.cat,localhost")
  .split(",").map(v=>v.trim().toLowerCase()).filter(Boolean));

export const config={api:{bodyParser:{sizeLimit:"16kb"}}};

async function verifyRecaptcha(token:string):Promise<boolean>{
  const secret=process.env.RECAPTCHA_SECRET;
  if(!secret)return false;
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),7000);
  try{
    const response=await fetch("https://www.google.com/recaptcha/api/siteverify",{
      method:"POST",
      headers:{"Content-Type":"application/x-www-form-urlencoded"},
      body:new URLSearchParams({secret,response:token}),
      signal:controller.signal,cache:"no-store",
    });
    if(!response.ok)return false;
    const result=(await response.json()) as RecaptchaResponse;
    if(!result.success || !result.hostname || !hostnames.has(result.hostname.toLowerCase()))return false;
    // Google reCAPTCHA v2 tokens expire after two minutes.
    const issuedAt=Date.parse(result.challenge_ts||"");
    if(!Number.isFinite(issuedAt) || Date.now()-issuedAt>120000 || issuedAt-Date.now()>30000)return false;
    return true;
  }finally{clearTimeout(timer);}
}

export default async function handler(req:NextApiRequest,res:NextApiResponse){
  res.setHeader("Cache-Control","private, no-store, max-age=0");
  res.setHeader("X-Content-Type-Options","nosniff");
  if(req.method!=="POST"){
    res.setHeader("Allow","POST");
    return res.status(405).json({error:"Method not allowed"});
  }
  if(!isAllowedOrigin(req.headers.origin,req.headers.host)){
    return res.status(403).json({error:"Origin not allowed"});
  }
  if(!["application/json","application/json; charset=utf-8"].includes(String(req.headers["content-type"]||"").toLowerCase())){
    return res.status(415).json({error:"Unsupported media type"});
  }
  if(!process.env.RECAPTCHA_SECRET || !process.env.SMTP_EMAIL || !process.env.SMTP_PASS){
    console.error("Contact form configuration is incomplete");
    return res.status(503).json({error:"Contact temporarily unavailable"});
  }
  let allowed;
  try{
    allowed=await contactRateLimit(req);
  }catch{
    console.error("Contact form rate limiter unavailable");
    return res.status(503).json({error:"Contact temporarily unavailable"});
  }
  res.setHeader("X-RateLimit-Limit","5");
  if(!allowed.allowed){
    res.setHeader("Retry-After",String(allowed.retryAfter));
    return res.status(429).json({error:"Too many requests"});
  }
  // No mail is sent for honeypot submissions; do not reveal it to the sender.
  if(typeof req.body?.empresa==="string" && req.body.empresa.trim()){
    return res.status(200).json({success:true});
  }
  const parsed=parseContactPayload(req.body);
  if(!parsed.ok)return res.status(400).json({error:"Invalid contact data"});
  const {nom,email,telefon,codiPostal,missatge,token,locale}=parsed.data;
  try{
    if(!await verifyRecaptcha(token))return res.status(400).json({error:"Invalid reCAPTCHA"});
  }catch{
    console.error("Contact form reCAPTCHA service unavailable");
    return res.status(503).json({error:"Verification temporarily unavailable"});
  }
  const to=process.env.SMTP_EMAIL!;
  const safeRows=[
    ["Name",nom],["Email",email],["Phone",telefon||"—"],["Postcode",codiPostal||"—"],
  ];
  const markup=safeRows.map(([label,value])=>`<tr><th align="left" style="padding:8px">${label}</th><td style="padding:8px">${escapeHtml(value)}</td></tr>`).join("");
  const text=`New website enquiry (language: ${locale})\n\n${safeRows.map(([label,value])=>`${label}: ${value}`).join("\n")}\n\nMessage:\n${missatge}`;
  const transporter=nodemailer.createTransport({
    service:"gmail",
    auth:{user:to,pass:process.env.SMTP_PASS!},
    connectionTimeout:7000,greetingTimeout:7000,socketTimeout:12000,
  });
  try{
    await transporter.sendMail({
      from:{name:"Cesc Jardiners",address:to},
      to,
      replyTo:{name:nom,address:email},
      subject:`Cesc Jardiners · ${nom.replace(/[\r\n]+/g," ").slice(0,90)}`,
      text,
      html:`<div style="font-family:Arial,sans-serif;max-width:650px"><h2>New website enquiry</h2><p>Language: ${locale}</p><table>${markup}</table><h3>Message</h3><p style="white-space:pre-wrap">${escapeHtml(missatge)}</p></div>`,
      disableFileAccess:true,disableUrlAccess:true,
    });
    return res.status(200).json({success:true});
  }catch{
    console.error("Contact form email delivery failed");
    return res.status(503).json({error:"Contact temporarily unavailable"});
  }finally{transporter.close();}
}
