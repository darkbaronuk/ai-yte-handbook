import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { chapterProgress, labProgress } from "@/lib/db/schema";

/**
 * Migrate tiến độ từ localStorage (aiyte-progress-v1) lên tài khoản.
 * Body: { completedChapters: string[], completedLabs: string[] }
 * Chỉ thêm mới, không xóa dữ liệu đã có.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  const uid = session.user.id;
  let body: { completedChapters?: string[]; completedLabs?: string[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });
  }

  const db = getDb();
  const chapters = Array.isArray(body.completedChapters)
    ? body.completedChapters.filter((s) => typeof s === "string").slice(0, 100)
    : [];
  const labs = Array.isArray(body.completedLabs)
    ? body.completedLabs.filter((s) => typeof s === "string").slice(0, 100)
    : [];

  const existingCh = await db
    .select({ slug: chapterProgress.chapterSlug })
    .from(chapterProgress)
    .where(eq(chapterProgress.userId, uid));
  const haveCh = new Set(existingCh.map((c) => c.slug));
  for (const slug of chapters) {
    if (!haveCh.has(slug))
      await db.insert(chapterProgress).values({ userId: uid, chapterSlug: slug });
  }

  const existingLab = await db
    .select({ id: labProgress.labId })
    .from(labProgress)
    .where(eq(labProgress.userId, uid));
  const haveLab = new Set(existingLab.map((l) => l.id));
  for (const id of labs) {
    if (!haveLab.has(id))
      await db.insert(labProgress).values({ userId: uid, labId: id });
  }

  return NextResponse.json({ ok: true, chapters: chapters.length, labs: labs.length });
}
