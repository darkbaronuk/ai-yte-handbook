import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getChapter } from "@/lib/chapters";
import { getQuiz, publicQuiz } from "@/lib/quiz";
import QuizTaker from "@/components/QuizTaker";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const quiz = getQuiz(params.slug);
  return { title: quiz ? `${quiz.title} — Cẩm nang AI Y tế VN` : "Quiz" };
}

export default async function QuizPage({ params }: { params: { slug: string } }) {
  const session = await auth();
  if (!session?.user?.id) redirect(`/dang-nhap?callbackUrl=/quiz/${params.slug}`);
  const quiz = getQuiz(params.slug);
  if (!quiz) notFound();
  let chapterTitle = quiz.title;
  try {
    const ch = await getChapter(params.slug);
    chapterTitle = `Chương ${ch.number} — ${ch.title}`;
  } catch {}

  return (
    <div className="max-w-3xl mx-auto">
      <div className="page-band">
        <div className="relative z-10">
          <Link href={`/chapters/${params.slug}`} className="text-sm text-accent font-medium hover:underline">
            ← {chapterTitle}
          </Link>
          <h1 className="font-serif text-3xl font-bold mt-2">Quiz kiểm tra</h1>
          <p className="text-slate-600 text-sm mt-1">
            {quiz.questions.length} câu hỏi · Đạt từ {quiz.passScore}/{quiz.questions.length} ·
            Không giới hạn số lần làm
          </p>
          {quiz.status === "draft" && (
            <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mt-3 inline-block">
              ⚠️ Bộ câu hỏi bản nháp — {quiz.note || "chờ tác giả duyệt"}.
            </p>
          )}
        </div>
      </div>
      <QuizTaker quiz={publicQuiz(quiz)} chapterSlug={params.slug} chapterTitle={chapterTitle} />
    </div>
  );
}
