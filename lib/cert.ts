import { and, eq } from "drizzle-orm";
import { getRole } from "@/lib/paths";
import { getDb } from "@/lib/db";
import {
  certificates,
  chapterProgress,
  quizAttempts,
} from "@/lib/db/schema";
import { getQuiz } from "@/lib/quiz";

export interface Eligibility {
  eligible: boolean;
  chaptersTotal: number;
  chaptersDone: number;
  quizzesTotal: number;
  quizzesPassed: number;
  missingChapters: string[];
  missingQuizzes: string[];
}

/**
 * Điều kiện chứng chỉ cho một lộ trình vai trò:
 * - Đọc xong tất cả chương trong lộ trình
 * - Đậu quiz (≥ passScore) tất cả chương có quiz trong lộ trình
 */
export async function checkEligibility(
  userId: string,
  roleId: string
): Promise<Eligibility> {
  const role = getRole(roleId);
  if (!role)
    return {
      eligible: false,
      chaptersTotal: 0,
      chaptersDone: 0,
      quizzesTotal: 0,
      quizzesPassed: 0,
      missingChapters: [],
      missingQuizzes: [],
    };

  const db = getDb();
  const doneCh = await db
    .select({ slug: chapterProgress.chapterSlug })
    .from(chapterProgress)
    .where(eq(chapterProgress.userId, userId));
  const doneSet = new Set(doneCh.map((c) => c.slug));

  const passedRows = await db
    .select({ slug: quizAttempts.chapterSlug })
    .from(quizAttempts)
    .where(
      and(eq(quizAttempts.userId, userId), eq(quizAttempts.passed, true))
    );
  const passedSet = new Set(passedRows.map((r) => r.slug));

  const missingChapters = role.chapters.filter((s) => !doneSet.has(s));
  const chaptersWithQuiz = role.chapters.filter((s) => getQuiz(s));
  const missingQuizzes = chaptersWithQuiz.filter((s) => !passedSet.has(s));

  return {
    eligible: missingChapters.length === 0 && missingQuizzes.length === 0,
    chaptersTotal: role.chapters.length,
    chaptersDone: role.chapters.length - missingChapters.length,
    quizzesTotal: chaptersWithQuiz.length,
    quizzesPassed: chaptersWithQuiz.length - missingQuizzes.length,
    missingChapters,
    missingQuizzes,
  };
}

function makeCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 8; i++)
    s += chars[Math.floor(Math.random() * chars.length)];
  return `AIYTE-${s.slice(0, 4)}-${s.slice(4)}`;
}

/** Cấp chứng chỉ (nếu đủ điều kiện và chưa có). */
export async function issueCertificate(userId: string, roleId: string) {
  const db = getDb();
  const existing = await db
    .select()
    .from(certificates)
    .where(
      and(eq(certificates.userId, userId), eq(certificates.roleId, roleId))
    )
    .limit(1);
  if (existing.length > 0) return existing[0];

  const elig = await checkEligibility(userId, roleId);
  if (!elig.eligible) return null;

  const code = makeCode();
  const rows = await db
    .insert(certificates)
    .values({ userId, roleId, code })
    .returning();
  return rows[0];
}
