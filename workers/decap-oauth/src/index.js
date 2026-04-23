/**
 * Decap CMS GitHub OAuth proxy — Cloudflare Worker
 *
 * Endpoints:
 *   GET /auth        → redirects user to GitHub's OAuth consent screen
 *   GET /callback    → exchanges ?code= for an access token, then posts the
 *                      result back to the opening Decap CMS popup window
 *
 * Required:
 *   OAUTH_CLIENT_ID      (var or secret) — GitHub OAuth App client ID
 *   OAUTH_CLIENT_SECRET  (secret)        — GitHub OAuth App client secret
 *
 * Required vars:
 *   ALLOWED_ORIGINS  — comma-separated list of origins permitted to receive
 *                      the postMessage (e.g. "https://chrisjasonmcqueen.com")
 */

const GITHUB_AUTHORIZE = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN = "https://github.com/login/oauth/access_token";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") return handleAuth(url, env);
    if (url.pathname === "/callback") return handleCallback(url, env);
    if (url.pathname === "/" || url.pathname === "/health") {
      return new Response("decap-oauth: ok", {
        headers: { "content-type": "text/plain" },
      });
    }
    return new Response("Not Found", { status: 404 });
  },
};

function handleAuth(url, env) {
  if (!env.OAUTH_CLIENT_ID) {
    return errorResponse("Missing OAUTH_CLIENT_ID", 500);
  }
  // Decap may pass ?provider=github&site_id=...&scope=repo
  const scope = url.searchParams.get("scope") || "repo,user";
  const redirectUri = `${url.origin}/callback`;

  const ghUrl = new URL(GITHUB_AUTHORIZE);
  ghUrl.searchParams.set("client_id", env.OAUTH_CLIENT_ID);
  ghUrl.searchParams.set("redirect_uri", redirectUri);
  ghUrl.searchParams.set("scope", scope);

  return Response.redirect(ghUrl.toString(), 302);
}

async function handleCallback(url, env) {
  const code = url.searchParams.get("code");
  if (!code) return errorResponse("Missing ?code parameter", 400);
  if (!env.OAUTH_CLIENT_ID || !env.OAUTH_CLIENT_SECRET) {
    return errorResponse("Worker missing OAUTH_CLIENT_ID / OAUTH_CLIENT_SECRET", 500);
  }

  let token, errorMessage;
  try {
    const res = await fetch(GITHUB_TOKEN, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        "user-agent": "decap-oauth-worker",
      },
      body: JSON.stringify({
        client_id: env.OAUTH_CLIENT_ID,
        client_secret: env.OAUTH_CLIENT_SECRET,
        code,
      }),
    });
    const data = await res.json();
    if (data.error) {
      errorMessage = `${data.error}: ${data.error_description || ""}`;
    } else if (!data.access_token) {
      errorMessage = "GitHub did not return an access_token";
    } else {
      token = data.access_token;
    }
  } catch (e) {
    errorMessage = `Token exchange failed: ${e.message}`;
  }

  const allowedOrigins = (env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const payload = token
    ? { token, provider: "github" }
    : { error: errorMessage || "Unknown error" };
  const status = token ? "success" : "error";
  const message = `authorization:github:${status}:${JSON.stringify(payload)}`;

  return new Response(renderCallbackHtml(message, allowedOrigins), {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

function renderCallbackHtml(message, allowedOrigins) {
  // Decap's netlify-cms-oauth flow:
  //   1. Popup loads this page.
  //   2. Page sends "authorizing:github" to opener until opener replies.
  //   3. Opener replies with the same string → popup posts the auth result.
  //   4. Popup closes.
  return `<!doctype html>
<html><head><meta charset="utf-8"><title>Authorizing…</title></head>
<body><p>Authorizing with GitHub…</p>
<script>
(function () {
  var message = ${JSON.stringify(message)};
  var allowed = ${JSON.stringify(allowedOrigins)};

  function pickTarget(origin) {
    if (allowed.indexOf(origin) !== -1) return origin;
    return null;
  }

  function send(target, msg) {
    try { window.opener.postMessage(msg, target); } catch (e) {}
  }

  if (!window.opener) {
    document.body.innerText = "No opener window. Open /admin and try again.";
    return;
  }

  function receive(e) {
    var target = pickTarget(e.origin);
    if (!target) return;            // ignore non-allowed origins
    if (e.data !== "authorizing:github") return;
    send(target, message);
    window.removeEventListener("message", receive);
    setTimeout(function () { window.close(); }, 500);
  }

  window.addEventListener("message", receive, false);

  // Kick off the handshake — try every allowed origin.
  allowed.forEach(function (o) { send(o, "authorizing:github"); });

  // Safety net: re-announce a few times in case opener wasn't ready.
  var ticks = 0;
  var iv = setInterval(function () {
    ticks++;
    allowed.forEach(function (o) { send(o, "authorizing:github"); });
    if (ticks > 20) clearInterval(iv);  // ~10s
  }, 500);
})();
</script>
</body></html>`;
}

function errorResponse(msg, status) {
  return new Response(msg, {
    status,
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
