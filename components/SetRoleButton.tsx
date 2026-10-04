"use client";

import { useProgress } from "@/lib/progress";

export default function SetRoleButton({ roleId }: { roleId: string }) {
  const { ready, role, setRole } = useProgress();

  if (!ready) {
    return (
      <button
        disabled
        className="px-5 py-2.5 text-sm rounded-md border border-slate-200 text-slate-400"
      >
        Đặt làm lộ trình của tôi
      </button>
    );
  }

  if (role === roleId) {
    return (
      <div className="flex items-center gap-2">
        <span className="px-5 py-2.5 text-sm rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
          ✓ Đây là lộ trình của bạn
        </span>
        <button
          onClick={() => setRole(null)}
          className="text-xs text-slate-400 hover:text-slate-600 underline"
        >
          Bỏ chọn
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setRole(roleId)}
      className="px-5 py-2.5 text-sm rounded-md bg-accent text-white font-medium hover:opacity-90"
    >
      Đặt làm lộ trình của tôi
    </button>
  );
}
