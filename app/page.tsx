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
      {/* Hero — navy digital */}
      <section className="hero-digital rounded-3xl px-6 py-14 md:px-12 md:py-20 mb-12 text-white shadow-[0_30px_60px_-30px_rgba(10,23,64,0.7)]">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-sky-400/15 border border-sky-300/30 text-sky-200 mb-6">
            <span className="w-2 h-2 rounded-full bg-sky-300 animate-pulse" />
            Chuyển đổi số y tế · Hybrid Learning 2026
          </div>
          <h1 className="font-serif text-4xl md:text-6xl font-bold leading-[1.15] mb-6">
            AI trong <span className="text-gradient">Y tế</span>
            <br />
            Việt Nam
          </h1>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl leading-relaxed mb-4">
            Vừa là <strong className="text-white">cẩm nang tra cứu</strong> 18
            chương về AI y tế, vừa là{" "}
            <strong className="text-white">lớp học trực tuyến</strong> với lộ
            trình theo vai trò, Lab thực hành có chấm điểm và theo dõi tiến độ
            cá nhân.
          </p>
          {/* ECG pulse */}
          <svg className="w-full max-w-md h-10 mb-8 opacity-80" viewBox="0 0 340 40" fill="none" preserveAspectRatio="none">
            <path
              className="ecg-line"
              d="M0 20 H90 l8-14 10 28 8-20 6 6 H150 l8-14 10 28 8-20 6 6 H230 l8-14 10 28 8-20 6 6 H340"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-wrap gap-3 mb-10">
            <Link href="/lo-trinh" className="btn-gradient">
              🎓 Học theo lộ trình
            </Link>
            <Link href="/muc-luc" className="btn-glass">
              📖 Tra cứu cẩm nang
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <HeroStat label="Chương" value="18" />
            <HeroStat label="Lab thực hành" value={LABS.length.toString()} />
            <HeroStat label="Lộ trình vai trò" value="6" />
            <HeroStat label="Phần" value="4" />
          </div>
        </div>
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

      {/* Bạn là ai? */}
      <section className="mb-14">
        <div className="flex items-center gap-3 mb-2">
          <span className="step-badge !w-8 !h-8 text-sm">1</span>
          <h2 className="font-serif text-2xl font-bold">Bạn là ai?</h2>
        </div>
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
        <div className="flex items-center gap-3 mb-6">
          <span className="step-badge !w-8 !h-8 text-sm">2</span>
          <h2 className="font-serif text-2xl font-bold">Học như thế nào</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              className="card-lift bg-white border border-slate-200 rounded-2xl p-5 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-sky-400 opacity-0 hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 mb-3">
                <span className="step-badge">{i + 1}</span>
                <span className="text-2xl">{s.icon}</span>
              </div>
              <div className="font-semibold mb-1">{s.title}</div>
              <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bốn phần chính */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="step-badge !w-8 !h-8 text-sm">3</span>
          <h2 className="font-serif text-2xl font-bold">Bốn phần chính</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {PARTS.map((p) => (
            <Link
              key={p.key}
              href="/muc-luc"
              className="card-lift group block border border-slate-200 rounded-2xl p-5 bg-white"
            >
              <div className="font-serif text-lg font-semibold group-hover:text-accent transition-colors">{p.title}</div>
              <div className="text-slate-600 text-sm mt-1">{p.desc}</div>
              <div className="text-xs text-accent font-semibold mt-3">
                {countByPart(p.key)} chương →
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function HeroStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-glass">
      <div className="text-3xl font-bold font-serif text-white">{value}</div>
      <div className="text-[11px] uppercase tracking-wider mt-1 text-sky-200/80">
        {label}
      </div>
    </div>
  );
}
