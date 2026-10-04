import { notFound } from "next/navigation";
import Link from "next/link";
import { getChapter } from "@/lib/chapters";
import { LABS } from "@/lib/labs";
import { ROLES, getRole, countWords, readingMinutes } from "@/lib/paths";
import PathChapterList, { type PathChapter } from "@/components/PathChapterList";
import SetRoleButton from "@/components/SetRoleButton";
import PathProgressHeader from "@/components/PathProgressHeader";

export function generateStaticParams() {
  return ROLES.map((r) => ({ role: r.id }));
}

export async function generateMetadata({ params }: { params: { role: string } }) {
  const role = getRole(params.role);
  if (!role) return { title: "Lộ trình không tồn tại" };
  return {
    title: `Lộ trình ${role.name} — Cẩm nang AI Y tế VN`,
    description: role.tagline,
  };
}

export default async function LoTrinhDetail({
  params,
}: {
  params: { role: string };
}) {
  const role = getRole(params.role);
  if (!role) notFound();

  const labByChapter = new Map(LABS.map((l) => [l.chapter, l.id]));

  const chapters: PathChapter[] = [];
  for (const slug of role.chapters) {
    try {
      const ch = await getChapter(slug);
      chapters.push({
        slug,
        number: ch.number,
        title: ch.title,
        minutes: readingMinutes(countWords(ch.content)),
        labId: labByChapter.get(slug) ?? null,
      });
    } catch {
      // Slug trong lộ trình nhưng file chương chưa có — bỏ qua, không vỡ trang
    }
  }

  const totalMinutes = chapters.reduce((a, c) => a + c.minutes, 0);

  return (
    <div>
      <Link href="/lo-trinh" className="text-sm text-accent hover:underline">
        ← Tất cả lộ trình
      </Link>

      <header className="mt-4 mb-8">
        <div className="flex items-start gap-4 flex-wrap">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
            style={{ background: `${role.accent}15`, border: `2px solid ${role.accent}40` }}
          >
            {role.icon}
          </div>
          <div className="flex-1 min-w-[240px]">
            <h1 className="font-serif text-3xl font-bold mb-1">
              Lộ trình {role.name}
            </h1>
            <p className="text-slate-600 max-w-2xl">{role.tagline}</p>
            <div className="text-sm text-slate-500 mt-2">
              {chapters.length} chương · ~{totalMinutes} phút đọc ·{" "}
              {chapters.filter((c) => c.labId).length} lab thực hành
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <PathProgressHeader
              slugs={role.chapters}
              accent={role.accent}
            />
            <SetRoleButton roleId={role.id} />
          </div>
        </div>
      </header>

      <h2 className="font-serif text-xl font-bold mb-4">Thứ tự học gợi ý</h2>
      <p className="text-sm text-slate-500 mb-4">
        Các chương không bị khóa — bạn có thể học theo thứ tự nào cũng được.
        Thứ tự dưới đây được gợi ý theo nhu cầu công việc của {role.name.toLowerCase()}.
      </p>
      <PathChapterList chapters={chapters} accent={role.accent} />

      <div className="mt-10 bg-slate-50 border border-slate-200 rounded-xl p-6 text-center">
        <p className="text-slate-600 mb-4">
          Hoàn thành lộ trình trên trang Học tập của bạn.
        </p>
        <Link
          href="/hoc-tap"
          className="px-5 py-2.5 bg-accent text-white text-sm rounded-md font-medium hover:opacity-90"
        >
          Mở trang Học tập
        </Link>
      </div>
    </div>
  );
}
