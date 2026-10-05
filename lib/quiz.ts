import fs from "fs";
import path from "path";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  explanation: string;
}

export interface QuizQuestionFull extends QuizQuestion {
  answer: number;
}

export interface Quiz {
  chapter: string;
  title: string;
  status: string;
  note?: string;
  passScore: number;
  questions: QuizQuestionFull[];
}

export interface PublicQuiz {
  chapter: string;
  title: string;
  status: string;
  note?: string;
  passScore: number;
  questions: QuizQuestion[];
}

const QUIZ_DIR = path.join(process.cwd(), "content", "quizzes");

/** Đọc quiz đầy đủ (kèm đáp án) — chỉ dùng phía server. */
export function getQuiz(chapterSlug: string): Quiz | null {
  try {
    const raw = fs.readFileSync(path.join(QUIZ_DIR, `${chapterSlug}.json`), "utf-8");
    const q = JSON.parse(raw) as Quiz;
    if (!q.questions?.length) return null;
    return q;
  } catch {
    return null;
  }
}

/** Bản public gửi cho client (ẩn đáp án). */
export function publicQuiz(q: Quiz): PublicQuiz {
  return {
    chapter: q.chapter,
    title: q.title,
    status: q.status,
    note: q.note,
    passScore: q.passScore,
    questions: q.questions.map(({ answer, ...rest }) => rest),
  };
}

/** true nếu chương có quiz. */
export function hasQuiz(chapterSlug: string): boolean {
  return fs.existsSync(path.join(QUIZ_DIR, `${chapterSlug}.json`));
}
