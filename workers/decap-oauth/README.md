# decap-oauth worker

Cloudflare Worker that proxies GitHub OAuth for Decap CMS at `/admin`.

Deployed at: `https://decap-oauth.chrisjmcq.workers.dev`

## Why this exists

Decap CMS's `github` backend can't talk to GitHub directly from the browser
(GitHub doesn't allow exposing the client secret). This Worker performs the
`code → access_token` exchange and posts the token back to the Decap popup
via `postMessage`.

## Endpoints

- `GET /auth` — redirects to GitHub's consent screen.
- `GET /callback?code=…` — exchanges code for token, posts to opener, closes.
- `GET /health` — liveness check.

## Configure (one-time)

In your GitHub OAuth App (Settings → Developer settings → OAuth Apps):

- **Homepage URL:** `https://chrisjasonmcqueen.com`
- **Authorization callback URL:** `https://decap-oauth.chrisjmcq.workers.dev/callback`

Set Worker secret (the client ID lives in `wrangler.jsonc` as a public var):

```sh
cd workers/decap-oauth
npx wrangler secret put OAUTH_CLIENT_SECRET
```

Edit `wrangler.jsonc` → `vars.ALLOWED_ORIGINS` if you use a different domain.

## Deploy

```sh
cd workers/decap-oauth
npx wrangler deploy
```

## Local dev

```sh
cd workers/decap-oauth
# Put GITHUB_CLIENT_ID / GITHUB_CLIENT_SECRET in .dev.vars
npx wrangler dev
```

## Debugging the "endless loop"

If the `/callback` page sits forever:

1. Open DevTools on the popup → check Console for postMessage errors.
2. Confirm the opener origin (where `/admin` is served) is listed in
   `ALLOWED_ORIGINS`. The Worker only posts back to allowed origins.
3. Confirm the GitHub OAuth App callback URL exactly matches
   `https://decap-oauth.chrisjmcq.workers.dev/callback`.
4. `wrangler tail` to see live logs of the token exchange.
