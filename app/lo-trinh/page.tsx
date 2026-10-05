import Link from "next/link";
import { getChapter } from "@/lib/chapters";
import { ROLES, countWords, readingMinutes } from "@/lib/paths";

export const metadata = {
  title: "Lộ trình học tập — Cẩm nang AI Y tế VN",
  description:
    "6 lộ trình học AI y tế theo vai trò: bác sĩ, điều dưỡng, giám đốc bệnh viện, cán bộ chính sách, kỹ sư HealthTech, nhà nghiên cứu.",
};

export default async function LoTrinhIndex() {
  // Tính tổng thời gian đọc cho mỗi lộ trình (cache theo slug)
  const minutesCache = new Map<string, number>();
  async function minutesFor(slug: string): Promise<number> {
    const hit = minutesCache.get(slug);
    if (hit !== undefined) return hit;
    try {
      const ch = await getChapter(slug);
      const m = readingMinutes(countWords(ch.content));
      minutesCache.set(slug, m);
      return m;
    } catch {
      minutesCache.set(slug, 0);
      return 0;
    }
  }

  const cards = await Promise.all(
    ROLES.map(async (r) => {
      const minutes = await Promise.all(r.chapters.map(minutesFor));
      const total = minutes.reduce((a, b) => a + b, 0);
      return { role: r, totalMinutes: total };
    })
  );

  return (
    <div>
      <div className="page-band">
        <h1 className="font-serif text-4xl font-bold mb-2 relative z-10">Lộ trình học tập</h1>
        <p className="text-slate-600 max-w-3xl relative z-10">
          6 lộ trình theo vai trò — mỗi lộ trình sắp xếp lại 18 chương của cẩm
          nang theo thứ tự phù hợp công việc của bạn. Chọn một lộ trình để xem
          chi tiết và theo dõi tiến độ.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(({ role, totalMinutes }) => (
          <div
            key={role.id}
            className="card-lift bg-white border border-slate-200 rounded-2xl p-6 flex flex-col"
            style={{ borderTop: `4px solid ${role.accent}` }}
          >
            <div className="text-4xl mb-3">{role.icon}</div>
            <h2 className="font-serif text-xl font-bold mb-1">{role.name}</h2>
            <p className="text-sm text-slate-600 leading-relaxed flex-1">
              {role.tagline}
            </p>
            <div className="text-xs text-slate-500 mt-4 mb-4">
              {role.chapters.length} chương · ~{totalMinutes} phút đọc
            </div>
            <Link
              href={`/lo-trinh/${role.id}`}
              className="text-center px-4 py-2.5 rounded-lg text-sm font-semibold text-white hover:brightness-110 hover:-translate-y-px transition-all shadow-[0_8px_18px_-8px_rgba(37,99,235,0.6)]"
              style={{ background: role.accent }}
            >
              Xem lộ trình
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
