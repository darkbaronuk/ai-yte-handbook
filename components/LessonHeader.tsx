"use client";

import Link from "next/link";
import MarkCompleteButton from "./MarkCompleteButton";

export type NavChapter = { slug: string; title: string; number: number } | null;

/**
 * Header bài học trên trang chương: chip phần, thời gian đọc,
 * nút đánh dấu hoàn thành, điều hướng chương trước/tiếp.
 */
export default function LessonHeader({
  slug,
  part,
  number,
  minutes,
  prev,
  next,
  hasQuiz = false,
}: {
  slug: string;
  part: string;
  number: number;
  minutes: number;
  prev: NavChapter;
  next: NavChapter;
  hasQuiz?: boolean;
}) {
  return (
    <div className="mb-8 not-prose">
      <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center gap-3">
        <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-accent font-medium">
          {part || "Cẩm nang"}
        </span>
        <span className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
          ⏱ ~{minutes} phút đọc
        </span>
        {hasQuiz && (
          <Link
            href={`/quiz/${slug}`}
            className="text-xs px-3 py-1.5 rounded-full font-semibold text-white bg-gradient-to-r from-blue-600 to-sky-500 hover:brightness-110 transition shadow-[0_6px_14px_-6px_rgba(37,99,235,0.7)]"
          >
            ✍️ Làm quiz
          </Link>
        )}
        <span className="flex-1" />
        <MarkCompleteButton kind="chapter" id={slug} />
      </div>
      <div className="mt-3 flex justify-between text-sm">
        <span>
          {prev ? (
            <Link href={`/chapters/${prev.slug}`} className="text-accent hover:underline">
              ← Ch.{prev.number}: {prev.title.length > 40 ? prev.title.slice(0, 40) + "…" : prev.title}
            </Link>
          ) : (
            <span className="text-slate-300">← Đầu cẩm nang</span>
          )}
        </span>
        <span className="text-right">
          {next ? (
            <Link href={`/chapters/${next.slug}`} className="text-accent hover:underline">
              Ch.{next.number}: {next.title.length > 40 ? next.title.slice(0, 40) + "…" : next.title} →
            </Link>
          ) : (
            <span className="text-slate-300">Cuối cẩm nang →</span>
          )}
        </span>
      </div>
    </div>
  );
}
