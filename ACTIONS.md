# ACTIONS — your launch checklist

Everything you need to do to ship chrisjasonmcqueen.com.
Tackle in order. Tick boxes as you go.

---

## ✅ Already done (by me)

- 13-page Astro site with Apple-style parallax
- Pages: `/`, `/about`, `/watch`, `/weddings`, `/shop`, `/shop/[3 products]`, `/blog`, `/blog/[3 posts]`, `/contact`
- Blog with Astro content collections (markdown files in `src/content/blog/`)
- 3 seed blog posts (lukewarm, phone addiction, weddings) — edit or delete
- Decap CMS scaffolded at `/admin` for browser-based blog writing
- Contact form on `/contact` posting to a Cloudflare Pages Function
- Cloudflare Function at `functions/api/contact.ts` that emails you via Resend
- Shop wired for **Stripe Payment Links** (you create them, I read them from `src/data/products.ts`)
- Watch page pulls 10 of your real YouTube videos with category filter
- All emails point to `chrisjasonmcqueen@icloud.com`
- Placeholder SVGs for every photo slot (replace with real photos when ready)
- SEO: meta, OG, JSON-LD, sitemap, robots.txt
- Build verified — `npm run build` produces 13 clean static pages

---

## 🔥 Phase 1 — Set up the shop with Stripe (15 min)

You said you already have Stripe. Perfect. We're using **Payment Links** — no code, no API keys, works with the static site.

### 1. Create the 2 digital product Payment Links

