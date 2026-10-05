import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { auth } from "@/auth";
import { getDb } from "@/lib/db";
import { chapterProgress, labProgress } from "@/lib/db/schema";

/** Lấy toàn bộ tiến độ của user đang đăng nhập. */
export async function GET() {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  const db = getDb();
  const uid = session.user.id;
  const chapters = await db
    .select({ slug: chapterProgress.chapterSlug })
    .from(chapterProgress)
    .where(eq(chapterProgress.userId, uid));
  const labs = await db
    .select({ id: labProgress.labId })
    .from(labProgress)
    .where(eq(labProgress.userId, uid));
  return NextResponse.json({
    chapters: chapters.map((c) => c.slug),
    labs: labs.map((l) => l.id),
  });
}

/**
 * Toggle tiến độ. Body: { kind: "chapter"|"lab", id: string }
 * Trả về { done: boolean }.
 */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  const { kind, id } = await req.json();
  const slug = String(id ?? "").trim();
  if (!slug || (kind !== "chapter" && kind !== "lab"))
    return NextResponse.json({ error: "Dữ liệu không hợp lệ." }, { status: 400 });

  const db = getDb();
  const uid = session.user.id;

  if (kind === "chapter") {
    const existing = await db
      .select({ id: chapterProgress.id })
      .from(chapterProgress)
      .where(
        and(
          eq(chapterProgress.userId, uid),
          eq(chapterProgress.chapterSlug, slug)
        )
      )
      .limit(1);
    if (existing.length > 0) {
      await db
        .delete(chapterProgress)
        .where(eq(chapterProgress.id, existing[0].id));
      return NextResponse.json({ done: false });
    }
    await db.insert(chapterProgress).values({ userId: uid, chapterSlug: slug });
    return NextResponse.json({ done: true });
  }

  const existing = await db
    .select({ id: labProgress.id })
    .from(labProgress)
    .where(and(eq(labProgress.userId, uid), eq(labProgress.labId, slug)))
    .limit(1);
  if (existing.length > 0) {
    await db.delete(labProgress).where(eq(labProgress.id, existing[0].id));
    return NextResponse.json({ done: false });
  }
  await db.insert(labProgress).values({ userId: uid, labId: slug });
  return NextResponse.json({ done: true });
}
