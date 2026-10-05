import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { quizAttempts } from "@/lib/db/schema";
import { getQuiz } from "@/lib/quiz";

/**
 * Nộp bài quiz. Body: { answers: number[] } (index đáp án đã chọn theo thứ tự câu hỏi)
 * Chấm phía server, lưu lượt làm, trả về điểm + chi tiết từng câu.
 */
export async function POST(
  req: Request,
  { params }: { params: { slug: string } }
) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });

  const quiz = getQuiz(params.slug);
  if (!quiz)
    return NextResponse.json({ error: "Chưa có quiz cho chương này." }, { status: 404 });

  let body: { answers?: number[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }
  const answers = Array.isArray(body.answers) ? body.answers : [];
  if (answers.length !== quiz.questions.length)
    return NextResponse.json(
      { error: "Hãy trả lời tất cả câu hỏi." },
      { status: 400 }
    );

  const details = quiz.questions.map((q, i) => {
    const chosen = Number.isInteger(answers[i]) ? answers[i] : -1;
    return {
      questionId: q.id,
      question: q.question,
      options: q.options,
      chosen,
      correct: q.answer,
      isCorrect: chosen === q.answer,
      explanation: q.explanation,
    };
  });
  const score = details.filter((d) => d.isCorrect).length;
  const passed = score >= quiz.passScore;

  const db = getDb();
  await db.insert(quizAttempts).values({
    userId: session.user.id,
    chapterSlug: params.slug,
    score,
    total: quiz.questions.length,
    passed,
    answers: details.map((d) => ({
      questionId: d.questionId,
      chosen: d.chosen,
      correct: d.isCorrect,
    })),
  });

  return NextResponse.json({
    score,
    total: quiz.questions.length,
    passed,
    passScore: quiz.passScore,
    details,
  });
}
