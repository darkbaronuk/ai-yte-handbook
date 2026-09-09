import { notFound } from "next/navigation";
import { LABS, getLab } from "@/lib/labs";
import LabRunner from "@/components/LabRunner";

export const dynamicParams = false;

export function generateStaticParams() {
  return LABS.map((l) => ({ id: l.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const lab = getLab(params.id);
  if (!lab) return { title: "Lab kh\u00f4ng t\u1ed3n t\u1ea1i" };
  return {
    title: `${lab.title} \u2014 C\u1ea9m nang AI Y t\u1ebf VN`,
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
          {lab.title.split("\u2014")[0].trim()}
        </div>
        <h1 className="font-serif text-3xl font-bold mb-2">
          {lab.title.includes("\u2014") ? lab.title.split("\u2014").slice(1).join("\u2014").trim() : lab.title}
        </h1>
        <p className="text-slate-600 leading-relaxed">{lab.intro}</p>
        <div className="mt-3 flex gap-4 text-sm text-slate-500">
          <span>\u23f1 ~{lab.suggestedTimeMin} ph\u00fat</span>
          <span>\u270d T\u1ed1i thi\u1ec3u {lab.minLength} k\u00fd t\u1ef1</span>
          <span>\ud83e\udd16 Ch\u1ea5m b\u1eb1ng Llama 3.3 70B</span>
        </div>
      </header>
      <LabRunner lab={lab} />
    </article>
  );
}
