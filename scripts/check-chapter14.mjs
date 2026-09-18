import assert from "node:assert/strict";
import fs from "node:fs";

const chapter = fs.readFileSync("content/chapters/14-an-toan-tuan-thu.md", "utf8");
const lab = fs.readFileSync("lib/lab14.ts", "utf8");
const runner = fs.readFileSync("components/LabRunner.tsx", "utf8");
const between = (a, b) => chapter.split(a)[1].split(b)[0];
assert.match(chapter, /status: draft/);
assert.equal((between("### Mười nguy cơ cần nhận diện", "### Mười quy tắc").match(/^- /gm) || []).length, 10);
assert.equal((between("### Mười quy tắc", "## Phần II").match(/^\d+\. /gm) || []).length, 10);
assert.equal((chapter.match(/^\| \*\*LLM\d\d:/gm) || []).length, 10);
assert.equal((between("WHO nêu sáu nguyên tắc", "Tại Việt Nam, V-RHAIN").match(/^- /gm) || []).length, 6);
assert.equal((chapter.match(/### Tầng [1-4]:/g) || []).length, 4);
assert.match(chapter, /### Tầng nền:/);
assert.doesNotMatch(chapter, /Tầng 5|tầng thứ năm|bốn tình huống|bảy nguy cơ|bảy quy tắc/i);
assert.equal((chapter.match(/\*\*Tình huống [1-6]:/g) || []).length, 6);
assert.equal((lab.match(/^TÌNH HUỐNG [1-6]:/gm) || []).length, 6);
const normalize = text => text.replace(/^>\s?/gm, "").replace(/\s+/g, " ").trim();
for (let n = 1; n <= 6; n++) {
  const chapterCase = chapter.split(`**Tình huống ${n}:`)[1].split("**")[1].split("\n\n")[0];
  const labCase = lab.split(`TÌNH HUỐNG ${n}:`)[1].split("\n\n")[0].split("\n").slice(1).join("\n");
  // The next blockquote heading starts after a blank line.
  const body = chapterCase.split(/\n\n> [^\n]*\*\*Tình huống/)[0];
  assert.equal(normalize(body), normalize(labCase), `Case ${n} mismatch`);
}
for (const text of [chapter, lab]) {
  assert.doesNotMatch(text, /tieng-anh\.aspx|docid=213607/);
  assert.match(text, /400–700/);
  assert.match(text, /Điều 20/);
  assert.match(text, /Điều 22/);
  assert.match(text, /CẤM DÁN PHI/);
}
assert.match(chapter, /\| Quy định pháp luật \| SOP bắt buộc của bệnh viện \| Khuyến cáo thực hành tốt \|/);
assert.match(runner, /<strong>CẤM NHẬP PHI/);
assert.match(lab, /không phản ánh một người bệnh hoặc cơ sở y tế cụ thể/);
console.log("PASS: counts, layers, source URLs, safeguards and six matched cases.");
