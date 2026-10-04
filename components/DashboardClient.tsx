"use client";

import Link from "next/link";
import { useState } from "react";
import { useProgress } from "@/lib/progress";
import { getRole } from "@/lib/paths";
import ProgressRing from "./ProgressRing";
import ContinueLearning, { type ContinueChapter } from "./ContinueLearning";

export type DashChapter = ContinueChapter & { part: string };
export type DashLab = { id: string; title: string; chapterSlug: string };

const PART_ORDER = ["Phần I", "Phần II", "Phần III", "Phần IV"];

function partKey(part: string): string {
  const m = part.match(/^Phần (I{1,3}|IV)/);
  return m ? `Phần ${m[1]}` : part;
}

/**
 * Dashboard học tập cá nhân: tiến độ tổng, theo phần,
 * danh sách đã hoàn thành, đặt lại tiến độ.
 */
export default function DashboardClient({
  chapters,
  labs,
}: {
  chapters: DashChapter[];
  labs: DashLab[];
}) {
  const {
    ready,
    role,
    completedChapters,
    completedLabs,
    resetProgress,
  } = useProgress();
  const [confirming, setConfirming] = useState(false);

  const bySlug = new Map(chapters.map((c) => [c.slug, c]));
  const r = role ? getRole(role) : undefined;

  const totalCh = chapters.length;
  const doneCh = completedChapters.filter((s) => bySlug.has(s)).length;
  const totalPct = totalCh ? (doneCh / totalCh) * 100 : 0;

  const partStats = PART_ORDER.map((p) => {
    const inPart = chapters.filter((c) => partKey(c.part) === p);
    const done = inPart.filter((c) => completedChapters.includes(c.slug)).length;
    return { part: p, total: inPart.length, done };
  }).filter((s) => s.total > 0);

  const doneChapterList = completedChapters
    .map((s) => bySlug.get(s))
    .filter((c): c is DashChapter => !!c);
  const labById = new Map(labs.map((l) => [l.id, l]));
  const doneLabList = completedLabs
    .map((id) => labById.get(id))
    .filter((l): l is DashLab => !!l);

  return (
    <div className="space-y-8">
      {!ready ? (
        <div className="bg-white border border-slate-200 rounded-xl p-6 animate-pulse">
          <div className="h-6 bg-slate-100 rounded w-1/3 mb-2" />
          <div className="h-4 bg-slate-100 rounded w-2/3" />
        </div>
      ) : (
        <>
          {!r && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex flex-wrap items-center gap-3">
              <span className="text-2xl">🎓</span>
              <div className="flex-1 min-w-[200px]">
                <div className="font-medium">Bạn chưa chọn lộ trình học tập</div>
                <div className="text-sm text-slate-600">
                  Chọn vai trò để nhận lộ trình gợi ý theo thứ tự phù hợp.
                </div>
              </div>
              <Link
                href="/lo-trinh"
                className="px-4 py-2 bg-accent text-white text-sm rounded-md font-medium hover:opacity-90"
              >
                Chọn lộ trình
              </Link>
            </div>
          )}

          <ContinueLearning chapters={chapters} />

          <section className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-6 flex items-center gap-6">
              <ProgressRing value={totalPct} size={110} />
              <div>
                <h3 className="font-serif text-xl font-bold">Tiến độ tổng</h3>
                <p className="text-sm text-slate-600 mt-1">
                  {doneCh}/{totalCh} chương · {completedLabs.length}/{labs.length} lab
                  {r && (
                    <>
                      {" · "}Lộ trình {r.icon} {r.name}
                    </>
                  )}
                </p>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-serif text-xl font-bold mb-4">Theo từng phần</h3>
              <div className="space-y-3">
                {partStats.map((s) => {
                  const pct = s.total ? Math.round((s.done / s.total) * 100) : 0;
                  return (
                    <div key={s.part}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">{s.part}</span>
                        <span className="text-slate-500">
                          {s.done}/{s.total} · {pct}%
                        </span>
                      </div>
                      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-accent rounded-full transition-all"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="grid md:grid-cols-2 gap-4">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-serif text-xl font-bold mb-4">
                ✓ Chương đã hoàn thành ({doneChapterList.length})
              </h3>
              {doneChapterList.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Chưa có. Mở một chương và bấm "Đánh dấu đã học xong".
                </p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {doneChapterList.map((c) => (
                    <li key={c.slug}>
                      <Link href={`/chapters/${c.slug}`} className="hover:text-accent">
                        <span className="text-emerald-600 font-bold mr-2">✓</span>
                        Ch.{c.number} — {c.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <h3 className="font-serif text-xl font-bold mb-4">
                ✓ Lab đã hoàn thành ({doneLabList.length})
              </h3>
              {doneLabList.length === 0 ? (
                <p className="text-sm text-slate-500">
                  Chưa có. Làm xong một lab và bấm "Đánh dấu đã làm xong".
                </p>
              ) : (
                <ul className="space-y-2 text-sm">
                  {doneLabList.map((l) => (
                    <li key={l.id}>
                      <Link href={`/lab/${l.id}`} className="hover:text-accent">
                        <span className="text-emerald-600 font-bold mr-2">✓</span>
                        {l.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="border border-slate-200 rounded-xl p-5 bg-slate-50">
            {!confirming ? (
              <button
                onClick={() => setConfirming(true)}
                className="text-sm text-slate-500 hover:text-red-600 underline"
              >
                Đặt lại toàn bộ tiến độ
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium">
                  Xóa hết tiến độ đã lưu trên thiết bị này?
                </span>
                <button
                  onClick={() => {
                    resetProgress();
                    setConfirming(false);
                  }}
                  className="px-4 py-2 text-sm bg-red-600 text-white rounded-md font-medium hover:bg-red-700"
                >
                  Xác nhận xóa
                </button>
                <button
                  onClick={() => setConfirming(false)}
                  className="px-4 py-2 text-sm border border-slate-300 rounded-md hover:border-accent"
                >
                  Hủy
                </button>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
