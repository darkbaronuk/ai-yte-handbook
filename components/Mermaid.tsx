"use client";
import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;

export default function Mermaid({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!initialized) {
      mermaid.initialize({
        startOnLoad: false,
        theme: "default",
        securityLevel: "loose",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        themeVariables: {
          primaryColor: "#dbeafe",
          primaryTextColor: "#1e3a8a",
          primaryBorderColor: "#2563eb",
          lineColor: "#64748b",
          fontSize: "14px",
        },
      });
      initialized = true;
    }
    let cancelled = false;
    const id = `mermaid-${Math.random().toString(36).slice(2, 10)}`;
    mermaid
      .render(id, code)
      .then(({ svg }) => {
        if (!cancelled && ref.current) ref.current.innerHTML = svg;
      })
      .catch((err) => {
        if (!cancelled) setError(String(err?.message || err));
      });
    return () => {
      cancelled = true;
    };
  }, [code]);

  if (error) {
    return (
      <div className="my-6 p-4 border border-red-300 bg-red-50 rounded text-sm text-red-800">
        <div className="font-semibold mb-1">Lỗi diagram Mermaid</div>
        <pre className="text-xs overflow-x-auto whitespace-pre-wrap">{error}</pre>
        <details className="mt-2">
          <summary className="cursor-pointer">Xem mã nguồn</summary>
          <pre className="text-xs mt-2 overflow-x-auto whitespace-pre-wrap">{code}</pre>
        </details>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="my-6 flex justify-center [&_svg]:max-w-full [&_svg]:h-auto"
    />
  );
}