Go to [dashboard.stripe.com/payment-links](https://dashboard.stripe.com/payment-links) → **+ New**.

For **each** of the two digital products:

- [ ] **Signature Lightroom Presets** — $39
  - Type: One-time
  - Name: "Signature Lightroom Presets"
  - Price: $39 (or whatever currency)
  - **After payment → "Don't show confirmation page" → Show custom URL** → set to a private download link (Dropbox/Google Drive direct link to your `.zip`)
  - OR enable **Stripe's built-in receipts with a download link** by uploading the file under "Customer-facing details"
  - Toggle on: "Collect customer's email" (for order tracking)
- [ ] **30-Day Faith Devotional** — $12
  - Same setup, different file (the PDF)

### 2. Paste the Payment Link URLs

After each product is created, Stripe gives you a URL like `https://buy.stripe.com/abc123xyz`. Open `src/data/products.ts` and replace:

- `https://buy.stripe.com/REPLACE_PRESETS_LINK` → your presets URL
- `https://buy.stripe.com/REPLACE_DEVOTIONAL_LINK` → your devotional URL

### 3. Set up the $120 Mentorship via Cal.com + Stripe

Cal.com handles the calendar **and** charges your Stripe before booking — best UX.

- [ ] Sign up at [cal.com](https://cal.com) (free)
- [ ] Create a **60-minute** event called "Mentorship Call"
- [ ] **Settings → Apps → Stripe → Install** → connect your Stripe account
- [ ] In the event's **Apps** tab, enable Stripe → set price to **$120 USD** (or your currency) → require payment to confirm booking
- [ ] Copy your event URL (something like `https://cal.com/chrisjasonmcqueen/mentorship`)
- [ ] In `src/data/products.ts`, replace the `mentorship-call` `buyUrl` if your Cal.com handle differs

### 4. Optional but recommended — Stripe webhook fulfillment

If you want each Stripe purchase to **automatically** email the buyer the file (instead of relying on Stripe's built-in download), use [Lemonsqueezy](https://lemonsqueezy.com) or [Sellfy](https://sellfy.com) instead — they handle digital fulfillment natively. But for v1, Stripe Payment Links + a manual file link is fine.

---

## ✉️ Phase 2 — Wire up the contact form (10 min)

The form posts to `/api/contact` (a Cloudflare Pages Function). You need to give it a way to send email.

### 5. Create a free Resend account

- [ ] Sign up at [resend.com](https://resend.com) (free 3,000 emails/month, no credit card)
- [ ] Go to **API Keys** → create one → copy it
- [ ] (Optional) Go to **Domains** → add `chrisjasonmcqueen.com` → verify the DNS records they give you in Cloudflare. Until you do this, emails will send from `onboarding@resend.dev`, which works fine.

### 6. Add env vars to Cloudflare Pages (after you deploy)

In your Cloudflare Pages project → **Settings → Environment variables**:

- [ ] `RESEND_API_KEY` = `re_xxx...` (the key you copied)
- [ ] `TO_EMAIL` = `chrisjasonmcqueen@icloud.com`
- [ ] `FROM_EMAIL` = `hello@chrisjasonmcqueen.com` *(only if you verified your domain — otherwise leave unset and it defaults to `onboarding@resend.dev`)*

That's it. The form will start delivering messages to your iCloud inbox.

---

## 📓 Phase 3 — Browser blog editor (Decap CMS) (15 min)

Decap CMS lets you write blog posts at `chrisjasonmcqueen.com/admin` from any browser, including your phone. It commits markdown files directly to your GitHub repo, which auto-deploys.

### 7. Set up GitHub OAuth proxy

Decap needs an OAuth proxy to authenticate. Easiest free path:

- [ ] Go to GitHub → **Settings → Developer settings → OAuth Apps → New**
  - Application name: `chrisjasonmcqueen-cms`
  - Homepage URL: `https://chrisjasonmcqueen.com`
  - Authorization callback URL: `https://decap-proxy.YOUR-USERNAME.workers.dev/callback` *(you'll get this URL in the next step)*
- [ ] Copy the **Client ID** and **Client Secret**
- [ ] Deploy the free [Decap OAuth proxy on Cloudflare Workers](https://github.com/sterlingwes/decap-proxy):
  ```bash
  git clone https://github.com/sterlingwes/decap-proxy
  cd decap-proxy
  npm install
  npx wrangler secret put GITHUB_CLIENT_ID      # paste Client ID
  npx wrangler secret put GITHUB_CLIENT_SECRET  # paste Client Secret
  npx wrangler deploy
  ```
- [ ] Wrangler prints your worker URL (e.g. `https://decap-proxy.you.workers.dev`). Go back to GitHub OAuth App and update the callback URL to `https://decap-proxy.you.workers.dev/callback`
- [ ] Open `public/admin/config.yml` and:
  - Replace `YOUR_GITHUB_USERNAME` with your actual GitHub username
  - Add this line under `backend:`
    ```yaml
    base_url: https://decap-proxy.you.workers.dev
    auth_endpoint: /auth
    ```

### 8. Use it

- [ ] Visit `https://chrisjasonmcqueen.com/admin` → Login with GitHub → write posts
- [ ] Posts go through "draft → in review → published" workflow (you can disable that — set `publish_mode` to nothing in `config.yml`)

**Don't want the CMS hassle?** Skip Phase 3 entirely. Just write `.md` files in `src/content/blog/` and `git push`. The CMS is purely optional convenience.

---

## 🚀 Phase 4 — Deploy (30 min)

### 9. Push to GitHub

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/chrisjasonmcqueen-site.git
git push -u origin main
```

### 10. Deploy on Cloudflare Pages

- [ ] [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo
- [ ] Build settings:
  - Framework: **Astro**
  - Build command: `npm run build`
  - Output directory: `dist`
  - Environment variable: `NODE_VERSION` = `20`
- [ ] Save & Deploy → live in ~60s at `your-project.pages.dev`
- [ ] Now go back to **Phase 2 step 6** and add your Resend env vars

### 11. Connect chrisjasonmcqueen.com

- [ ] In Cloudflare → **Add a site** → enter your domain → Free plan
- [ ] Replace nameservers at your registrar with Cloudflare's
- [ ] Wait for DNS (5–60 min)
- [ ] In Pages project → **Custom domains** → add `chrisjasonmcqueen.com` AND `www.chrisjasonmcqueen.com`
- [ ] Free SSL automatic. Done.

### 12. Custom domain email (optional)

- [ ] Cloudflare → your domain → **Email → Email Routing** → Enable
- [ ] Forward `hello@chrisjasonmcqueen.com` → `chrisjasonmcqueen@icloud.com`

---

## 📸 Phase 5 — Replace placeholder photos (20 min)

- [ ] Drop real JPGs into `public/images/` with these names:
  - `hero.jpg`, `story.jpg`, `about.jpg`, `weddings-hero.jpg`
  - `work-1.jpg` through `work-8.jpg`
  - `og.jpg` (1200×630 social share image)
- [ ] Compress at [squoosh.app](https://squoosh.app) — target ~300KB each
- [ ] Then run this in the project root to update all references at once:
  ```bash
  grep -rl "/images/.*\.svg\|og\.svg" src/ | xargs sed -i '' 's/\.svg/.jpg/g'
  ```
- [ ] Delete the placeholder SVGs in `public/images/` (keep `public/images/shop/*.svg` if you want, or replace with product screenshots)

---

## 📝 Phase 6 — Real content (this week)

- [ ] Replace placeholder copy in `src/components/Story.astro`, `src/pages/about.astro`, `src/pages/weddings.astro` (especially the wedding package prices — I guessed)
- [ ] Edit/delete the 3 seed blog posts in `src/content/blog/`
- [ ] Build the actual digital products:
  - [ ] Export 12 Lightroom `.xmp` presets, zip them with a 1-page PDF install guide
  - [ ] Write the 30-day devotional PDF (pull from your video scripts — 5 mornings of work)
- [ ] Pin a YouTube community post linking to `/shop`
- [ ] Add `chrisjasonmcqueen.com` to your YouTube channel banner + every video description

---

## 🛠 Phase 7 — Polish (whenever)

- [ ] Real testimonials section on `/weddings`
- [ ] Hook up [Plausible](https://plausible.io) or [Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/) (free)
- [ ] Add a newsletter signup popup with [Buttondown](https://buttondown.email)
- [ ] Convert blog post images to optimized `<Image />` (ask me to refactor)

---

## 📁 Where things live

| What | File |
|---|---|
| Headline on homepage | `src/components/Hero.astro` |
| About copy | `src/pages/about.astro` |
| Wedding packages & prices | `src/pages/weddings.astro` (`packages` array) |
| Add/edit a shop product | `src/data/products.ts` |
| Stripe Payment Link URLs | `src/data/products.ts` (`buyUrl` per product) |
| Featured / list of videos | `src/data/videos.ts` |
| Write a blog post | `src/content/blog/your-post.md` *(or use `/admin` once Phase 3 done)* |
| Contact form fields | `src/pages/contact.astro` |
| Contact email backend | `functions/api/contact.ts` |
| Decap CMS config | `public/admin/config.yml` |
| Site colors / fonts | `tailwind.config.mjs` + `src/styles/global.css` |
| Nav links | `src/components/Nav.astro` |

---

## 🧪 Local development

```bash
npm install
npm run dev         # http://localhost:4321
npm run build
npm run preview     # serves /dist locally
```

**Test the contact form locally:** the Cloudflare Function only runs in production (or via `wrangler pages dev`). Locally, the form will hit a 404 — that's expected. Test it after deploying.

To test functions locally too:
```bash
npm install -g wrangler
npm run build
wrangler pages dev dist
```

---

Built with care. Soli Deo gloria.
