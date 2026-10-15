import {spawn} from "node:child_process";
import {setTimeout as sleep} from "node:timers/promises";
import {mkdirSync,writeFileSync} from "node:fs";
import {createRequire} from "node:module";
import assert from "node:assert/strict";
import {chromium} from "playwright";

const require=createRequire(import.meta.url);
const axeSource=require.resolve("axe-core/axe.min.js");
const origin="http://127.0.0.1:3400";
mkdirSync("reports/screenshots",{recursive:true});
const server=spawn(process.execPath,["node_modules/next/dist/bin/next","start","-p","3400"],{env:{...process.env,NEXT_TELEMETRY_DISABLED:"1"},stdio:"pipe"});
let serverLog="";
for(const stream of [server.stdout,server.stderr])stream.on("data",part=>serverLog+=part.toString());
let browser;
const results=[];
const issues=[];
function urlFor(locale,path){return `${origin}/${locale}${path?"/"+path:""}`;}
async function ready(){
  for(let i=0;i<60;i++){
    try{const r=await fetch(origin+"/ca");if(r.status===200)return;}catch{}
    await sleep(1000);
  }
  throw new Error("Production server unavailable: "+serverLog.slice(-2000));
}
try{
  await ready();
  browser=await chromium.launch({headless:true,args:["--no-sandbox"]});
  for(const locale of ["ca","es","en"]){
    for(const device of [{label:"mobile",width:390,height:844,isMobile:true},{label:"desktop",width:1440,height:900,isMobile:false}]){
      const context=await browser.newContext({viewport:{width:device.width,height:device.height},deviceScaleFactor:1,isMobile:device.isMobile,hasTouch:device.isMobile,reducedMotion:"reduce"});
      const page=await context.newPage();
      const paths=[
        {name:"home",url:urlFor(locale,"")},
        {name:"contact",url:urlFor(locale,locale==="ca"?"contacte":locale==="es"?"contacto":"contact")},
        {name:"gallery",url:urlFor(locale,locale==="ca"?"projectes":locale==="es"?"proyectos":"projects")},
      ];
      for(const item of paths){
        const response=await page.goto(item.url,{waitUntil:"domcontentloaded",timeout:30000});
        assert.equal(response?.status(),200,item.url+" HTTP status");
        await page.locator("footer").scrollIntoViewIfNeeded();
        await page.waitForTimeout(180);
        const metrics=await page.evaluate(()=>({
          viewport:window.innerWidth,document:document.documentElement.scrollWidth,
          title:document.title,lang:document.documentElement.lang,
          broken:[...document.images].filter(i=>i.complete&&!i.naturalWidth).map(i=>i.currentSrc),
        }));
        assert(metrics.document<=metrics.viewport+2,`${locale} ${device.label} ${item.name} horizontal overflow: ${metrics.document} > ${metrics.viewport}`);
        assert.equal(metrics.lang,locale,"Wrong HTML language");
        assert.equal(metrics.broken.length,0,"Broken images: "+metrics.broken.join(","));
        assert(await page.locator("footer").isVisible(),"Footer missing");
        await page.addScriptTag({path:axeSource});
        const axe=await page.evaluate(async()=>{
          // @ts-ignore injected by axe-core
          const report=await window.axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21a","wcag21aa"]}});
          return report.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.slice(0,3).map(n=>({target:n.target,failure:n.failureSummary}))}));
        });
        if(axe.length)issues.push({locale,device:device.label,page:item.name,violations:axe});
        if(axe.some(v=>v.impact==="critical"))throw new Error(`Critical accessibility violation on ${item.url}: ${JSON.stringify(axe)}`);
        if(item.name==="home"||item.name==="contact"){
          await page.screenshot({path:`reports/screenshots/${locale}-${device.label}-${item.name}.png`,fullPage:true,animations:"disabled"});
        }
        results.push({locale,device:device.label,page:item.name,metrics,axeViolations:axe.length});
      }
      if(device.label==="mobile"){
        const button=page.getByRole("button",{name:/Obrir menú|Abrir menú|Open menu/});
        await button.click();
        assert(await page.locator("#localized-mobile-nav").isVisible(),"Mobile menu did not open");
        await page.keyboard.press("Escape");
        assert(!(await page.locator("#localized-mobile-nav").isVisible()),"Escape did not close mobile menu");
      }
      await context.close();
    }
  }
  const ctx=await browser.newContext({viewport:{width:1280,height:800},reducedMotion:"reduce"});
  const page=await ctx.newPage();
  await page.goto(origin+"/ca/serveis/manteniment-jardins");
  await page.getByRole("navigation",{name:"Idioma"}).first().getByRole("link",{name:"English"}).click();
  assert(page.url().endsWith("/en/services/garden-maintenance"),"Language switch did not preserve service");
  await page.goto(origin+"/en/projects");
  await page.getByRole("button",{name:/Enlarge photograph/}).first().click();
  assert(await page.getByRole("dialog").isVisible(),"Gallery modal not opened");
  await page.keyboard.press("Escape");
  assert(!(await page.getByRole("dialog").isVisible()),"Gallery modal did not close on Escape");

  await page.goto(origin+"/en/contact");
  assert.equal(await page.locator('script[src*="recaptcha"]').count(),0,"reCAPTCHA loads without opt-in");
  await page.getByRole("button",{name:"Enable reCAPTCHA verification"}).click();
  await page.waitForTimeout(200);
  assert((await page.locator('script[src*="recaptcha"]').count())>=1,"reCAPTCHA not injected after opt-in");
  const bad=await page.request.post(origin+"/api/contact",{
    data:{nom:"Evil",email:"evil@example.com",missatge:"This is malicious",token:"fake"},
    headers:{"origin":"https://malicious.example","content-type":"application/json"},
  });
  assert.equal(bad.status(),403,"Contact API must reject cross-site Origin");
  const wrongType=await page.request.post(origin+"/api/contact",{data:"bad-data",headers:{"content-type":"text/plain"}});
  assert.equal(wrongType.status(),415,"Contact API must enforce JSON content type");

  await ctx.close();
  writeFileSync("reports/browser-quality.json",JSON.stringify({timestamp:new Date().toISOString(),results,issues},null,2));
  console.log(`PASS: ${results.length} browser/viewport/page combinations, footer, layout, images, language switch, gallery, CAPTCHA consent and API security. Axe findings: ${issues.length}`);
  const serious=issues.flatMap(x=>x.violations.filter(v=>v.impact==="serious").map(v=>({...v,location:`${x.locale}/${x.device}/${x.page}`})));
  if(serious.length)console.warn("SERIOUS ACCESSIBILITY FINDINGS:",JSON.stringify(serious).slice(0,9000));
}catch(err){
  console.error(err);
  process.exitCode=1;
}finally{
  await browser?.close();
  server.kill("SIGTERM");
}
