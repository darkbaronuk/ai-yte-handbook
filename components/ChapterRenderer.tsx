"use client";
// Render mảng blocks của chapter (html + component)
import React from "react";
import Chart from "./Chart";
import Callout from "./Callout";
import MetricGrid from "./MetricGrid";
import Timeline from "./Timeline";
import type { RenderedBlock } from "@/lib/chapters";

export default function ChapterRenderer({ blocks }: { blocks: RenderedBlock[] }) {
  return (
    <div className="prose prose-slate max-w-none">
      {blocks.map((b, i) => {
        if (b.kind === "html")
          return <div key={i} dangerouslySetInnerHTML={{ __html: b.html }} />;

        if (b.kind === "chart") {
          const p = b.props as {
            type: "bar" | "line" | "area" | "radar";
            data: Record<string, string | number>[];
            keys: string[];
            xKey?: string;
            title?: string;
            yLabel?: string;
            height?: number;
          };
          return (
            <Chart
              key={i}
              type={p.type}
              data={p.data}
              keys={p.keys}
              xKey={p.xKey}
              title={p.title}
              yLabel={p.yLabel}
              height={p.height}
            />
          );
        }

        if (b.kind === "metrics") return <MetricGrid key={i} metrics={b.metrics} />;

        if (b.kind === "timeline") return <Timeline key={i} items={b.items} />;

        if (b.kind === "callout")
          return (
            <Callout key={i} kind={b.kind_ as any} title={b.title}>
              <div dangerouslySetInnerHTML={{ __html: b.html }} />
            </Callout>
          );

        return null;
      })}
    </div>
  );
}
