"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Modal from "react-modal";
import { ArrowLeft, ArrowRight, Expand, X } from "lucide-react";
import { copy, type Locale } from "@/lib/i18n";

const photos=[
 "/images/zona-jardi.webp","/images/manteniment-piscines.webp","/images/entrada-jardi.webp",
 "/images/manteniment-comunitat.webp","/images/piscina-detall.webp","/images/poda-comunitat.webp",
 "/images/gespa.webp","/images/escocell.webp","/images/jardi-entrada.webp",
 "/images/equip.webp","/images/retirada-arbre.webp","/images/manteniment.webp",
];
export default function LocalizedGallery({locale}:{locale:Locale}){
 const t=copy[locale].gallery;
 const [active,setActive]=useState<number|null>(null);
 useEffect(()=>{Modal.setAppElement("#contingut-principal");},[]);
 useEffect(()=>{
   if(active===null)return;
   const onKey=(e:KeyboardEvent)=>{
     if(e.key==="ArrowRight")setActive(i=>i===null?null:(i+1)%photos.length);
     if(e.key==="ArrowLeft")setActive(i=>i===null?null:(i-1+photos.length)%photos.length);
   };
   document.addEventListener("keydown",onKey);
   return ()=>document.removeEventListener("keydown",onKey);
 },[active]);
 const selected=active===null?null:t.images[active];
 return <>
   <section className="bg-warm-paper px-5 py-20 sm:px-10 sm:py-28 lg:px-16" aria-label={t.title}>
     <div className="mx-auto grid max-w-[1320px] gap-5 sm:grid-cols-2 lg:gap-7">
       {photos.map((src,index)=><button key={src} type="button" onClick={()=>setActive(index)} aria-label={`${t.open}: ${t.images[index].title}`}
         className="group relative block w-full overflow-hidden bg-[#C3CCC0] text-left">
         <div className={`relative overflow-hidden ${index%3===0?"h-[350px] sm:h-[510px]":"h-[350px] sm:h-[420px]"}`}>
           <Image src={src} alt={t.images[index].title} fill sizes="(max-width: 640px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105"/>
           <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"/>
           <span className="site-eyebrow absolute left-6 top-6 text-white/90">{t.images[index].category}</span>
           <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6 sm:p-9">
             <h2 className="font-editorial text-3xl text-white sm:text-4xl">{t.images[index].title}</h2>
             <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/70 text-white transition group-hover:bg-white group-hover:text-deep-forest"><Expand size={17} aria-hidden="true"/></span>
           </div>
         </div>
       </button>)}
     </div>
   </section>
   <Modal isOpen={active!==null} onRequestClose={()=>setActive(null)} ariaHideApp={true}
     contentLabel={selected?.title??t.open} shouldCloseOnOverlayClick
     className="relative mx-auto flex h-[100dvh] max-w-7xl flex-col items-center justify-center px-4 py-12 outline-none sm:px-20"
     overlayClassName="fixed inset-0 z-[100] overflow-y-auto bg-[#071A13]/95 backdrop-blur-lg">
     <button type="button" onClick={()=>setActive(null)} aria-label={t.close} className="absolute right-4 top-4 z-20 rounded-full border border-white/40 p-3 text-white hover:bg-white hover:text-deep-forest"><X size={24} aria-hidden="true"/></button>
     {active!==null&&selected&&<>
       <div className="relative h-[65dvh] w-full max-w-5xl"><Image src={photos[active]} alt={selected.title} fill sizes="90vw" className="object-contain"/></div>
       <div className="mt-5 flex w-full max-w-5xl items-center justify-between gap-3 text-white">
         <button type="button" onClick={()=>setActive(i=>i===null?null:(i-1+photos.length)%photos.length)} aria-label={t.previous} className="rounded-full border border-white/40 p-3 hover:bg-white/20"><ArrowLeft size={22} aria-hidden="true"/></button>
         <div className="text-center"><p className="font-editorial text-xl sm:text-3xl">{selected.title}</p><p className="mt-1 text-xs text-white/65">{active+1} / {photos.length}</p></div>
         <button type="button" onClick={()=>setActive(i=>i===null?null:(i+1)%photos.length)} aria-label={t.next} className="rounded-full border border-white/40 p-3 hover:bg-white/20"><ArrowRight size={22} aria-hidden="true"/></button>
       </div>
     </>}
   </Modal>
 </>;
}
