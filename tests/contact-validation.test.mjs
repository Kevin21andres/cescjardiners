import test from "node:test";
import assert from "node:assert/strict";
import {readFileSync} from "node:fs";
import typescript from "typescript";

// Compile the project's TypeScript validator without adding runtime dependencies.
const source=readFileSync(new URL("../src/lib/contact-validation.ts",import.meta.url),"utf8");
const compiled=typescript.transpileModule(source,{
  compilerOptions:{module:typescript.ModuleKind.ESNext,target:typescript.ScriptTarget.ES2022}
}).outputText;
const {parseContactPayload,escapeHtml,isAllowedOrigin}=await import("data:text/javascript;base64,"+Buffer.from(compiled).toString("base64"));
const base={nom:"Client Example",email:"client@example.com",telefon:"638123456",codiPostal:"43201",missatge:"I would like a quote for my garden.",token:"test-token",locale:"en",empresa:""};
test("accepts a complete valid request",()=>{const r=parseContactPayload(base);assert.equal(r.ok,true);assert.equal(r.data?.locale,"en");});
test("defaults unsupported locale to Catalan",()=>{const r=parseContactPayload({...base,locale:"invalid"});assert.equal(r.data?.locale,"ca");});
test("rejects empty payload or arrays",()=>{assert.equal(parseContactPayload(null).ok,false);assert.equal(parseContactPayload([]).ok,false);});
test("rejects oversized names rather than silently truncating",()=>assert.equal(parseContactPayload({...base,nom:"a".repeat(101)}).ok,false));
test("rejects oversized messages",()=>assert.equal(parseContactPayload({...base,missatge:"a".repeat(5001)}).ok,false));
test("rejects header injection in email",()=>assert.equal(parseContactPayload({...base,email:"x@example.com\r\nBcc:evil@attacker.tld"}).ok,false));
test("rejects header injection in name",()=>assert.equal(parseContactPayload({...base,nom:"Customer\nBcc:evil"}).ok,false));
test("rejects invalid telephone characters",()=>assert.equal(parseContactPayload({...base,telefon:"<script>"}).ok,false));
test("rejects short message",()=>assert.equal(parseContactPayload({...base,missatge:"hi"}).ok,false));
test("escapes email HTML",()=>assert.equal(escapeHtml('<img src="x" onerror=1>&'),"&lt;img src=&quot;x&quot; onerror=1&gt;&amp;"));
test("accepts same-origin request",()=>assert.equal(isAllowedOrigin("https://cescjardiners.cat","cescjardiners.cat"),true));
test("rejects cross-origin request",()=>assert.equal(isAllowedOrigin("https://malicious.example","cescjardiners.cat"),false));
test("rejects host prefix trick",()=>assert.equal(isAllowedOrigin("https://cescjardiners.cat.attacker.tld","cescjardiners.cat"),false));
test("rejects non-HTTP origin",()=>assert.equal(isAllowedOrigin("null","cescjardiners.cat"),false));
test("allows no-origin machine requests with independent CAPTCHA",()=>assert.equal(isAllowedOrigin(undefined,"cescjardiners.cat"),true));
