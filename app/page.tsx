import Link from "next/link";
import { getAllChapters } from "@/lib/chapters";
import { ROLES } from "@/lib/paths";
import { LABS } from "@/lib/labs";
import RoleCard from "@/components/RoleCard";

const PARTS = [
  { key: "Phần I", title: "Phần I — Tiến trình", desc: "AI y tế đã đi tới đâu từ sau COVID" },
  { key: "Phần II", title: "Phần II — Hiện trạng", desc: "8 chương ứng dụng, mỗi chương một Lab" },
  { key: "Phần III", title: "Phần III — Hạ tầng", desc: "Dữ liệu, tính toán, an toàn tuân thủ" },
  { key: "Phần IV", title: "Phần IV — Tương lai", desc: "AGI, Robotic AI, Digital Twin, lộ trình" },
];

const STEPS = [
  {
    icon: "🎯",
    title: "Chọn vai trò",
    desc: "Bác sĩ, điều dưỡng, giám đốc, cán bộ chính sách, kỹ sư hay nhà nghiên cứu — mỗi vai trò có lộ trình riêng.",
  },
  {
    icon: "📚",
    title: "Học theo lộ trình",
    desc: "Đọc từng chương theo thứ tự gợi ý, đánh dấu đã học xong để theo dõi tiến độ.",
  },
  {
    icon: "🧪",
    title: "Làm Lab thực hành",
    desc: "Mỗi chương có một Lab: tình huống mô phỏng, nộp bài và được AI chấm theo rubric.",
  },
  {
    icon: "🏅",
    title: "Nhận Grade 1–5",
    desc: "Tích lũy bài Lab và phản hồi để đạt Grade cao hơn trên ma trận năng lực.",
  },
];

export default async function Home() {
  const chapters = await getAllChapters();
  const countByPart = (key: string) =>
    chapters.filter((c) => c.part.startsWith(key)).length;

  return (
    <div>
      {/* Hero */}
      <section className="mb-14">
        <p className="text-sm uppercase tracking-widest text-accent mb-3">
          Hệ học tập hybrid · Cẩm nang + E-learning
        </p>
        <h1 className="font-serif text-5xl font-bold leading-tight mb-6">
          AI trong Y tế Việt Nam
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Vừa là <strong className="text-slate-800">cẩm nang tra cứu</strong> 18
          chương về AI y tế, vừa là <strong className="text-slate-800">lớp học
          trực tuyến</strong> với lộ trình theo vai trò, Lab thực hành có chấm
          điểm và theo dõi tiến độ cá nhân.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/lo-trinh"
            className="px-6 py-3 bg-accent text-white rounded-md font-medium hover:opacity-90"
          >
            🎓 Học theo lộ trình
          </Link>
          <Link
            href="/muc-luc"
            className="px-6 py-3 border border-slate-300 rounded-md font-medium hover:border-accent"
          >
            📖 Tra cứu cẩm nang
          </Link>
        </div>
      </section>

      {/* Số liệu */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        <Stat label="Chương" value="18" />
        <Stat label="Lab thực hành" value={LABS.length.toString()} />
        <Stat label="Lộ trình vai trò" value="6" />
        <Stat label="Phần" value="4" />
      </section>

      {/* Bạn là ai? */}
      <section className="mb-14">
        <h2 className="font-serif text-2xl font-bold mb-2">Bạn là ai?</h2>
        <p className="text-slate-600 mb-6">
          Chọn vai trò để xem lộ trình học gợi ý — thứ tự chương được sắp xếp
          theo nhu cầu công việc của bạn.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ROLES.map((r) => (
            <RoleCard key={r.id} role={r} />
          ))}
        </div>
      </section>

      {/* Học như thế nào */}
      <section className="mb-14">
        <h2 className="font-serif text-2xl font-bold mb-6">Học như thế nào</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className="bg-white border border-slate-200 rounded-xl p-5"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{s.icon}</span>
                <span className="text-xs font-bold text-accent">
                  Bước {i + 1}
                </span>
              </div>
              <div className="font-semibold mb-1">{s.title}</div>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bốn phần chính */}
      <section>
        <h2 className="font-serif text-2xl font-bold mb-4">Bốn phần chính</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {PARTS.map((p) => (
            <Link
              key={p.key}
              href="/muc-luc"
              className="block border border-slate-200 rounded-lg p-5 bg-white hover:shadow-sm hover:border-accent transition-all"
            >
              <div className="font-serif text-lg font-semibold">{p.title}</div>
              <div className="text-slate-600 text-sm mt-1">{p.desc}</div>
              <div className="text-xs text-slate-400 mt-3">
                {countByPart(p.key)} chương →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-slate-200 rounded-lg p-4 bg-white">
      <div className="text-3xl font-bold font-serif text-accent">{value}</div>
      <div className="text-xs uppercase tracking-wider mt-1 text-slate-500">
        {label}
      </div>
    </div>
  );
}
