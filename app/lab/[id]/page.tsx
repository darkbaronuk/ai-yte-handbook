import { notFound } from "next/navigation";
import { LABS, getLab } from "@/lib/labs";
import LabRunner from "@/components/LabRunner";

export const dynamicParams = false;

export function generateStaticParams() {
  return LABS.map((l) => ({ id: l.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const lab = getLab(params.id);
  if (!lab) return { title: "Lab không tồn tại" };
  return {
    title: `${lab.title} — Cẩm nang AI Y tế VN`,
    description: lab.intro,
  };
}

export default function LabPage({ params }: { params: { id: string } }) {
  const lab = getLab(params.id);
  if (!lab) notFound();

  return (
    <article className="prose prose-slate max-w-none">
      <header className="mb-6 pb-4 border-b border-slate-200 not-prose">
        <div className="text-sm text-accent font-semibold mb-2">
          {lab.title.split("—")[0].trim()}
        </div>
        <h1 className="font-serif text-3xl font-bold mb-2">
          {lab.title.includes("—") ? lab.title.split("—").slice(1).join("—").trim() : lab.title}
        </h1>
        <p className="text-slate-600 leading-relaxed">{lab.intro}</p>
        <div className="mt-3 flex gap-4 text-sm text-slate-500 flex-wrap">
          <span>⏱ ~{lab.suggestedTimeMin} phút</span>
          <span>✍ Tối thiểu {lab.minLength} ký tự</span>
          <span>🤖 Chấm bằng GPT-OSS 120B</span>
        </div>
      </header>
      <LabRunner lab={lab} />
    </article>
  );
}
