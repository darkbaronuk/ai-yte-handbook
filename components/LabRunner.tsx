"use client";

import { useState } from "react";
import type { Lab } from "@/lib/labs";

type RubricItem = { đạt: boolean; nhận_xét: string };
type GradeResult = {
  grade: number;
  score: number;
  rubric_breakdown: Record<string, RubricItem>;
  feedback: string;
};

export default function LabRunner({ lab }: { lab: Lab }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<GradeResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const charCount = answer.length;
  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;

  async function submit() {
    setError(null);
    setResult(null);
    if (answer.length < lab.minLength) {
      setError(`Câu trả lời cần ít nhất ${lab.minLength} ký tự (hiện tại ${charCount}).`);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/lab/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chapter: lab.chapter,
          lab_id: lab.id,
          question: lab.question,
          rubric: lab.rubric,
          answer,
          learner_name: name,
          learner_email: email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Chấm lỗi");
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  const gradeColor = (g: number) =>
    g >= 5 ? "bg-emerald-500" : g === 4 ? "bg-green-500" : g === 3 ? "bg-yellow-500" : g === 2 ? "bg-orange-500" : "bg-red-500";

  return (
    <div className="not-prose space-y-6">
      {/* Thông tin học viên */}
      <section className="bg-white border border-slate-200 rounded-lg p-5">
        <h2 className="font-semibold text-lg mb-3">Thông tin học viên</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Họ tên (tùy chọn)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-slate-300 rounded px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email (để theo dõi tiến độ)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-slate-300 rounded px-3 py-2"
          />
        </div>
      </section>

      {/* Câu hỏi */}
      <section className="bg-slate-50 border-l-4 border-accent p-5 rounded-r-lg">
        <h2 className="font-semibold text-lg mb-2">Câu hỏi</h2>
        <p className="text-slate-800 leading-relaxed">{lab.question}</p>
      </section>

      {/* Rubric collapsible */}
      <details className="bg-white border border-slate-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold hover:bg-slate-50">
          Xem rubric chấm điểm 1–5
        </summary>
        <div
          className="p-4 pt-0 text-sm text-slate-700 whitespace-pre-line"
          dangerouslySetInnerHTML={{
            __html: lab.rubric.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>"),
          }}
        />
      </details>

      {/* Textarea */}
      <section className="bg-white border border-slate-200 rounded-lg p-5">
        <label className="block font-semibold text-lg mb-2">Câu trả lời của bạn</label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Viết đoạn văn 150–250 từ tại đây…"
          className="w-full min-h-[240px] border border-slate-300 rounded p-3 leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent"
          disabled={loading || result !== null}
        />
        <div className="mt-2 flex justify-between text-sm text-slate-500">
          <span>
            {wordCount} từ · {charCount} ký tự
          </span>
          <span className={charCount >= lab.minLength ? "text-emerald-600" : "text-slate-400"}>
            {charCount >= lab.minLength ? "✓ Đủ độ dài" : `Cần ít nhất ${lab.minLength} ký tự`}
          </span>
        </div>
      </section>

      {/* Actions */}
      {!result && (
        <div className="flex gap-3">
          <button
            onClick={submit}
            disabled={loading || charCount < lab.minLength}
            className="px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition"
          >
            {loading ? "Đang chấm…" : "Nộp bài · AI chấm ngay"}
          </button>
          <button
            onClick={() => setAnswer("")}
            disabled={loading}
            className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            Xóa
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded p-4">
          <strong>Lỗi:</strong> {error}
        </div>
      )}

      {/* Kết quả */}
      {result && (
        <section className="bg-white border-2 border-accent rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div
              className={`${gradeColor(result.grade)} text-white text-4xl font-bold w-20 h-20 rounded-full flex items-center justify-center`}
            >
              {result.grade}
            </div>
            <div>
              <div className="text-2xl font-bold">Grade {result.grade}/5</div>
              <div className="text-slate-500">{result.score}/100 điểm</div>
            </div>
          </div>

          <div className="bg-slate-50 rounded p-4">
            <div className="font-semibold mb-2">Nhận xét chi tiết</div>
            <p className="text-slate-700 leading-relaxed">{result.feedback}</p>
          </div>

          <div>
            <div className="font-semibold mb-2">Phân tích từng tiêu chí</div>
            <ul className="space-y-2">
              {Object.entries(result.rubric_breakdown).map(([k, v]) => (
                <li key={k} className="flex gap-3 items-start">
                  <span
                    className={`mt-1 w-4 h-4 rounded-full flex-shrink-0 ${v.đạt ? "bg-emerald-500" : "bg-red-400"}`}
                  />
                  <div>
                    <div className="font-medium">{k}</div>
                    <div className="text-sm text-slate-600">{v.nhận_xét}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 pt-3 border-t">
            <button
              onClick={() => {
                setResult(null);
                setAnswer("");
                setError(null);
              }}
              className="px-4 py-2 bg-accent text-white rounded hover:opacity-90"
            >
              Làm lại
            </button>
            <button
              onClick={() => window.close()}
              className="px-4 py-2 border border-slate-300 rounded hover:bg-slate-50"
            >
              Đóng tab
            </button>
          </div>

          <div className="text-xs text-slate-400 pt-2">
            Chấm bởi GPT-OSS 120B (Groq) · Kết quả đã lưu vào Sheet grading nếu bạn điền email.
          </div>
        </section>
      )}
    </div>
  );
}
