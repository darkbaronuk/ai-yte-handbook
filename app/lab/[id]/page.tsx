import { notFound } from "next/navigation";
import { LABS, getLab } from "@/lib/labs";
import { mdChunkToHtml } from "@/lib/chapters";
import LabRunner from "@/components/LabRunner";
import MarkCompleteButton from "@/components/MarkCompleteButton";

export const dynamicParams = false;

export function generateStaticParams() {
  return LABS.map((l) => ({ id: l.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const lab = getLab(params.id);
  if (!lab) return { title: "Lab không tồn tại" };
  return {
    title: `${lab.title} — Cẩm nang AI Y tế VN`,
    description: lab.intro.slice(0, 160),
  };
}

export default async function LabPage({ params }: { params: { id: string } }) {
  const lab = getLab(params.id);
  if (!lab) notFound();

  const introHtml = await mdChunkToHtml(lab.intro);

  return (
    <article className="prose prose-slate max-w-none">
      <header className="mb-6 pb-4 border-b border-slate-200 not-prose">
        <div className="text-sm text-accent font-semibold mb-2">
          {lab.title.split("—")[0].trim()}
        </div>
        <h1 className="font-serif text-3xl font-bold mb-2">
          {lab.title.includes("—") ? lab.title.split("—").slice(1).join("—").trim() : lab.title}
        </h1>
        <div
          className="prose prose-slate max-w-none text-slate-700"
          dangerouslySetInnerHTML={{ __html: introHtml }}
        />
        <div className="mt-3 flex gap-4 text-sm text-slate-500 flex-wrap items-center">
          <span>⏱ ~{lab.suggestedTimeMin} phút</span>
          <span>✍ Tối thiểu {lab.minLength} ký tự</span>
          <span>🤖 Chấm bằng GPT-OSS 120B</span>
          <span className="flex-1" />
          <MarkCompleteButton
            kind="lab"
            id={lab.id}
            todoLabel="Đánh dấu đã làm xong"
          />
        </div>
      </header>
      <LabRunner lab={lab} />
      <div className="not-prose mt-10 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-wrap items-center gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="font-medium">Đã nộp bài và nhận phản hồi?</div>
          <div className="text-sm text-slate-500">
            Đánh dấu để ghi nhận vào tiến độ học tập của bạn.
          </div>
        </div>
        <MarkCompleteButton
          kind="lab"
          id={lab.id}
          todoLabel="Đánh dấu đã làm xong"
        />
      </div>
    </article>
  );
}
