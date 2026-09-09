import { NextRequest, NextResponse } from "next/server";

// OAuth broker cho Sveltia/Decap CMS — bước 2: đổi code lấy token, post message về CMS
export const dynamic = "force-dynamic";

function renderPostMessage(status: "success" | "error", payload: unknown): string {
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;
  // CMS nghe qua window.opener.postMessage; script chờ tin nhắn "authorizing:github"
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Authorizing…</title></head>
<body>
<p style="font-family:sans-serif;text-align:center;margin-top:40px">Đang đăng nhập… bạn có thể đóng cửa sổ này.</p>
<script>
(function () {
  var msg = ${JSON.stringify(message)};
  function send() {
    if (!window.opener) return;
    window.opener.postMessage(msg, "*");
  }
  window.addEventListener("message", function (e) {
    if (e.data === "authorizing:github") send();
  });
  send();
  setTimeout(function () { window.close(); }, 800);
})();
</script>
</body></html>`;
}

export async function GET(req: NextRequest) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new NextResponse(
      renderPostMessage("error", { message: "Thiếu OAUTH_GITHUB_CLIENT_ID hoặc OAUTH_GITHUB_CLIENT_SECRET trong Vercel env" }),
      { status: 500, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const stateRaw = searchParams.get("state");
  const nonceCookie = req.cookies.get("oauth_state")?.value;

  if (!code) {
    return new NextResponse(
      renderPostMessage("error", { message: "Thiếu 'code' từ GitHub" }),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  // Verify state
  try {
    const parsed = JSON.parse(Buffer.from(stateRaw || "", "base64url").toString("utf8"));
    if (!parsed.nonce || !nonceCookie || parsed.nonce !== nonceCookie) {
      throw new Error("State không khớp");
    }
  } catch (e) {
    return new NextResponse(
      renderPostMessage("error", { message: "State không hợp lệ (chống CSRF)" }),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  // Đổi code lấy token
  const origin = new URL(req.url).origin;
  const redirectUri = `${origin}/api/callback`;
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });
  const tokenJson: any = await tokenRes.json();
  if (!tokenJson.access_token) {
    return new NextResponse(
      renderPostMessage("error", {
        message: tokenJson.error_description || tokenJson.error || "Không đổi được token",
      }),
      { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }

  const html = renderPostMessage("success", {
    token: tokenJson.access_token,
    provider: "github",
  });
  const res = new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
  res.cookies.delete("oauth_state");
  return res;
}
