import { NextRequest, NextResponse } from "next/server";

// OAuth broker cho Sveltia CMS — bước 2: đổi code lấy token, trả HTML popup theo đúng contract
// Contract (theo sveltia-cms-auth/src/index.js):
//   1. Popup lắng nghe message 'authorizing:github' từ CMS
//   2. Khi nhận được, popup postMessage 'authorization:github:success:{"provider":"github","token":"..."}'
//      với target origin là origin của tin nhắn CMS gửi tới (không dùng '*')
//   3. Popup cũng gửi 'authorizing:github' về opener trước để CMS biết bắt đầu handshake

export const dynamic = "force-dynamic";

function serialize(v: unknown): string {
  return JSON.stringify(v ?? null).replace(/</g, "\\u003c");
}

function outputHTML(args: {
  provider?: string;
  token?: string;
  error?: string;
  errorCode?: string;
}): NextResponse {
  const { provider = "github", token, error, errorCode } = args;
  const state = error ? "error" : "success";
  const content = error ? { provider, error, errorCode } : { provider, token };
  const html = `<!doctype html><html><body><script>
(() => {
  const hasToken = ${serialize(!!token)};
  window.addEventListener('message', ({ data, origin }) => {
    if (data !== 'authorizing:${provider}') return;
    window.opener?.postMessage(
      'authorization:${provider}:${state}:${serialize(content)}',
      origin
    );
  });
  window.opener?.postMessage('authorizing:${provider}', '*');
})();
</script></body></html>`;
  const res = new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
  res.cookies.delete("oauth_state");
  return res;
}

export async function GET(req: NextRequest) {
  const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
  const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return outputHTML({
      error: "Server missing OAUTH_GITHUB_CLIENT_ID or OAUTH_GITHUB_CLIENT_SECRET",
      errorCode: "MISCONFIGURED",
    });
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const stateRaw = searchParams.get("state");
  const nonceCookie = req.cookies.get("oauth_state")?.value;

  if (!code) {
    return outputHTML({ error: "Missing 'code' from GitHub", errorCode: "MISSING_CODE" });
  }

  try {
    const parsed = JSON.parse(Buffer.from(stateRaw || "", "base64url").toString("utf8"));
    if (!parsed.nonce || !nonceCookie || parsed.nonce !== nonceCookie) {
      throw new Error("State mismatch");
    }
  } catch {
    return outputHTML({ error: "Invalid state (CSRF protection)", errorCode: "BAD_STATE" });
  }

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
    return outputHTML({
      error: tokenJson.error_description || tokenJson.error || "Token exchange failed",
      errorCode: "TOKEN_EXCHANGE_FAILED",
    });
  }

  return outputHTML({ provider: "github", token: tokenJson.access_token });
}
