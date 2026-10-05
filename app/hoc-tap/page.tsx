import { getAllChapters } from "@/lib/chapters";
import { LABS } from "@/lib/labs";
import DashboardClient from "@/components/DashboardClient";

export const metadata = {
  title: "Học tập của tôi — Cẩm nang AI Y tế VN",
  description: "Theo dõi tiến độ học tập cá nhân: chương đã xong, lab đã làm, lộ trình theo vai trò.",
};

export default async function HocTap() {
  const chapters = await getAllChapters();
  const labs = LABS.map((l) => ({
    id: l.id,
    title: l.title,
    chapterSlug: l.chapter,
  }));

  return (
    <div>
      <div className="page-band">
        <h1 className="font-serif text-4xl font-bold mb-2 relative z-10">Học tập của tôi</h1>
        <p className="text-slate-600 max-w-3xl relative z-10">
          Tiến độ được lưu trên thiết bị này (localStorage) — không cần tài khoản.
        </p>
      </div>
      <DashboardClient
        chapters={chapters.map((c) => ({
          slug: c.slug,
          number: c.number,
          title: c.title,
          part: c.part,
        }))}
        labs={labs}
      />
    </div>
  );
}
