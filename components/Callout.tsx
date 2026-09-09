// Callout box: info | warning | success | danger | tip
import React from "react";

type Kind = "info" | "warning" | "success" | "danger" | "tip";

const CONFIG: Record<Kind, { emoji: string; label: string; bg: string; border: string; fg: string }> = {
  info: { emoji: "ℹ️", label: "Ghi chú", bg: "#eff6ff", border: "#3b82f6", fg: "#1e3a8a" },
  warning: { emoji: "⚠️", label: "Lưu ý", bg: "#fffbeb", border: "#f59e0b", fg: "#78350f" },
  success: { emoji: "✅", label: "Điểm mạnh", bg: "#f0fdf4", border: "#22c55e", fg: "#14532d" },
  danger: { emoji: "🚫", label: "Cảnh báo", bg: "#fef2f2", border: "#ef4444", fg: "#7f1d1d" },
  tip: { emoji: "💡", label: "Gợi ý", bg: "#f5f3ff", border: "#8b5cf6", fg: "#4c1d95" },
};

export default function Callout({
  kind = "info",
  title,
  children,
}: {
  kind?: Kind;
  title?: string;
  children: React.ReactNode;
}) {
  const c = CONFIG[kind];
  return (
    <div
      style={{
        background: c.bg,
        borderLeft: `4px solid ${c.border}`,
        color: c.fg,
        padding: "12px 18px",
        margin: "20px 0",
        borderRadius: "6px",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 6, fontSize: "0.95em" }}>
        {c.emoji} {title || c.label}
      </div>
      <div style={{ fontSize: "0.95em", lineHeight: 1.6 }}>{children}</div>
    </div>
  );
}
