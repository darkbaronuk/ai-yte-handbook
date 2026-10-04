"use client";

import { useProgress } from "@/lib/progress";
import ProgressRing from "./ProgressRing";

/** Vòng tiến độ của một lộ trình (dựa trên các slug chương trong lộ trình). */
export default function PathProgressHeader({
  slugs,
  accent,
}: {
  slugs: string[];
  accent: string;
}) {
  const { ready, completedChapters } = useProgress();
  const done = slugs.filter((s) => completedChapters.includes(s)).length;
  const pct = slugs.length ? (done / slugs.length) * 100 : 0;

  if (!ready) return null;

  return (
    <div className="flex items-center gap-3">
      <ProgressRing value={pct} size={64} stroke={8} color={accent} />
      <div className="text-sm text-slate-600">
        <div className="font-semibold text-slate-800">
          {done}/{slugs.length} chương
        </div>
        <div className="text-xs text-slate-400">tiến độ lộ trình</div>
      </div>
    </div>
  );
}
