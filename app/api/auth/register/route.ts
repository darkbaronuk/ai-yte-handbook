import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();
    const cleanName = String(name ?? "").trim();
    const cleanEmail = String(email ?? "").toLowerCase().trim();
    const cleanPass = String(password ?? "");

    if (!cleanName || cleanName.length > 100)
      return NextResponse.json(
        { error: "Vui lòng nhập họ tên." },
        { status: 400 }
      );
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail))
      return NextResponse.json({ error: "Email không hợp lệ." }, { status: 400 });
    if (cleanPass.length < 6)
      return NextResponse.json(
        { error: "Mật khẩu tối thiểu 6 ký tự." },
        { status: 400 }
      );

    const db = getDb();
    const existing = await db
      .select({ id: users.id })
      .from(users)
      .where(eq(users.email, cleanEmail))
      .limit(1);
    if (existing.length > 0)
      return NextResponse.json(
        { error: "Email này đã được đăng ký. Hãy đăng nhập." },
        { status: 409 }
      );

    const passwordHash = await bcrypt.hash(cleanPass, 10);
    await db.insert(users).values({
      name: cleanName,
      email: cleanEmail,
      passwordHash,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("register error", e);
    return NextResponse.json({ error: "Lỗi hệ thống, thử lại sau." }, { status: 500 });
  }
}
