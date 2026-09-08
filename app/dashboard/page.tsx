import Link from "next/link";
import { getAllChapters } from "@/lib/chapters";
import { StatusPill } from "@/components/StatusPill";

export default async function Dashboard() {
  const chapters = await getAllChapters();
  const total = chapters.length;
  const final = chapters.filter((c) => c.status === "final").length;
  const review = chapters.filter((c) => c.status === "review").length;
  const draft = chapters.filter((c) => c.status === "draft").length;
  const pct = total > 0 ? Math.round((final / total) * 100) : 0;

  return (
    <div>
      <h1 className="font-serif text-4xl font-bold mb-2">Tiến độ biên soạn</h1>
      <p className="text-slate-600 mb-8">
        Trạng thái hiện tại của 18 chương. Cập nhật qua frontmatter{" "}
        <code className="text-sm bg-slate-100 px-1 rounded">status:</code>{" "}
        trong mỗi file Markdown.
      </p>

      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Hoàn thành</span>
          <span className="font-semibold">
            {final}/{total} ({pct}%)
          </span>
        </div>
        <div className="h-3 bg-slate-200 rounded overflow-hidden">
          <div
            className="h-full bg-accent"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-10">
        <Board title="Draft" count={draft} tone="slate">
          {chapters
            .filter((c) => c.status === "draft")
            .map((c) => (
              <ChapterCard key={c.slug} chapter={c} />
            ))}
        </Board>
        <Board title="Review" count={review} tone="amber">
          {chapters
            .filter((c) => c.status === "review")
            .map((c) => (
              <ChapterCard key={c.slug} chapter={c} />
            ))}
        </Board>
        <Board title="Final" count={final} tone="green">
          {chapters
            .filter((c) => c.status === "final")
            .map((c) => (
              <ChapterCard key={c.slug} chapter={c} />
            ))}
        </Board>
      </div>
    </div>
  );
}

function Board({
  title,
  count,
  tone,
  children,
}: {
  title: string;
  count: number;
  tone: "green" | "amber" | "slate";
  children: React.ReactNode;
}) {
  const tones = {
    green: "bg-emerald-50 border-emerald-200",
    amber: "bg-amber-50 border-amber-200",
    slate: "bg-slate-50 border-slate-200",
  };
  return (
    <div className={`border rounded-lg p-4 ${tones[tone]}`}>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-serif font-bold text-lg">{title}</h3>
        <span className="text-sm text-slate-500">{count}</span>
      </div>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function ChapterCard({
  chapter,
}: {
  chapter: { slug: string; number: number; title: string; owners: string[] };
}) {
  return (
    <Link
      href={`/chapters/${chapter.slug}`}
      className="block bg-white rounded p-3 border border-slate-200 hover:border-accent"
    >
      <div className="text-xs text-slate-400 font-mono">
        Ch.{chapter.number}
      </div>
      <div className="font-medium text-sm mt-0.5">{chapter.title}</div>
      {chapter.owners.length > 0 && (
        <div className="text-xs text-slate-500 mt-1">
          {chapter.owners.join(", ")}
        </div>
      )}
    </Link>
  );
}
