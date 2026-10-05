"use client";

import { useState } from "react";
import Link from "next/link";
import type { PublicQuiz } from "@/lib/quiz";

interface Detail {
  questionId: string;
  question: string;
  options: string[];
  chosen: number;
  correct: number;
  isCorrect: boolean;
  explanation: string;
}

export default function QuizTaker({
  quiz,
  chapterSlug,
  chapterTitle,
}: {
  quiz: PublicQuiz;
  chapterSlug: string;
  chapterTitle: string;
}) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    quiz.questions.map(() => null)
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    score: number;
    total: number;
    passed: boolean;
    passScore: number;
    details: Detail[];
  } | null>(null);

  const allAnswered = answers.every((a) => a !== null);

  async function submit() {
    if (!allAnswered || submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/quiz/${chapterSlug}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Nộp bài thất bại.");
        setSubmitting(false);
        return;
      }
      setResult(data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("Lỗi kết nối, thử lại sau.");
    }
    setSubmitting(false);
  }

  function retry() {
    setResult(null);
    setAnswers(quiz.questions.map(() => null));
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (result) {
    return (
      <div>
        <div
          className={`rounded-2xl p-6 mb-8 border ${
            result.passed
              ? "bg-emerald-50 border-emerald-200"
              : "bg-amber-50 border-amber-200"
          }`}
        >
          <div className="text-4xl mb-2">{result.passed ? "🎉" : "💪"}</div>
          <div className="font-serif text-2xl font-bold mb-1">
            {result.score}/{result.total} —{" "}
            {result.passed ? "Đạt!" : "Chưa đạt"}
          </div>
          <p className="text-slate-600 text-sm">
            {result.passed
              ? `Bạn đã vượt ngưỡng ${result.passScore}/${result.total}. Kết quả đã lưu vào tiến độ.`
              : `Cần tối thiểu ${result.passScore}/${result.total} để đạt. Ôn lại chương rồi làm lại nhé — không giới hạn số lần.`}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {!result.passed && (
              <button onClick={retry} className="btn-gradient">
                Làm lại
              </button>
            )}
            <Link href={`/chapters/${chapterSlug}`} className="btn-glass !text-accent !border-accent/40">
              ← Về chương
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          {result.details.map((d, i) => (
            <div
              key={d.questionId}
              className={`bg-white border rounded-2xl p-5 ${
                d.isCorrect ? "border-emerald-200" : "border-red-200"
              }`}
            >
              <div className="flex gap-3 mb-3">
                <span
                  className={`step-badge !w-7 !h-7 !text-xs shrink-0 ${
                    d.isCorrect ? "" : "!from-red-500 !to-orange-400"
                  }`}
                  style={
                    d.isCorrect
                      ? undefined
                      : { background: "linear-gradient(135deg,#ef4444,#fb923c)" }
                  }
                >
                  {i + 1}
                </span>
                <div className="font-medium">{d.question}</div>
              </div>
              <div className="ml-10 space-y-1.5 text-sm">
                {d.options.map((opt, oi) => (
                  <div
                    key={oi}
                    className={`px-3 py-2 rounded-lg border ${
                      oi === d.correct
                        ? "border-emerald-400 bg-emerald-50 font-medium"
                        : oi === d.chosen
                          ? "border-red-300 bg-red-50"
                          : "border-slate-100 text-slate-500"
                    }`}
                  >
                    {oi === d.correct ? "✓ " : oi === d.chosen ? "✗ " : ""}
                    {opt}
                  </div>
                ))}
              </div>
              <p className="ml-10 mt-3 text-sm text-slate-600 bg-blue-50/60 border border-blue-100 rounded-lg px-3 py-2">
                💡 {d.explanation}
              </p>
            </div>
          ))}
        </div>
        {!result.passed && (
          <button onClick={retry} className="btn-gradient mt-8">
            Làm lại quiz
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
          {error}
        </div>
      )}
      <div className="space-y-6">
        {quiz.questions.map((q, i) => (
          <div key={q.id} className="bg-white border border-slate-200 rounded-2xl p-5">
            <div className="flex gap-3 mb-4">
              <span className="step-badge !w-7 !h-7 !text-xs shrink-0">{i + 1}</span>
              <div className="font-medium">{q.question}</div>
            </div>
            <div className="ml-10 space-y-2">
              {q.options.map((opt, oi) => {
                const selected = answers[i] === oi;
                return (
                  <label
                    key={oi}
                    className={`flex items-start gap-3 px-4 py-3 rounded-xl border cursor-pointer transition ${
                      selected
                        ? "border-accent bg-blue-50/70 font-medium"
                        : "border-slate-200 hover:border-accent/50 hover:bg-slate-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      checked={selected}
                      onChange={() => {
                        const next = [...answers];
                        next[i] = oi;
                        setAnswers(next);
                      }}
                      className="mt-1 accent-blue-600"
                    />
                    <span className="text-sm">{opt}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-4">
        <button
          onClick={submit}
          disabled={!allAnswered || submitting}
          className="btn-gradient disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? "Đang chấm…" : "Nộp bài"}
        </button>
        <span className="text-sm text-slate-500">
          {answers.filter((a) => a !== null).length}/{quiz.questions.length} câu đã trả lời
          · Đạt từ {quiz.passScore}/{quiz.questions.length}
        </span>
      </div>
    </div>
  );
}
