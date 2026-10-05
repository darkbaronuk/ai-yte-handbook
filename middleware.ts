import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware nhẹ cho Edge runtime: chỉ kiểm tra sự tồn tại của
 * session cookie (không import next-auth/db để tránh lỗi Edge).
 * Validate thật nằm ở từng page/API qua auth().
 */
export function middleware(req: NextRequest) {
  const token =
    req.cookies.get("authjs.session-token") ||
    req.cookies.get("__Secure-authjs.session-token");
  if (!token) {
    const url = req.nextUrl.clone();
    url.pathname = "/dang-nhap";
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  // /chung-chi/[code] là trang xác minh công khai → không bảo vệ
  matcher: ["/hoc-tap/:path*", "/quiz/:path*"],
};
