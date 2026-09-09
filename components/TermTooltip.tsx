"use client";

import { useEffect, useState } from "react";

type Entry = { vi: string; en: string; short: string; long: string };
type Glossary = Record<string, Entry>;

export default function TermTooltip({ glossary }: { glossary: Glossary }) {
  const [hover, setHover] = useState<{ slug: string; x: number; y: number } | null>(null);
  const [modal, setModal] = useState<string | null>(null);

  useEffect(() => {
    // Gắn window.__glossary để AI panel hoặc script khác dùng
    (window as any).__glossary = glossary;

    function onEnter(e: Event) {
      const el = e.target as HTMLElement;
      if (!el.classList?.contains("term")) return;
      const rect = el.getBoundingClientRect();
      setHover({
        slug: el.dataset.slug || "",
        x: rect.left + rect.width / 2,
        y: rect.top - 8,
      });
    }
    function onLeave(e: Event) {
      const el = e.target as HTMLElement;
      if (!el.classList?.contains("term")) return;
      setHover(null);
    }
    function onClick(e: Event) {
      const el = e.target as HTMLElement;
      if (!el.classList?.contains("term")) return;
      e.preventDefault();
      setModal(el.dataset.slug || "");
    }

    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("click", onClick);
    };
  }, [glossary]);

  const hoverEntry = hover ? glossary[hover.slug] : null;
  const modalEntry = modal ? glossary[modal] : null;

  return (
    <>
      {hoverEntry && hover && (
        <div
          className="fixed z-50 max-w-sm px-3 py-2 text-sm bg-slate-900 text-white rounded-md shadow-lg pointer-events-none -translate-x-1/2 -translate-y-full"
          style={{ left: hover.x, top: hover.y }}
        >
          <div className="font-semibold text-slate-100">
            {hoverEntry.vi} <span className="text-slate-400 font-normal">· {hoverEntry.en}</span>
          </div>
          <div className="mt-1 text-slate-200 leading-snug">{hoverEntry.short}</div>
          <div className="mt-1 text-xs text-slate-400">Bấm để xem chi tiết</div>
        </div>
      )}

      {modalEntry && (
        <div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{modalEntry.vi}</h3>
                <p className="text-sm text-slate-500 mt-1">{modalEntry.en}</p>
              </div>
              <button
                onClick={() => setModal(null)}
                className="text-slate-400 hover:text-slate-700 text-2xl leading-none"
                aria-label="Đóng"
              >
                ×
              </button>
            </div>
            <p className="text-slate-800 leading-relaxed whitespace-pre-line">
              {modalEntry.long}
            </p>
            <div className="mt-6 pt-4 border-t border-slate-200">
              <a
                href={`/thuat-ngu#${modal}`}
                className="text-accent hover:underline text-sm"
              >
                Xem trong danh mục thuật ngữ →
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
