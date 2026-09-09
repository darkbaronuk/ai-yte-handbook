// Timeline dọc kiểu neo trục, mỗi mốc là năm + sự kiện
import React from "react";

type Item = { year: string; event: string; kind?: string };

const KIND_COLOR: Record<string, string> = {
  milestone: "#3b82f6",
  warning: "#f59e0b",
  success: "#22c55e",
  danger: "#ef4444",
  default: "#8b5cf6",
};

export default function Timeline({ items }: { items: Item[] }) {
  return (
    <div style={{ position: "relative", paddingLeft: 32, margin: "24px 0" }}>
      <div
        style={{
          position: "absolute",
          left: 8,
          top: 0,
          bottom: 0,
          width: 2,
          background: "linear-gradient(180deg, #cbd5e1 0%, #cbd5e1 100%)",
        }}
      />
      {items.map((it, i) => {
        const color = KIND_COLOR[it.kind || "default"] || KIND_COLOR.default;
        return (
          <div key={i} style={{ position: "relative", marginBottom: 20 }}>
            <div
              style={{
                position: "absolute",
                left: -30,
                top: 6,
                width: 16,
                height: 16,
                background: color,
                borderRadius: "50%",
                border: "3px solid white",
                boxShadow: "0 0 0 2px " + color,
              }}
            />
            <div style={{ fontWeight: 700, color: "#0f172a", fontSize: "0.95em" }}>{it.year}</div>
            <div style={{ color: "#334155", fontSize: "0.95em", marginTop: 2, lineHeight: 1.5 }}>
              {it.event}
            </div>
          </div>
        );
      })}
    </div>
  );
}
