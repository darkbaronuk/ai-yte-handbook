import { getGlossary } from "@/lib/glossary";

export const metadata = {
  title: "Danh mục thuật ngữ — Cẩm nang AI Y tế Việt Nam",
  description: "Từ điển thuật ngữ AI dùng trong cẩm nang, song ngữ Việt–Anh.",
};

export default function GlossaryPage() {
  const entries = getGlossary().sort((a, b) => a.vi.localeCompare(b.vi, "vi"));

  // Nhóm theo chữ cái đầu
  const groups: Record<string, typeof entries> = {};
  for (const e of entries) {
    const letter = e.vi[0]?.toUpperCase() || "?";
    (groups[letter] ||= []).push(e);
  }
  const letters = Object.keys(groups).sort();

  return (
    <article className="prose prose-slate max-w-none">
      <header className="mb-8 pb-6 border-b border-slate-200">
        <h1 className="font-serif text-4xl font-bold mb-3">Danh mục thuật ngữ</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Từ điển thuật ngữ AI dùng trong cẩm nang, song ngữ Việt–Anh. Bấm vào một thuật ngữ
          bất kỳ trong các chương để xem tooltip nhanh, hoặc mở bảng chi tiết.
        </p>
      </header>

      <nav className="mb-8 flex flex-wrap gap-2 not-prose">
        {letters.map((l) => (
          <a
            key={l}
            href={`#letter-${l}`}
            className="px-3 py-1 bg-slate-100 hover:bg-accent hover:text-white text-sm rounded transition"
          >
            {l}
          </a>
        ))}
      </nav>

      {letters.map((letter) => (
        <section key={letter} className="mb-10">
          <h2 id={`letter-${letter}`} className="font-serif text-2xl font-bold text-accent border-b border-slate-200 pb-2">
            {letter}
          </h2>
          <dl className="space-y-6 mt-4">
            {groups[letter].map((e) => (
              <div key={e.slug} id={e.slug} className="scroll-mt-24">
                <dt className="font-semibold text-lg">
                  {e.vi}
                  <span className="ml-2 text-slate-500 font-normal text-base">· {e.en}</span>
                </dt>
                <dd className="mt-1 text-slate-700 leading-relaxed whitespace-pre-line">{e.long}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </article>
  );
}
