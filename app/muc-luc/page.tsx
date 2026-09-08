import Link from "next/link";
import { getAllChapters, type ChapterMeta } from "@/lib/chapters";
import { StatusPill } from "@/components/StatusPill";

export default async function TOC() {
  const chapters = await getAllChapters();
  const parts = groupByPart(chapters);

  return (
    <div>
      <h1 className="font-serif text-4xl font-bold mb-2">Mục lục</h1>
      <p className="text-slate-600 mb-10">
        18 chương, chia thành 4 phần. Nhấp vào chương để đọc; nhấp vào nút Sửa
        trên trang chương để mở editor GitHub và tạo bản đề xuất chỉnh sửa.
      </p>
      {Object.entries(parts).map(([part, list]) => (
        <section key={part} className="mb-10">
          <h2 className="font-serif text-xl font-semibold text-accent mb-4">
            {part}
          </h2>
          <ul className="divide-y divide-slate-200 border-y border-slate-200">
            {list.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/chapters/${c.slug}`}
                  className="flex items-center py-4 hover:bg-slate-50 -mx-2 px-2 rounded"
                >
                  <span className="w-14 text-sm text-slate-400 font-mono">
                    Ch.{c.number}
                  </span>
                  <span className="flex-1 font-medium">{c.title}</span>
                  <StatusPill status={c.status} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

function groupByPart(list: ChapterMeta[]): Record<string, ChapterMeta[]> {
  const groups: Record<string, ChapterMeta[]> = {};
  for (const c of list) {
    if (!groups[c.part]) groups[c.part] = [];
    groups[c.part].push(c);
  }
  return groups;
}

