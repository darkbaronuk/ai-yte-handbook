// Grid các số liệu quan trọng (metric tiles)
import React from "react";

export type Metric = {
  value: string;
  label: string;
  hint?: string;
};

export default function MetricGrid({ metrics }: { metrics: Metric[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fit, minmax(160px, 1fr))`,
        gap: "12px",
        margin: "24px 0",
      }}
    >
      {metrics.map((m, i) => (
        <div
          key={i}
          style={{
            background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
            border: "1px solid #e2e8f0",
            borderRadius: "10px",
            padding: "16px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>
            {m.value}
          </div>
          <div style={{ fontSize: "0.85rem", color: "#475569", marginTop: 6, fontWeight: 500 }}>
            {m.label}
          </div>
          {m.hint && (
            <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 4 }}>{m.hint}</div>
          )}
        </div>
      ))}
    </div>
  );
}
