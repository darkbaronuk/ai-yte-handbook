export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    final: "bg-emerald-100 text-emerald-800",
    review: "bg-amber-100 text-amber-800",
    draft: "bg-slate-100 text-slate-600",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded text-xs uppercase font-semibold ${
        map[status] ?? map.draft
      }`}
    >
      {status}
    </span>
  );
}
