import {readFileSync,writeFileSync} from "node:fs";

const lines=[];
for(const name of ["ca-mobile","en-desktop"]){
  const r=JSON.parse(readFileSync(`reports/lighthouse/${name}.json`,"utf8"));
  const scores=Object.fromEntries(Object.entries(r.categories).map(([k,v])=>[k,Math.round(v.score*100)]));
  lines.push(`${name}: ${JSON.stringify(scores)}`);
  const ids=["first-contentful-paint","largest-contentful-paint","speed-index","total-blocking-time","cumulative-layout-shift","server-response-time","total-byte-weight"];
  for(const id of ids){
    const a=r.audits[id];
    if(a)lines.push(`  ${id}: ${a.displayValue||a.numericValue||"N/A"}`);
  }
  const weaknesses=Object.values(r.audits)
    .filter(a=>a.score!==null && a.score<0.85 && a.scoreDisplayMode==="numeric" && a.title)
    .sort((a,b)=>(a.score??1)-(b.score??1))
    .slice(0,12);
  for(const a of weaknesses){
    lines.push(`  IMPROVE: ${a.title} [${a.id}]: ${a.displayValue||""} (score ${Math.round(a.score*100)})`);
  }
}
const output=lines.join("\n")+"\n";
console.log(output);
writeFileSync("reports/lighthouse/summary.txt",output);
