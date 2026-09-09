import { NextRequest, NextResponse } from "next/server";

// OAuth broker cho Sveltia/Decap CMS — bước 1: chuyển hướng sang GitHub
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "OAUTH_GITHUB_CLIENT_ID chưa được đặt trong Vercel env" },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const provider = searchParams.get("provider") || "github";
  const scope = searchParams.get("scope") || "repo,user";
  const siteId = searchParams.get("site_id") || "";

  if (provider !== "github") {
    return NextResponse.json({ error: "Chỉ hỗ trợ provider=github" }, { status: 400 });
  }

  // state = ngẫu nhiên + site_id (để callback biết post message về đâu)
  const nonce = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
  const state = Buffer.from(JSON.stringify({ nonce, site_id: siteId })).toString("base64url");

  const origin = new URL(req.url).origin;
  const redirectUri = `${origin}/api/callback`;

  const gh = new URL("https://github.com/login/oauth/authorize");
  gh.searchParams.set("client_id", clientId);
  gh.searchParams.set("redirect_uri", redirectUri);
  gh.searchParams.set("scope", scope);
  gh.searchParams.set("state", state);

  const res = NextResponse.redirect(gh.toString(), 302);
  res.cookies.set("oauth_state", nonce, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return res;
}
