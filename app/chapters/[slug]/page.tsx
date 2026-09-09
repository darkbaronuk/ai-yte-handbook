import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getChapter,
  getChapterSlugs,
  editUrl,
  vscodeDevUrl,
  cmsUrl,
  blobUrl,
  REPO_URL,
} from "@/lib/chapters";
import { StatusPill } from "@/components/StatusPill";
import ChapterRenderer from "@/components/ChapterRenderer";

export async function generateStaticParams() {
  return getChapterSlugs().map((slug) => ({ slug }));
}

export default async function ChapterPage({
  params,
}: {
  params: { slug: string };
}) {
  let chapter;
  try {
    chapter = await getChapter(params.slug);
  } catch {
    notFound();
  }

  const issueUrl = `${REPO_URL}/issues/new?title=[Ch.${
    chapter.number
  }] Góp ý: ${encodeURIComponent(chapter.title)}&body=${encodeURIComponent(
    `Chương: ${chapter.title}\nFile: ${chapter.rawPath}\n\n---\n\n`
  )}`;

  return (
    <article>
      <header className="mb-8 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-3 text-sm">
          <span className="text-accent font-semibold">{chapter.part}</span>
          <span className="text-slate-400">·</span>
          <span className="text-slate-500">Chương {chapter.number}</span>
          <span className="text-slate-400">·</span>
          <StatusPill status={chapter.status} />
        </div>
        <h1 className="font-serif text-4xl font-bold mb-4">{chapter.title}</h1>
        {chapter.summary && (
          <p className="text-lg text-slate-600 leading-relaxed">
            {chapter.summary}
          </p>
        )}
        <dl className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          {chapter.domains.length > 0 && (
            <MetaItem
              label="Domain (WHO 2026)"
              value={chapter.domains.join(", ")}
            />
          )}
          {chapter.miller && (
            <MetaItem label="Tầng Miller" value={chapter.miller} />
          )}
          {chapter.owners.length > 0 && (
            <MetaItem label="Phụ trách" value={chapter.owners.join(", ")} />
          )}
          {chapter.updated && (
            <MetaItem label="Cập nhật" value={chapter.updated} />
          )}
        </dl>
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-2">
            Chọn cách chỉnh sửa
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={cmsUrl(chapter.slug)}
              className="px-4 py-2 bg-accent text-white text-sm rounded-md hover:opacity-90"
              title="Editor gắn trên site, có AI chấp bút"
            >
              ✨ Soạn trong CMS (có AI)
            </a>
            <a
              href={vscodeDevUrl(chapter.rawPath)}
              target="_blank"
              rel="noopener"
              className="px-4 py-2 bg-slate-900 text-white text-sm rounded-md hover:opacity-90"
              title="VS Code trong trình duyệt, dùng Copilot nếu có"
            >
              💻 Mở VS Code trong trình duyệt
            </a>
            <a
              href={editUrl(chapter.rawPath)}
              target="_blank"
              rel="noopener"
              className="px-4 py-2 border border-slate-300 text-sm rounded-md hover:border-accent"
              title="Editor cơ bản của GitHub"
            >
              Sửa nhanh trên GitHub
            </a>
            <a
              href={blobUrl(chapter.rawPath)}
              target="_blank"
              rel="noopener"
              className="px-4 py-2 border border-slate-300 text-sm rounded-md hover:border-accent"
            >
              Xem lịch sử
            </a>
            <a
              href={issueUrl}
              target="_blank"
              rel="noopener"
              className="px-4 py-2 border border-slate-300 text-sm rounded-md hover:border-accent"
            >
              💬 Mở góp ý
            </a>
          </div>
        </div>
      </header>

      <ChapterRenderer blocks={chapter.blocks} />

      <nav className="mt-16 pt-6 border-t border-slate-200 flex justify-between text-sm">
        <Link href="/muc-luc" className="text-accent hover:underline">
          ← Mục lục
        </Link>
        <Link href="/dashboard" className="text-accent hover:underline">
          Xem tiến độ →
        </Link>
      </nav>
    </article>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-slate-400">
        {label}
      </dt>
      <dd className="mt-1 font-medium">{value}</dd>
    </div>
  );
}
