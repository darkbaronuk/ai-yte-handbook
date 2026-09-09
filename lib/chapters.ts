import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";
import rehypeRaw from "rehype-raw";
import rehypeExternalLinks from "rehype-external-links";
import { getGlossaryMap } from "./glossary";
import { splitBlocks, parseCalloutHeader } from "./chapter-blocks";

export type RenderedBlock =
  | { kind: "html"; html: string }
  | { kind: "chart"; props: Record<string, unknown> }
  | { kind: "callout"; kind_: string; title?: string; html: string }
  | { kind: "metrics"; metrics: Array<{ value: string; label: string; hint?: string }> }
  | { kind: "timeline"; items: Array<{ year: string; event: string; kind?: string }> };

// Chuyển cú pháp {t:slug}text{/t} thành <span class="term" data-slug="slug">text</span>
// trước khi qua remark. Slug không hợp lệ vẫn được hiển thị nhưng đánh dấu để dev thấy.
function expandTermSyntax(md: string): string {
  const glossary = getGlossaryMap();
  return md.replace(/\{t:([a-z0-9\-]+)\}([\s\S]*?)\{\/t\}/g, (_, slug, text) => {
    const known = glossary.has(slug);
    const cls = known ? "term" : "term term-unknown";
    return `<span class="${cls}" data-slug="${slug}">${text}</span>`;
  });
}

export type ChapterStatus = "draft" | "review" | "final";

export type ChapterMeta = {
  slug: string;
  number: number;
  title: string;
  part: string;
  status: ChapterStatus;
  domains: string[];
  miller: string;
  owners: string[];
  updated: string;
  summary: string;
};

export type Chapter = ChapterMeta & {
  content: string;
  html: string;
  blocks: RenderedBlock[];
  rawPath: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "chapters");

export const REPO_URL = "https://github.com/darkbaronuk/ai-yte-handbook";
export const REPO_BRANCH = "main";

// Editor cổ điển của GitHub — chỉ textarea, không AI
export function editUrl(rel: string): string {
  return `${REPO_URL}/edit/${REPO_BRANCH}/${rel}`;
}

// VS Code trong trình duyệt — sidebar, search, preview, Copilot nếu có sub
export function vscodeDevUrl(rel: string): string {
  return `https://github.dev/darkbaronuk/ai-yte-handbook/blob/${REPO_BRANCH}/${rel}`;
}

// CMS gắn trên chính site — form đẹp, có AI chấp bút
export function cmsUrl(slug: string): string {
  return `/admin/#/collections/chapters/entries/${slug}`;
}

export function blobUrl(rel: string): string {
  return `${REPO_URL}/blob/${REPO_BRANCH}/${rel}`;
}

export function getChapterSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function mdChunkToHtml(md: string): Promise<string> {
  return markdownToHtml(md);
}

async function markdownToHtml(md: string): Promise<string> {
  const expanded = expandTermSyntax(md);
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] })
    .use(rehypeStringify)
    .process(expanded);
  return String(file);
}

async function buildBlocks(md: string): Promise<RenderedBlock[]> {
  const parts = splitBlocks(md);
  const out: RenderedBlock[] = [];
  for (const p of parts) {
    if (p.kind === "md") {
      const html = await markdownToHtml(p.text);
      out.push({ kind: "html", html });
    } else if (p.kind === "chart") {
      try {
        out.push({ kind: "chart", props: JSON.parse(p.text) });
      } catch {
        out.push({ kind: "html", html: `<pre>Chart JSON lỗi: ${p.text.slice(0, 60)}</pre>` });
      }
    } else if (p.kind === "metrics") {
      try {
        out.push({ kind: "metrics", metrics: JSON.parse(p.text) });
      } catch {
        out.push({ kind: "html", html: `<pre>Metrics JSON lỗi</pre>` });
      }
    } else if (p.kind === "timeline") {
      try {
        out.push({ kind: "timeline", items: JSON.parse(p.text) });
      } catch {
        out.push({ kind: "html", html: `<pre>Timeline JSON lỗi</pre>` });
      }
    } else if (p.kind === "callout") {
      const meta = parseCalloutHeader(p.header);
      const html = await markdownToHtml(p.text);
      out.push({ kind: "callout", kind_: meta.kind, title: meta.title, html });
    }
  }
  return out;
}

export async function getChapter(slug: string): Promise<Chapter> {
  const full = path.join(CONTENT_DIR, `${slug}.md`);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const html = await markdownToHtml(content);
  const blocks = await buildBlocks(content);
  return {
    slug,
    number: Number(data.number ?? 0),
    title: String(data.title ?? slug),
    part: String(data.part ?? ""),
    status: (data.status ?? "draft") as ChapterStatus,
    domains: (data.domains ?? []) as string[],
    miller: String(data.miller ?? ""),
    owners: (data.owners ?? []) as string[],
    updated: String(data.updated ?? ""),
    summary: String(data.summary ?? ""),
    content,
    html,
    blocks,
    rawPath: `content/chapters/${slug}.md`,
  };
}

export async function getAllChapters(): Promise<ChapterMeta[]> {
  const slugs = getChapterSlugs();
  const list: ChapterMeta[] = [];
  for (const slug of slugs) {
    const c = await getChapter(slug);
    list.push({
      slug: c.slug,
      number: c.number,
      title: c.title,
      part: c.part,
      status: c.status,
      domains: c.domains,
      miller: c.miller,
      owners: c.owners,
      updated: c.updated,
      summary: c.summary,
    });
  }
  return list.sort((a, b) => a.number - b.number);
}
