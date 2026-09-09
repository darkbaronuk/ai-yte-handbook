import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * On-demand ISR revalidation.
 *
 * Usage:
 *  1. Từ GitHub webhook (push vào main):
 *     POST /api/revalidate?secret=XXX&path=/chapters/02-ai-sinh-tao
 *  2. Từ trình duyệt (test):
 *     GET  /api/revalidate?secret=XXX&path=/chapters/02-ai-sinh-tao
 *  3. Revalidate toàn bộ chapter list + a chapter cùng lúc:
 *     POST /api/revalidate?secret=XXX&path=/chapters/02-ai-sinh-tao&path=/muc-luc
 *
 * Cần env var: REVALIDATE_SECRET
 * Ưu tiên: page mới update trong ~1s sau khi trigger, không cần full deploy.
 */

async function handle(req: NextRequest) {
  const url = new URL(req.url);
  const secret = url.searchParams.get("secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "REVALIDATE_SECRET chưa cấu hình trên Vercel" },
      { status: 500 }
    );
  }

  if (secret !== expected) {
    return NextResponse.json(
      { ok: false, error: "Invalid secret" },
      { status: 401 }
    );
  }

  const paths = url.searchParams.getAll("path");
  if (paths.length === 0) {
    return NextResponse.json(
      { ok: false, error: "Cần ít nhất 1 ?path=/..." },
      { status: 400 }
    );
  }

  const results = paths.map((p) => {
    try {
      revalidatePath(p);
      return { path: p, ok: true };
    } catch (e) {
      return { path: p, ok: false, error: String(e) };
    }
  });

  return NextResponse.json({
    ok: true,
    revalidated: results,
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: NextRequest) {
  return handle(req);
}

export async function GET(req: NextRequest) {
  return handle(req);
}
