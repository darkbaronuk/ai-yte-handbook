// Tách chapter markdown thành mảng blocks: html hoặc component
// Cú pháp trong markdown:
//   ```chart
//   {"type":"radar","title":"So sánh mô hình","data":[...],"keys":["A","B"]}
//   ```
//   ```callout kind=info title="..."
//   Nội dung markdown thuần bên trong
//   ```
//   ```metrics
//   [{"value":"92%","label":"AUC","hint":"n=3.2M"}, ...]
//   ```
//   ```timeline
//   [{"year":"2018","event":"..."}, ...]
//   ```

export type ChapterBlock =
  | { kind: "html"; html: string }
  | { kind: "chart"; props: Record<string, unknown> }
  | { kind: "callout"; props: { kind?: string; title?: string }; body: string }
  | { kind: "metrics"; metrics: Array<{ value: string; label: string; hint?: string }> }
  | { kind: "timeline"; items: Array<{ year: string; event: string; kind?: string }> };

// Tách theo fenced code block ```<lang>
export function splitBlocks(md: string): Array<
  | { kind: "md"; text: string }
  | { kind: "chart"; text: string }
  | { kind: "callout"; header: string; text: string }
  | { kind: "metrics"; text: string }
  | { kind: "timeline"; text: string }
> {
  const parts: Array<
    | { kind: "md"; text: string }
    | { kind: "chart"; text: string }
    | { kind: "callout"; header: string; text: string }
    | { kind: "metrics"; text: string }
    | { kind: "timeline"; text: string }
  > = [];

  // Regex fenced blocks với các lang đặc biệt
  const re = /```(chart|callout[^\n]*|metrics|timeline)\n([\s\S]*?)```/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(md)) !== null) {
    const [full, langRaw, body] = m;
    if (m.index > last) parts.push({ kind: "md", text: md.slice(last, m.index) });
    const lang = langRaw.trim();
    if (lang === "chart") parts.push({ kind: "chart", text: body.trim() });
    else if (lang === "metrics") parts.push({ kind: "metrics", text: body.trim() });
    else if (lang === "timeline") parts.push({ kind: "timeline", text: body.trim() });
    else if (lang.startsWith("callout"))
      parts.push({ kind: "callout", header: lang.replace(/^callout/, "").trim(), text: body.trim() });
    last = m.index + full.length;
  }
  if (last < md.length) parts.push({ kind: "md", text: md.slice(last) });
  return parts;
}

// Parse header của callout: "kind=info title=\"...\"" hoặc "info"
export function parseCalloutHeader(h: string): { kind: string; title?: string } {
  if (!h) return { kind: "info" };
  const bare = h.match(/^(info|warning|success|danger|tip)$/);
  if (bare) return { kind: bare[1] };
  const kind = /kind=(\w+)/.exec(h)?.[1] || "info";
  const title = /title="([^"]+)"/.exec(h)?.[1];
  return { kind, title };
}
