"use client";
// Chart wrapper: bar, line, area, radar - client-side chỉ để giảm SSR bundle
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ChartType = "bar" | "line" | "area" | "radar";

// Palette Y tế: xanh y khoa, cam ấm, tím tri thức, xanh lá an toàn
const COLORS = ["#0ea5e9", "#f59e0b", "#8b5cf6", "#22c55e", "#ef4444", "#14b8a6"];

export default function Chart({
  type,
  data,
  keys,
  xKey = "name",
  height = 320,
  title,
  yLabel,
}: {
  type: ChartType;
  data: Record<string, string | number>[];
  keys: string[];
  xKey?: string;
  height?: number;
  title?: string;
  yLabel?: string;
}) {
  const renderChart = () => {
    if (type === "radar") {
      return (
        <RadarChart data={data}>
          <PolarGrid stroke="#e2e8f0" />
          <PolarAngleAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#334155" }} />
          <PolarRadiusAxis tick={{ fontSize: 10, fill: "#94a3b8" }} />
          {keys.map((k, i) => (
            <Radar
              key={k}
              name={k}
              dataKey={k}
              stroke={COLORS[i % COLORS.length]}
              fill={COLORS[i % COLORS.length]}
              fillOpacity={0.25}
            />
          ))}
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Tooltip />
        </RadarChart>
      );
    }

    const Common = (
      <>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#334155" }} />
        <YAxis
          tick={{ fontSize: 12, fill: "#334155" }}
          label={
            yLabel
              ? { value: yLabel, angle: -90, position: "insideLeft", style: { fontSize: 11, fill: "#475569" } }
              : undefined
          }
        />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 12 }} />
      </>
    );

    if (type === "bar")
      return (
        <BarChart data={data}>
          {Common}
          {keys.map((k, i) => (
            <Bar key={k} dataKey={k} fill={COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      );

    if (type === "line")
      return (
        <LineChart data={data}>
          {Common}
          {keys.map((k, i) => (
            <Line
              key={k}
              type="monotone"
              dataKey={k}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={2.5}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      );

    return (
      <AreaChart data={data}>
        {Common}
        {keys.map((k, i) => (
          <Area
            key={k}
            type="monotone"
            dataKey={k}
            stroke={COLORS[i % COLORS.length]}
            fill={COLORS[i % COLORS.length]}
            fillOpacity={0.3}
          />
        ))}
      </AreaChart>
    );
  };

  return (
    <figure style={{ margin: "24px 0" }}>
      {title && (
        <figcaption
          style={{
            fontSize: "0.9rem",
            color: "#475569",
            textAlign: "center",
            marginBottom: 8,
            fontWeight: 600,
          }}
        >
          {title}
        </figcaption>
      )}
      <div style={{ width: "100%", height }}>
        <ResponsiveContainer>{renderChart()}</ResponsiveContainer>
      </div>
    </figure>
  );
}
