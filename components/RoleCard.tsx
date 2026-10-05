import Link from "next/link";
import type { Role } from "@/lib/paths";

export default function RoleCard({ role }: { role: Role }) {
  return (
    <Link
      href={`/lo-trinh/${role.id}`}
      className="card-lift group block bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden"
      style={{ borderTop: `4px solid ${role.accent}` }}
    >
      <div className="text-3xl mb-3">{role.icon}</div>
      <div className="font-serif text-lg font-semibold mb-1 group-hover:text-accent">
        {role.name}
      </div>
      <p className="text-sm text-slate-600 leading-relaxed">{role.tagline}</p>
      <div className="mt-3 text-xs text-slate-400">
        {role.chapters.length} chương · lộ trình gợi ý →
      </div>
    </Link>
  );
}
