"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { copy, routeFor, type Locale } from "@/lib/i18n";

type RecaptchaApi={
  render:(element:HTMLElement,options:{sitekey:string})=>number;
  getResponse:(widgetId?:number)=>string;
  reset:(widgetId?:number)=>void;
};
declare global { interface Window {grecaptcha?:RecaptchaApi;} }
type FormValues={nom:string;email:string;telefon:string;codiPostal:string;missatge:string;empresa:string};
const empty:FormValues={nom:"",email:"",telefon:"",codiPostal:"",missatge:"",empresa:""};
const key="6Lc-sP0qAAAAAI_dlSqjTgWbFLcgmnjCBHFhPXy_";

export default function LocalizedContactForm({locale}:{locale:Locale}){
  const t=copy[locale].contact;
  const [form,setForm]=useState<FormValues>(empty);
  const [policy,setPolicy]=useState(false);
  const [captchaEnabled,setCaptchaEnabled]=useState(false);
  const [captchaStatus,setCaptchaStatus]=useState<"idle"|"loading"|"ready"|"error">("idle");
  const [sending,setSending]=useState(false);
  const [sent,setSent]=useState(false);
  const [error,setError]=useState("");
  const container=useRef<HTMLDivElement>(null);
  const widget=useRef<number|null>(null);

  useEffect(()=>{
    if(!captchaEnabled)return;
    let mounted=true;
    const render=()=>{
      if(!mounted||!window.grecaptcha||!container.current||widget.current!==null)return;
      try {widget.current=window.grecaptcha.render(container.current,{sitekey:key});setCaptchaStatus("ready");}
      catch {setCaptchaStatus("error");}
    };
    const failed=()=>{if(mounted){setCaptchaStatus("error");document.getElementById("cesc-recaptcha")?.remove();}};
    let script=document.getElementById("cesc-recaptcha") as HTMLScriptElement|null;
    if(!script&&!window.grecaptcha){
      script=document.createElement("script");
      script.id="cesc-recaptcha";
      script.src=`https://www.google.com/recaptcha/api.js?render=explicit&hl=${locale}`;
      script.async=true;script.defer=true;
      document.head.appendChild(script);
    }
    script?.addEventListener("load",render);
    script?.addEventListener("error",failed);
    render();
    return ()=>{mounted=false;script?.removeEventListener("load",render);script?.removeEventListener("error",failed);};
  },[captchaEnabled,locale]);

  function change(event:ChangeEvent<HTMLInputElement|HTMLTextAreaElement>){
    const field=event.currentTarget.name as keyof FormValues;
    setForm(old=>({...old,[field]:event.currentTarget.value}));
  }
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setError("");
    if(!policy){setError(t.policyRequired);return;}
    const token=window.grecaptcha?.getResponse(widget.current??undefined);
    if(!token){setError(t.captchaMissing);return;}
    const controller=new AbortController();
    const timeout=window.setTimeout(()=>controller.abort(),15000);
    setSending(true);
    try{
      const response=await fetch("/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},signal:controller.signal,cache:"no-store",body:JSON.stringify({...form,token,locale})});
      const result:{success?:boolean;error?:string}=await response.json();
      if(!response.ok||!result.success)throw new Error(t.error);
      setSent(true);
      setForm(empty);
    }catch(err){
      setError(err instanceof Error && err.name==="AbortError"?t.timeout:t.error);
      window.grecaptcha?.reset(widget.current??undefined);
    }finally{window.clearTimeout(timeout);setSending(false);}
  }
  const fields=[
    {name:"nom",label:t.name,type:"text",required:true,max:100,complete:"name"},
    {name:"email",label:t.email,type:"email",required:true,max:254,complete:"email"},
    {name:"telefon",label:t.phone,type:"tel",required:false,max:30,complete:"tel"},
    {name:"codiPostal",label:t.postal,type:"text",required:false,max:15,complete:"postal-code"},
  ] as const;
  return <div className="border border-warm-line bg-white p-6 shadow-editorial sm:p-10 xl:p-12">
    <p className="site-eyebrow mb-4 text-brown-sugar">{t.formEyebrow}</p>
    <h2 className="font-editorial mb-4 text-4xl text-deep-forest sm:text-5xl">{t.formTitle}</h2>
    <p className="mb-9 leading-7 text-slate-gray">{t.formIntro}</p>
    {sent?<div role="status" className="border border-green-200 bg-green-50 p-8 text-center">
      <h3 className="font-editorial mb-3 text-3xl text-deep-forest">{t.sentTitle}</h3>
      <p className="text-slate-gray">{t.sentText}</p>
      <button type="button" className="mt-6 rounded-full bg-deep-forest px-6 py-3 text-white" onClick={()=>{
        setSent(false);setPolicy(false);setCaptchaEnabled(false);setCaptchaStatus("idle");widget.current=null;
      }}>{t.sendAgain}</button>
    </div>:<form onSubmit={submit} className="space-y-7">
      <div className="grid gap-6 sm:grid-cols-2">
        {fields.map((field)=><div key={field.name}>
          <label htmlFor={field.name} className="mb-2 block text-sm font-bold text-deep-forest">{field.label}</label>
          <input id={field.name} name={field.name} type={field.type} required={field.required} maxLength={field.max} autoComplete={field.complete}
            value={form[field.name]} onChange={change} className="w-full border-0 border-b border-[#C5D0C3] bg-transparent px-1 py-3 text-deep-forest focus:border-forest-green focus:outline-none focus:ring-0"/>
        </div>)}
      </div>
      <div>
        <label htmlFor="missatge" className="mb-2 block text-sm font-bold text-deep-forest">{t.message}</label>
        <textarea id="missatge" name="missatge" rows={5} maxLength={5000} required value={form.missatge} onChange={change}
          className="w-full border-0 border-b border-[#C5D0C3] bg-transparent px-1 py-3 text-deep-forest focus:border-forest-green focus:outline-none focus:ring-0"/>
      </div>
      <div className="absolute -left-[10000px]" aria-hidden="true"><label htmlFor="empresa">Leave blank</label><input id="empresa" name="empresa" tabIndex={-1} autoComplete="off" value={form.empresa} onChange={change}/></div>
      <label className="flex items-start gap-3 text-sm leading-7 text-slate-gray">
        <input type="checkbox" required checked={policy} onChange={e=>setPolicy(e.target.checked)} className="mt-1.5 h-4 w-4 shrink-0 accent-forest-green"/>
        <span>{t.readPolicy} <Link href={routeFor(locale,"privacy")} className="font-bold text-forest-green underline">{copy[locale].privacy.title}</Link>.</span>
      </label>
      <div className="border border-warm-line bg-[#F7F7F2] p-5">
        {!captchaEnabled?<><p className="mb-4 text-sm leading-6 text-slate-gray">{t.captchaInfo} <Link href={routeFor(locale,"cookies")} className="underline">{copy[locale].cookies.title}</Link>.</p>
          <button type="button" onClick={()=>{setError("");setCaptchaStatus("loading");setCaptchaEnabled(true);}} className="rounded-full bg-white px-5 py-3 text-sm font-bold text-forest-green ring-1 ring-forest-green hover:bg-[#EAF0E8]">{t.captchaEnable}</button>
        </>:<>
          {captchaStatus==="loading"&&<p role="status" className="mb-3 text-sm">{t.captchaLoading}</p>}
          {captchaStatus==="error"&&<div role="alert"><p className="mb-3 text-sm text-red-700">{t.captchaError}</p>
            <button type="button" className="underline" onClick={()=>{setCaptchaEnabled(false);setCaptchaStatus("idle");}}>{t.captchaTry}</button></div>}
          <div ref={container} className="max-w-full overflow-x-auto"/>
        </>}
      </div>
      {error&&<p role="alert" className="bg-red-50 p-4 text-sm text-red-700">{error}</p>}
      <button type="submit" disabled={sending||captchaStatus!=="ready"} className="w-full rounded-full bg-deep-forest px-8 py-4 text-sm font-bold text-white transition hover:bg-forest-green disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
        {sending?t.sending:t.send}
      </button>
      <p className="text-sm leading-7 text-slate-gray">{t.alternative}</p>
    </form>}
  </div>;
}
