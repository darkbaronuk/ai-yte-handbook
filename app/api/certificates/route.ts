import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getRole } from "@/lib/paths";
import { checkEligibility, issueCertificate } from "@/lib/cert";

/** Kiểm tra điều kiện: GET ?roleId=... */
export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  const roleId = new URL(req.url).searchParams.get("roleId") || "";
  const elig = await checkEligibility(session.user.id, roleId);
  return NextResponse.json(elig);
}

/** Cấp chứng chỉ: POST { roleId } */
export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id)
    return NextResponse.json({ error: "Chưa đăng nhập." }, { status: 401 });
  const { roleId } = await req.json();
  const role = getRole(String(roleId || ""));
  if (!role)
    return NextResponse.json({ error: "Lộ trình không tồn tại." }, { status: 400 });
  const cert = await issueCertificate(session.user.id, role.id);
  if (!cert)
    return NextResponse.json(
      { error: "Bạn chưa đủ điều kiện nhận chứng chỉ." },
      { status: 403 }
    );
  return NextResponse.json({ code: cert.code });
}
