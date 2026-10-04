"use client";

import { useProgress } from "@/lib/progress";

export default function MarkCompleteButton({
  kind,
  id,
  doneLabel = "Đã hoàn thành ✓",
  todoLabel = "Đánh dấu đã học xong",
}: {
  kind: "chapter" | "lab";
  id: string;
  doneLabel?: string;
  todoLabel?: string;
}) {
  const { ready, isChapterDone, isLabDone, toggleChapter, toggleLab } =
    useProgress();
  const done = kind === "chapter" ? isChapterDone(id) : isLabDone(id);

  if (!ready) {
    return (
      <button
        disabled
        className="px-4 py-2 text-sm rounded-md border border-slate-200 text-slate-400 bg-white"
      >
        {todoLabel}
      </button>
    );
  }

  return (
    <button
      onClick={() => (kind === "chapter" ? toggleChapter(id) : toggleLab(id))}
      aria-pressed={done}
      className={
        done
          ? "px-4 py-2 text-sm rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700"
          : "px-4 py-2 text-sm rounded-md bg-accent text-white font-medium hover:opacity-90"
      }
      title={done ? "Bấm để bỏ đánh dấu" : "Lưu tiến độ vào thiết bị này"}
    >
      {done ? doneLabel : todoLabel}
    </button>
  );
}
