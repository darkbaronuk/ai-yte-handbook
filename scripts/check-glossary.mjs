import fs from "node:fs";
import assert from "node:assert/strict";
import * as yaml from "js-yaml";
const entries = yaml.load(fs.readFileSync("content/glossary.yml","utf8")).items;
const slugs = entries.map(e=>e.slug);
assert.equal(new Set(slugs).size, slugs.length, "Duplicate glossary anchors");
let count = 0;
for (const file of fs.readdirSync("content/chapters").filter(f=>f.endsWith(".md"))) {
  const text = fs.readFileSync("content/chapters/"+file,"utf8");
  for (const [,slug] of text.matchAll(/\{t:([a-z0-9-]+)\}/g)) {
    assert(slugs.includes(slug), `${file}: unknown ${slug}`); count++;
  }
}
for (const e of entries) {
  assert(e.short?.trim() && e.long?.trim(), `Missing definition ${e.slug}`);
  for (const s of e.sources || []) assert.match(s.url, /^https:\/\//);
}
const chapter=fs.readFileSync("content/chapters/14-an-toan-tuan-thu.md","utf8");
const linked=new Set([...chapter.matchAll(/\{t:([a-z0-9-]+)\}/g)].map(m=>m[1]));
for (const slug of ["sop","phi","kanonymity","cdss","dicom","automation-bias","alert-fatigue","embedding","rag","authentication","authorization","promptinjection","unbounded-consumption"]) assert(linked.has(slug),`Missing key term ${slug}`);
assert.doesNotMatch(entries.find(e=>e.slug==="kanonymity").short,/bản ghi khác/);
console.log(`PASS: ${entries.length} unique glossary entries; ${count} valid links across chapters; ${linked.size} terms linked in chapter XIV.`);
