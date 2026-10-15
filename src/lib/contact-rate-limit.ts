import { createHmac } from "node:crypto";
import type { NextApiRequest } from "next";

type RateResult = { allowed: boolean; retryAfter: number; configured: boolean };
const WINDOW = 10 * 60;
const MAX = 5;
// Local development and last-resort fallback only. Serverless instances do not share state.
const fallback = new Map<string,{count:number;expires:number}>();

function sourceIp(req: NextApiRequest): string {
  // Only trust this header behind Vercel's infrastructure, not arbitrary X-Forwarded-For.
  if (process.env.VERCEL === "1") {
    const trusted = req.headers["x-vercel-forwarded-for"];
    if (typeof trusted === "string" && trusted.length < 256) return trusted.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "unknown";
}

function localLimit(key:string): RateResult {
  const now=Date.now();
  if(fallback.size>2000){
    for(const [id,record] of fallback){ if(record.expires<=now)fallback.delete(id); }
    if(fallback.size>2000)fallback.clear();
  }
  const current=fallback.get(key);
  const record=!current || current.expires<=now ? {count:0,expires:now+WINDOW*1000}:current;
  record.count++;
  fallback.set(key,record);
  return {allowed:record.count<=MAX,retryAfter:Math.max(1,Math.ceil((record.expires-now)/1000)),configured:false};
}

export async function contactRateLimit(req: NextApiRequest): Promise<RateResult> {
  const pepper=process.env.RATE_LIMIT_KEY_SECRET || process.env.RECAPTCHA_SECRET || "dev-only";
  const digest=createHmac("sha256",pepper).update(sourceIp(req)).digest("hex");
  const key=`cescjardiners:contact:${digest}`;
  const url=process.env.UPSTASH_REDIS_REST_URL;
  const token=process.env.UPSTASH_REDIS_REST_TOKEN;
  if(!url || !token) {
    if(process.env.RATE_LIMIT_REQUIRED === "true" || process.env.VERCEL_ENV === "production") throw new Error("rate-limit-not-configured");
    return localLimit(key);
  }

  // Atomic Redis script avoids the INCR/EXPIRE race, shared across serverless instances.
  const script="local count=redis.call('INCR',KEYS[1]); if count==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end; local ttl=redis.call('TTL',KEYS[1]); return {count,ttl}";
  const controller=new AbortController();
  const timer=setTimeout(()=>controller.abort(),2500);
  try{
    const response=await fetch(url.replace(/\/$/,""),{
      method:"POST",headers:{authorization:`Bearer ${token}`,"content-type":"application/json"},
      body:JSON.stringify(["EVAL",script,"1",key,String(WINDOW)]),
      signal:controller.signal,cache:"no-store",
    });
    if(!response.ok)throw new Error("rate-limit-upstream");
    const payload:unknown=await response.json();
    if(!payload || typeof payload!=="object" || !("result" in payload))throw new Error("rate-limit-response");
    const result=(payload as {result:unknown}).result;
    if(!Array.isArray(result)||result.length<2)throw new Error("rate-limit-response");
    const count=Number(result[0]),ttl=Number(result[1]);
    if(!Number.isFinite(count)||!Number.isFinite(ttl))throw new Error("rate-limit-response");
    return {allowed:count<=MAX,retryAfter:Math.max(1,ttl),configured:true};
  }finally{clearTimeout(timer);}
}
