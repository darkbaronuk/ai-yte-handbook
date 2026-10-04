"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { getRole } from "@/lib/paths";

export type ContinueChapter = {
  slug: string;
  number: number;
  title: string;
};

/**
 * Thẻ "Học tiếp": tìm chương đầu tiên chưa xong trong lộ trình của role đã chọn.
 * Chưa chọn role → gợi ý bắt đầu từ chương 04.
 */
export default function ContinueLearning({
  chapters,
  compact = false,
}: {
  chapters: ContinueChapter[];
  compact?: boolean;
}) {
  const { ready, role, completedChapters } = useProgress();
  const bySlug = new Map(chapters.map((c) => [c.slug, c]));

  if (!ready) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl p-6 animate-pulse">
        <div className="h-5 bg-slate-100 rounded w-2/3 mb-2" />
        <div className="h-4 bg-slate-100 rounded w-1/2" />
      </div>
    );
  }

  const r = role ? getRole(role) : undefined;
  const pathSlugs = r ? r.chapters : ["04-nen-tang-ai-da-nhiem"];
  const nextSlug = pathSlugs.find((s) => !completedChapters.includes(s));
  const doneCount = pathSlugs.filter((s) => completedChapters.includes(s)).length;

  // Xong hết lộ trình
  if (!nextSlug) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
        <div className="text-2xl mb-2">🎉</div>
        <h3 className="font-serif text-xl font-bold mb-1">
          Bạn đã hoàn thành lộ trình{r ? ` ${r.name}` : ""}!
        </h3>
        <p className="text-sm text-slate-600 mb-4">
          Hãy tra cứu thêm các chương khác trong cẩm nang hoặc thử một lộ trình mới.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/muc-luc"
            className="px-4 py-2 bg-accent text-white text-sm rounded-md font-medium hover:opacity-90"
          >
            📖 Tra cứu cẩm nang
          </Link>
          <Link
            href="/lo-trinh"
            className="px-4 py-2 border border-slate-300 text-sm rounded-md font-medium hover:border-accent"
          >
            Thử lộ trình khác
          </Link>
        </div>
      </div>
    );
  }

  const next = bySlug.get(nextSlug);
  const label = r ? `Lộ trình ${r.icon} ${r.name}` : "Bắt đầu từ chương nền tảng";

  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl ${compact ? "p-5" : "p-6"} shadow-sm`}
      style={r ? { borderLeft: `4px solid ${r.accent}` } : undefined}
    >
      <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
        {label} · {doneCount}/{pathSlugs.length} chương
      </div>
      <h3 className={`font-serif font-bold ${compact ? "text-lg" : "text-2xl"} mb-1`}>
        {doneCount === 0 ? "Học tiếp từ đây" : "Học tiếp"}
      </h3>
      {next && (
        <p className="text-slate-600 mb-4">
          Chương {next.number}: <span className="font-medium text-slate-800">{next.title}</span>
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        <Link
          href={next ? `/chapters/${next.slug}` : "/muc-luc"}
          className="px-5 py-2.5 bg-accent text-white text-sm rounded-md font-medium hover:opacity-90"
        >
          ▶ Học ngay
        </Link>
        {!r && (
          <Link
            href="/lo-trinh"
            className="px-4 py-2.5 border border-slate-300 text-sm rounded-md font-medium hover:border-accent"
          >
            🎓 Chọn lộ trình theo vai trò
          </Link>
        )}
      </div>
    </div>
  );
}
