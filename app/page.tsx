import Link from "next/link";
import { getAllChapters } from "@/lib/chapters";

export default async function Home() {
  const chapters = await getAllChapters();
  const total = chapters.length;
  const done = chapters.filter((c) => c.status === "final").length;
  const review = chapters.filter((c) => c.status === "review").length;
  const draft = chapters.filter((c) => c.status === "draft").length;

  return (
    <div>
      <section className="mb-12">
        <p className="text-sm uppercase tracking-widest text-accent mb-3">
          Cẩm nang cộng tác · 2026
        </p>
        <h1 className="font-serif text-5xl font-bold leading-tight mb-6">
          AI trong Y tế Việt Nam
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
          Cẩm nang thực hành có chấm điểm về AI y tế cho bối cảnh Việt Nam —
          từ hậu COVID đến kỷ nguyên AGI và Robotic AI. Chọn lộ trình theo vai
          trò của bạn, làm bài thực hành, nhận chứng chỉ Grade 1–5.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/muc-luc"
            className="px-5 py-3 bg-accent text-white rounded-md font-medium hover:opacity-90"
          >
            Xem mục lục
          </Link>
          <Link
            href="/dong-gop"
            className="px-5 py-3 border border-slate-300 rounded-md font-medium hover:border-accent"
          >
            Trở thành đồng tác giả
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
        <Stat label="Tổng chương" value={total.toString()} />
        <Stat label="Final" value={done.toString()} tone="green" />
        <Stat label="Đang review" value={review.toString()} tone="amber" />
        <Stat label="Draft" value={draft.toString()} tone="slate" />
      </section>

      <section>
        <h2 className="font-serif text-2xl font-bold mb-4">Bốn phần chính</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <PartCard
            title="Phần I — Tiến trình"
            desc="AI y tế đã đi tới đâu từ sau COVID"
            count={3}
          />
          <PartCard
            title="Phần II — Hiện trạng"
            desc="8 chương ứng dụng, mỗi chương một Lab"
            count={8}
          />
          <PartCard
            title="Phần III — Hạ tầng"
            desc="Dữ liệu, tính toán, an toàn tuân thủ"
            count={3}
          />
          <PartCard
            title="Phần IV — Tương lai"
            desc="AGI, Robotic AI, Digital Twin, lộ trình"
            count={4}
          />
        </div>
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  tone = "slate",
}: {
  label: string;
  value: string;
  tone?: "green" | "amber" | "slate";
}) {
  const tones = {
    green: "bg-emerald-50 text-emerald-800 border-emerald-200",
    amber: "bg-amber-50 text-amber-800 border-amber-200",
    slate: "bg-slate-50 text-slate-800 border-slate-200",
  };
  return (
    <div className={`border rounded-lg p-4 ${tones[tone]}`}>
      <div className="text-3xl font-bold font-serif">{value}</div>
      <div className="text-xs uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
}

function PartCard({
  title,
  desc,
  count,
}: {
  title: string;
  desc: string;
  count: number;
}) {
  return (
    <div className="border border-slate-200 rounded-lg p-5 bg-white">
      <div className="font-serif text-lg font-semibold">{title}</div>
      <div className="text-slate-600 text-sm mt-1">{desc}</div>
      <div className="text-xs text-slate-400 mt-3">{count} chương</div>
    </div>
  );
}
