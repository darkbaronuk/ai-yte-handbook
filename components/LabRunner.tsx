"use client";

import { useState } from "react";
import type { Lab } from "@/lib/labs";

type GradeResult = {
  grade: number;
  score: number;
  rubric_breakdown: Record<string, { \u0111\u1ea1t: boolean; nh\u1eadn_x\u00e9t: string }>;
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
      setError(`C\u00e2u tr\u1ea3 l\u1eddi c\u1ea7n \u00edt nh\u1ea5t ${lab.minLength} k\u00fd t\u1ef1 (hi\u1ec7n t\u1ea1i ${charCount}).`);
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
      if (!res.ok) throw new Error(data.error || "Ch\u1ea5m l\u1ed7i");
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
      {/* Th\u00f4ng tin h\u1ecdc vi\u00ean */}
      <section className="bg-white border border-slate-200 rounded-lg p-5">
        <h2 className="font-semibold text-lg mb-3">Th\u00f4ng tin h\u1ecdc vi\u00ean</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="H\u1ecd t\u00ean (t\u00f9y ch\u1ecdn)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-slate-300 rounded px-3 py-2"
          />
          <input
            type="email"
            placeholder="Email (\u0111\u1ec3 theo d\u00f5i ti\u1ebfn \u0111\u1ed9)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-slate-300 rounded px-3 py-2"
          />
        </div>
      </section>

      {/* C\u00e2u h\u1ecfi */}
      <section className="bg-slate-50 border-l-4 border-accent p-5 rounded-r-lg">
        <h2 className="font-semibold text-lg mb-2">C\u00e2u h\u1ecfi</h2>
        <p className="text-slate-800 leading-relaxed">{lab.question}</p>
      </section>

      {/* Rubric collapsible */}
      <details className="bg-white border border-slate-200 rounded-lg">
        <summary className="cursor-pointer p-4 font-semibold hover:bg-slate-50">
          Xem rubric ch\u1ea5m \u0111i\u1ec3m 1\u20135
        </summary>
        <div
          className="p-4 pt-0 text-sm text-slate-700 whitespace-pre-line"
          dangerouslySetInnerHTML={{ __html: lab.rubric.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }}
        />
      </details>

      {/* Textarea */}
      <section className="bg-white border border-slate-200 rounded-lg p-5">
        <label className="block font-semibold text-lg mb-2">C\u00e2u tr\u1ea3 l\u1eddi c\u1ee7a b\u1ea1n</label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Vi\u1ebft \u0111o\u1ea1n v\u0103n 150\u2013250 t\u1eeb t\u1ea1i \u0111\u00e2y\u2026"
          className="w-full min-h-[240px] border border-slate-300 rounded p-3 leading-relaxed focus:outline-none focus:ring-2 focus:ring-accent"
          disabled={loading || result !== null}
        />
        <div className="mt-2 flex justify-between text-sm text-slate-500">
          <span>{wordCount} t\u1eeb \u00b7 {charCount} k\u00fd t\u1ef1</span>
          <span className={charCount >= lab.minLength ? "text-emerald-600" : "text-slate-400"}>
            {charCount >= lab.minLength ? "\u2713 \u0110\u1ee7 \u0111\u1ed9 d\u00e0i" : `C\u1ea7n \u00edt nh\u1ea5t ${lab.minLength} k\u00fd t\u1ef1`}
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
            {loading ? "\u0110ang ch\u1ea5m\u2026" : "N\u1ed9p b\u00e0i \u00b7 AI ch\u1ea5m ngay"}
          </button>
          <button
            onClick={() => setAnswer("")}
            disabled={loading}
            className="px-6 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            X\u00f3a
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded p-4">
          <strong>L\u1ed7i:</strong> {error}
        </div>
      )}

      {/* K\u1ebft qu\u1ea3 */}
      {result && (
        <section className="bg-white border-2 border-accent rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className={`${gradeColor(result.grade)} text-white text-4xl font-bold w-20 h-20 rounded-full flex items-center justify-center`}>
              {result.grade}
            </div>
            <div>
              <div className="text-2xl font-bold">Grade {result.grade}/5</div>
              <div className="text-slate-500">{result.score}/100 \u0111i\u1ec3m</div>
            </div>
          </div>

          <div className="bg-slate-50 rounded p-4">
            <div className="font-semibold mb-2">Nh\u1eadn x\u00e9t chi ti\u1ebft</div>
            <p className="text-slate-700 leading-relaxed">{result.feedback}</p>
          </div>

          <div>
            <div className="font-semibold mb-2">Ph\u00e2n t\u00edch t\u1eebng ti\u00eau ch\u00ed</div>
            <ul className="space-y-2">
              {Object.entries(result.rubric_breakdown).map(([k, v]) => (
                <li key={k} className="flex gap-3 items-start">
                  <span className={`mt-1 w-4 h-4 rounded-full flex-shrink-0 ${v.\u0111\u1ea1t ? "bg-emerald-500" : "bg-red-400"}`} />
                  <div>
                    <div className="font-medium">{k}</div>
                    <div className="text-sm text-slate-600">{v.nh\u1eadn_x\u00e9t}</div>
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
              L\u00e0m l\u1ea1i
            </button>
            <button
              onClick={() => window.close()}
              className="px-4 py-2 border border-slate-300 rounded hover:bg-slate-50"
            >
              \u0110\u00f3ng tab
            </button>
          </div>

          <div className="text-xs text-slate-400 pt-2">
            Ch\u1ea5m b\u1edfi Llama 3.3 70B (Groq) \u00b7 K\u1ebft qu\u1ea3 \u0111\u00e3 l\u01b0u v\u00e0o Sheet grading n\u1ebfu b\u1ea1n \u0111i\u1ec1n email.
          </div>
        </section>
      )}
    </div>
  );
}
