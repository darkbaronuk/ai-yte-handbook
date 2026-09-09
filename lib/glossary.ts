import fs from "node:fs";
import path from "node:path";
import * as yaml from "js-yaml";

export type GlossaryEntry = {
  slug: string;
  vi: string;
  en: string;
  short: string;
  long: string;
};

const GLOSSARY_PATH = path.join(process.cwd(), "content", "glossary.yml");

let cache: GlossaryEntry[] | null = null;
let mapCache: Map<string, GlossaryEntry> | null = null;

export function getGlossary(): GlossaryEntry[] {
  if (cache) return cache;
  if (!fs.existsSync(GLOSSARY_PATH)) {
    cache = [];
    return cache;
  }
  const raw = fs.readFileSync(GLOSSARY_PATH, "utf8");
  const parsed = yaml.load(raw) as GlossaryEntry[] | { items?: GlossaryEntry[] };
  // Hỗ trợ 2 format: top-level array (lịch sử) hoặc { items: [...] } (CMS cần key wrapper)
  const arr: GlossaryEntry[] = Array.isArray(parsed)
    ? parsed
    : (parsed?.items ?? []);
  cache = arr.map((e) => ({
    ...e,
    long: (e.long || "").trim(),
    short: (e.short || "").trim(),
  }));
  return cache;
}

export function getGlossaryMap(): Map<string, GlossaryEntry> {
  if (mapCache) return mapCache;
  mapCache = new Map(getGlossary().map((e) => [e.slug, e]));
  return mapCache;
}

export function getGlossaryEntry(slug: string): GlossaryEntry | null {
  return getGlossaryMap().get(slug) || null;
}

// Serialize glossary as JSON to inject vào window cho client tooltip attach
export function getGlossaryJson(): string {
  const entries = getGlossary();
  const obj: Record<string, { vi: string; en: string; short: string; long: string }> = {};
  for (const e of entries) {
    obj[e.slug] = { vi: e.vi, en: e.en, short: e.short, long: e.long };
  }
  return JSON.stringify(obj);
}
