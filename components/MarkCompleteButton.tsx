"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useProgress } from "@/lib/progress";

/**
 * Nút đánh dấu hoàn thành:
 * - Đã đăng nhập → lưu vào DB qua /api/progress
 * - Chưa đăng nhập → lưu localStorage như trước (sẽ migrate khi đăng nhập)
 */
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
  const { status } = useSession();
  const loggedIn = status === "authenticated";
  const {
    ready,
    isChapterDone,
    isLabDone,
    toggleChapter,
    toggleLab,
  } = useProgress();

  const [dbDone, setDbDone] = useState<boolean | null>(null);
  const [busy, setBusy] = useState(false);

  // Tải trạng thái từ DB khi đã đăng nhập
  useEffect(() => {
    if (!loggedIn) {
      setDbDone(null);
      return;
    }
    let cancelled = false;
    fetch("/api/progress")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled || !d) return;
        const list: string[] = kind === "chapter" ? d.chapters : d.labs;
        setDbDone(list.includes(id));
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [loggedIn, kind, id]);

  async function toggleDb() {
    if (busy) return;
    setBusy(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, id }),
      });
      const data = await res.json();
      if (res.ok) setDbDone(!!data.done);
    } catch {}
    setBusy(false);
  }

  if (status === "loading" || !ready) {
    return (
      <button
        disabled
        className="px-4 py-2 text-sm rounded-md border border-slate-200 text-slate-400 bg-white"
      >
        {todoLabel}
      </button>
    );
  }

  if (loggedIn) {
    if (dbDone === null) {
      return (
        <button
          disabled
          className="px-4 py-2 text-sm rounded-md border border-slate-200 text-slate-400 bg-white"
        >
          …
        </button>
      );
    }
    return (
      <button
        onClick={toggleDb}
        disabled={busy}
        aria-pressed={dbDone}
        className={
          dbDone
            ? "px-4 py-2 text-sm rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-60"
            : "px-4 py-2 text-sm rounded-md bg-accent text-white font-medium hover:opacity-90 disabled:opacity-60"
        }
        title={dbDone ? "Bấm để bỏ đánh dấu" : "Lưu tiến độ vào tài khoản"}
      >
        {dbDone ? doneLabel : todoLabel}
      </button>
    );
  }

  // Chưa đăng nhập: localStorage
  const done = kind === "chapter" ? isChapterDone(id) : isLabDone(id);
  return (
    <button
      onClick={() => (kind === "chapter" ? toggleChapter(id) : toggleLab(id))}
      aria-pressed={done}
      className={
        done
          ? "px-4 py-2 text-sm rounded-md bg-emerald-600 text-white font-medium hover:bg-emerald-700"
          : "px-4 py-2 text-sm rounded-md bg-accent text-white font-medium hover:opacity-90"
      }
      title={done ? "Bấm để bỏ đánh dấu" : "Lưu tiến độ vào thiết bị này — đăng nhập để đồng bộ"}
    >
      {done ? doneLabel : todoLabel}
    </button>
  );
}
