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
  rawPath: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content", "chapters");

export const REPO_URL = "https://github.com/darkbaronuk/ai-yte-handbook";
export const REPO_BRANCH = "main";

export function editUrl(rel: string): string {
  return `${REPO_URL}/edit/${REPO_BRANCH}/${rel}`;
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

async function markdownToHtml(md: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "wrap" })
    .use(rehypeStringify)
    .process(md);
  return String(file);
}

export async function getChapter(slug: string): Promise<Chapter> {
  const full = path.join(CONTENT_DIR, `${slug}.md`);
  const raw = fs.readFileSync(full, "utf8");
  const { data, content } = matter(raw);
  const html = await markdownToHtml(content);
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
