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
  // Verificacions funcionals i SEO que no requereixen credencials de serveis externs.
  const codes=["ca","es","en"];
  const legalRoutes=[
    "/ca/avis-legal","/es/aviso-legal","/en/legal-notice",
  ];
  for (const path of legalRoutes) {
    const r=await fetch(origin+path);
    assert.equal(r.status,200,`${path} legal content missing`);
    const h=await r.text();
    assert(h.includes("Francisco Moreno Aguilar"),`${path} legal owner data missing`);
  }
  const languageRouteExamples={
    ca:"/ca/serveis/manteniment-jardins",
    es:"/es/servicios/mantenimiento-jardines",
    en:"/en/services/garden-maintenance",
  };
  let seoChecked=0;
  for(const [lang, url] of Object.entries(languageRouteExamples)){
    const response=await fetch(origin+url);
    const h=await response.text();
    const full=`https://cescjardiners.cat${url}`;
    assert(h.includes(`rel="canonical" href="${full}"`),`${url}: wrong canonical`);
    const lowerHtml=h.toLowerCase();
    assert(lowerHtml.includes(`hreflang="ca"`) && lowerHtml.includes(`hreflang="es"`) && lowerHtml.includes(`hreflang="en"`),`${url}: missing hreflang`);
    assert(h.includes('"@type":"Service"'),`${url}: missing Schema.org Service`);
    assert(h.includes('<h1'),`${url}: missing H1`);
    for(const target of codes){
      assert(h.includes(`href="${languageRouteExamples[target]}"`),`${url}: switcher lost equivalent page ${target}`);
    }
    seoChecked++;
  }
  const sitemapResponse=await fetch(origin+"/sitemap.xml");
  assert.equal(sitemapResponse.status,200,"sitemap.xml should exist");
  const sitemap=await sitemapResponse.text();
  for(const lang of codes){
    assert(sitemap.includes(`https://cescjardiners.cat/${lang}`),"Missing "+lang+" sitemap");
  }
  const robotsResponse=await fetch(origin+"/robots.txt");
  assert.equal(robotsResponse.status,200,"robots.txt should exist");
  const robots=await robotsResponse.text();
  assert(robots.includes("https://cescjardiners.cat/sitemap.xml"),"robots.txt missing sitemap reference");

  // Les referències estàtiques d'imatges han de correspondre a fitxers reals.
  let assetCount=0;
  const walk=(path)=>{
    for(const item of fs.readdirSync(path,{withFileTypes:true})){
      const full=path+"/"+item.name;
      if(item.isDirectory())walk(full);
      else if(/[.](tsx?|jsx?)$/.test(item.name)){
        const code=fs.readFileSync(full,"utf8");
        for(const match of code.matchAll(new RegExp(`["\x27](/images/[^"\x27]+)["\x27]`,"g"))){
          assert(fs.existsSync("public"+match[1]),`Asset missing: ${match[1]} in ${full}`);
          assetCount++;
        }
      }
    }
  };
  walk("src");
  assert(assetCount>=30,"Image asset check found too few references");

  const missing=await fetch(origin+"/en/services/does-not-exist",{redirect:"manual"});
  assert.equal(missing.status,404,"Unknown service must return HTTP 404");
  const missingBody=await missing.text();
  assert(missingBody.includes("This path doesn"),"Localized 404 should have friendly English content");
  const getContact=await fetch(origin+"/api/contact",{redirect:"manual"});
  assert.equal(getContact.status,405,"GET /api/contact must be rejected");

  console.log(`PASS: ${count} localized routes; ${seoChecked} Service schemas; SEO, sitemap, 404, contact method and ${assetCount} static image references verified`);
}
try {await check();}
finally {server.kill("SIGTERM");await wait(400);}
