import {spawn} from "node:child_process";
import {setTimeout as wait} from "node:timers/promises";
import assert from "node:assert/strict";
import fs from "node:fs";

const port=3399;
const origin=`http://127.0.0.1:${port}`;
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","-p",String(port)],{
  env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"},
  stdio:["ignore","pipe","pipe"],
});
let output="";
server.stdout.on("data",(buf)=>{output+=buf.toString();});
server.stderr.on("data",(buf)=>{output+=buf.toString();});

async function check(){
  let ready=false;
  for(let i=0;i<55;i++){
    if(server.exitCode!==null)break;
    try{
      const r=await fetch(origin+"/ca",{signal:AbortSignal.timeout(2500)});
      if(r.status===200){ready=true;break;}
    }catch{}
    await wait(1000);
  }
  assert(ready,"Next server did not become ready: "+output.slice(-4000));

  const cases={
    ca:["","nosaltres","serveis","serveis/muntatge-jardins","projectes","contacte","politica-privacitat","politica-cookies","avis-legal","serveis/manteniment-jardins","serveis/manteniment-piscines","serveis/installacio-gespa","serveis/poda-arbres","serveis/reg-automatic"],
    es:["","nosotros","servicios","servicios/montaje-jardines","proyectos","contacto","politica-privacidad","politica-cookies","aviso-legal","servicios/mantenimiento-jardines","servicios/mantenimiento-piscinas","servicios/instalacion-cesped","servicios/poda-arboles","servicios/riego-automatico"],
    en:["","about","services","services/garden-design","projects","contact","privacy-policy","cookie-policy","legal-notice","services/garden-maintenance","services/pool-maintenance","services/lawn-installation","services/tree-pruning","services/automatic-irrigation"],
  };
  let count=0;
  for(const [language,routes] of Object.entries(cases)){
    for(const path of routes){
      const url=`/${language}${path?"/"+path:""}`;
      const r=await fetch(origin+url,{redirect:"manual",signal:AbortSignal.timeout(20000)});
      assert.equal(r.status,200,`${url} should return HTTP 200; got ${r.status}`);
      const html=await r.text();
      assert(html.includes(`<html lang="${language}"`),`${url} must set HTML lang to ${language}`);
      assert(html.includes("Cesc Jardiners"),`${url} missing brand`);
      if(!path){
        const footerHead={ca:"Jardins amb ànima.",es:"Jardines con alma.",en:"Gardens with soul."}[language];
        assert(html.includes(footerHead),`${url} should contain translated footer ${footerHead}`);
      }
      count++;
    }
  }
  const old=await fetch(origin+"/contacto",{redirect:"manual"});
  assert([307,308].includes(old.status),"Old /contacto URL must redirect to Catalan version");
  const homepage=await (await fetch(origin+"/en")).text();
  assert(homepage.includes('href="/es"')&&homepage.includes('href="/ca"'),"Language links are missing");
  const interior=await (await fetch(origin+"/ca/serveis/manteniment-jardins")).text();
  assert(interior.includes('href="/es/servicios/mantenimiento-jardines"'),"Language switcher should preserve service page");
  console.log(`PASS: ${count} translated routes, HTML language, language links and legacy redirect`);
}
try {await check();}
finally {server.kill("SIGTERM");await wait(400);}
