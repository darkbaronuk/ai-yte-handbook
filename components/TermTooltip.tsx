"use client";

import { useEffect, useState } from "react";

type Entry = { vi: string; en: string; short: string; long: string };
type Glossary = Record<string, Entry>;
type Hover = { slug: string; left: number; top: number; width: number; above: boolean };

export default function TermTooltip({ glossary }: { glossary: Glossary }) {
  const [hover, setHover] = useState<Hover | null>(null);

  useEffect(() => {
    (window as any).__glossary = glossary;
    let active: HTMLElement | null = null;
    const findTerm = (target: EventTarget | null) =>
      target instanceof Element ? target.closest<HTMLElement>(".term[data-slug]") : null;

    function clear() {
      active?.removeAttribute("aria-describedby");
      active = null;
      setHover(null);
    }
    function position(el: HTMLElement | null) {
      if (!el || !glossary[el.dataset.slug || ""]) return;
      const rect = el.getBoundingClientRect();
      const width = Math.min(340, window.innerWidth - 24);
      active?.removeAttribute("aria-describedby");
      active = el;
      el.setAttribute("aria-describedby", "glossary-tooltip");
      const above = rect.top > 230;
      setHover({
        slug: el.dataset.slug!,
        width,
        left: Math.max(12, Math.min(rect.left + rect.width / 2 - width / 2, window.innerWidth - width - 12)),
        top: above ? rect.top - 8 : rect.bottom + 8,
        above,
      });
    }
    function show(event: Event) {
      position(findTerm(event.target));
    }
    function scroll() {
      if (active?.matches(":hover, :focus")) position(active);
      else clear();
    }
    function leave(event: Event) {
      const el = findTerm(event.target);
      if (el !== active) return;
      const related = (event as MouseEvent | FocusEvent).relatedTarget;
      if (related instanceof Node && el?.contains(related)) return;
      clear();
    }
    function key(event: KeyboardEvent) {
      if (event.key === "Escape") clear();
    }
    document.addEventListener("mouseover", show);
    document.addEventListener("mouseout", leave);
    document.addEventListener("focusin", show);
    document.addEventListener("focusout", leave);
    document.addEventListener("keydown", key);
    // Do not intercept clicks: links work with keyboard, touch, new tabs and no JS.
    window.addEventListener("scroll", scroll, true);
    window.addEventListener("resize", clear);
    window.addEventListener("pagehide", clear);
    return () => {
      clear();
      document.removeEventListener("mouseover", show);
      document.removeEventListener("mouseout", leave);
      document.removeEventListener("focusin", show);
      document.removeEventListener("focusout", leave);
      document.removeEventListener("keydown", key);
      window.removeEventListener("scroll", scroll, true);
      window.removeEventListener("resize", clear);
      window.removeEventListener("pagehide", clear);
    };
  }, [glossary]);

  const entry = hover ? glossary[hover.slug] : null;
  if (!entry || !hover) return null;
  return (
    <div
      id="glossary-tooltip"
      role="tooltip"
      className="fixed z-50 px-3 py-3 text-sm bg-slate-900 text-white rounded-md shadow-lg pointer-events-none"
      style={{
        left: hover.left,
        top: hover.top,
        width: hover.width,
        transform: hover.above ? "translateY(-100%)" : undefined,
      }}
    >
      <div className="font-semibold text-slate-100">
        {entry.vi} <span className="text-slate-400 font-normal">· {entry.en}</span>
      </div>
      <div className="mt-1 text-slate-200 leading-snug">{entry.short}</div>
      <div className="mt-2 text-xs text-slate-400">Bấm hoặc nhấn Enter để mở mục thuật ngữ</div>
    </div>
  );
}
