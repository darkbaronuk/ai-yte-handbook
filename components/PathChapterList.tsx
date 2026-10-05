"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";

export type PathChapter = {
  slug: string;
  number: number;
  title: string;
  minutes: number;
  labId: string | null;
};

/**
 * Danh sách chương trong một lộ trình, có trạng thái theo tiến độ.
 * Không khóa chương nào — chỉ gợi ý thứ tự học.
 */
export default function PathChapterList({
  chapters,
  accent,
}: {
  chapters: PathChapter[];
  accent: string;
}) {
  const { ready, isChapterDone, isLabDone } = useProgress();

  // Chương "đang học" = chương đầu tiên chưa xong
  let nextFound = false;

  return (
    <ol className="space-y-3">
      {chapters.map((c, i) => {
        const done = ready && isChapterDone(c.slug);
        const labDone = c.labId ? ready && isLabDone(c.labId) : false;
        const isNext = ready && !done && !nextFound;
        if (isNext) nextFound = true;

        return (
          <li
            key={c.slug}
            className={`bg-white border rounded-xl p-4 flex items-center gap-4 ${
              isNext ? "border-accent shadow-sm" : "border-slate-200"
            }`}
            style={isNext ? { borderLeft: `4px solid ${accent}` } : undefined}
          >
            <div
              className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center font-bold text-sm"
              style={
                done
                  ? { background: "#059669", color: "white" }
                  : { background: "#f1f5f9", color: "#475569" }
              }
              aria-label={done ? "Đã học xong" : `Bước ${i + 1}`}
            >
              {done ? "✓" : i + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Link
                  href={`/chapters/${c.slug}`}
                  className="font-medium hover:text-accent truncate"
                >
                  {c.title}
                </Link>
                {isNext && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-accent font-medium">
                    Học tiếp
                  </span>
                )}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Chương {c.number} · ~{c.minutes} phút đọc
                {c.labId && (
                  <>
                    {" · "}
                    <Link
                      href={`/lab/${c.labId}`}
                      className="text-accent hover:underline"
                    >
                      Lab thực hành{c.labId && labDone ? " ✓" : ""}
                    </Link>
                  </>
                )}
              </div>
            </div>
            <Link
              href={`/chapters/${c.slug}`}
              className="shrink-0 text-sm text-accent hover:underline"
            >
              {done ? "Ôn lại →" : "Học →"}
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
