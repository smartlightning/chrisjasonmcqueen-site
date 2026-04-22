# chrisjasonmcqueen.com

Apple-style personal site for **Chris Jason McQueen** — photographer, YouTube creator, believer.
Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com). Hosted free on **Cloudflare Pages**.

---

## What's in here

- `src/pages/index.astro` — single-page site
- `src/components/` — Hero, Story, YouTube, Photography, Shop, Connect, Footer, Nav
- `src/layouts/Base.astro` — `<head>` + parallax/reveal scripts
- `src/styles/global.css` — Apple-ish typography & helpers
- `public/images/` — drop your photos here (see `images/README.txt`)
- `public/_headers` — Cloudflare cache + security headers
- `public/robots.txt` — SEO

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs ./dist
npm run preview  # preview prod build
```

---

## 1. Add your content (10 minutes)

### Photos
Drop these into `public/images/` (see `public/images/README.txt`):

- `hero.jpg` — big atmospheric portrait or wide cinematic shot
- `story.jpg` — softer behind-the-scenes shot
- `work-1.jpg` … `work-6.jpg` — portfolio grid

Compress with [squoosh.app](https://squoosh.app) before committing — keep each under ~400KB.

### OG share image
`public/og.jpg` (1200x630). Used when your link is shared on social.

### Email signup
In `src/components/Connect.astro`, replace the form `action` with your provider:

- **[Buttondown](https://buttondown.email)** — free up to 100 subs, simplest. URL is `https://buttondown.email/api/emails/embed-subscribe/YOUR_USERNAME`
- **[ConvertKit](https://convertkit.com)** — free up to 10k subs, best for creators
- **[Beehiiv](https://beehiiv.com)** — free up to 2.5k, best newsletter UX

### Email address
Search/replace `hello@chrisjasonmcqueen.com` with whatever you want.
For a free custom-domain inbox: **Cloudflare Email Routing** forwards `you@chrisjasonmcqueen.com` to your Gmail at zero cost (set up in step 3 below).

### Shop products
Currently in `src/components/Shop.astro` as static cards. When you're ready to actually sell:

- **[Gumroad](https://gumroad.com)** — easiest. Free. Just paste your Gumroad product URL into each card's `href`.
- **[Lemon Squeezy](https://lemonsqueezy.com)** — better for digital products, handles VAT.
- **[Stan.store](https://stan.store)** — for the mentorship calls (built-in calendar).
- For booking calls: link the third card to **[Cal.com](https://cal.com)** (free).

---

## 2. Deploy to Cloudflare Pages (free)

Cloudflare Pages = unlimited bandwidth, free SSL, global CDN, free custom domains. Best free host in 2026.

### Option A — Via GitHub (recommended, auto-deploys on push)

1. Create a free GitHub account if you don't have one.
2. Create a new repo and push this folder:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/chrisjasonmcqueen-site.git
   git push -u origin main
   ```
3. Sign up at [dash.cloudflare.com](https://dash.cloudflare.com) (free).
4. Go to **Workers & Pages → Create → Pages → Connect to Git**.
5. Select your repo. Use these build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Node version:** `20` (set under Settings → Environment variables → `NODE_VERSION=20`)
6. Click **Save and Deploy**. Done — live in ~60 seconds at `your-project.pages.dev`.

### Option B — Direct upload (no GitHub)

```bash
npm install -g wrangler
npm run build
wrangler pages deploy dist --project-name=chrisjasonmcqueen
```

---

## 3. Connect chrisjasonmcqueen.com (free)

### A. Move DNS to Cloudflare (best path — free everything)
1. In Cloudflare dashboard → **Add a site** → enter `chrisjasonmcqueen.com` → Free plan.
2. Cloudflare gives you 2 nameservers. Log into your domain registrar (where you bought the domain) and replace its nameservers with Cloudflare's.
3. Wait 5–60 mins for DNS to propagate.

### B. Point the domain at your Pages site
1. In Cloudflare → **Workers & Pages** → your project → **Custom domains** → **Set up a custom domain**.
2. Enter `chrisjasonmcqueen.com` and `www.chrisjasonmcqueen.com`. Cloudflare auto-creates the DNS records and provisions free SSL.
3. Done. Site is live on your domain with HTTPS.

### C. Free custom-domain email
1. Cloudflare → your domain → **Email → Email Routing** → Enable.
2. Add `hello@chrisjasonmcqueen.com` → forward to your personal Gmail/iCloud.
3. To **send from** that address, use Gmail's "Send mail as" with [SendLayer](https://sendlayer.com) free tier or just use your personal email and tell people to write to `hello@`.

---

## 4. Suggested digital products (rationale)

The 3 product cards on the site are deliberately chosen to monetize your two audiences:

| Product | Why it works | Cheapest way to sell |
|---|---|---|
| **Signature Lightroom Presets** ($29–49) | Highest margin. Photographers who admire your wedding work will buy. | Gumroad — upload `.xmp` files in a zip |
| **30-Day Faith Devotional PDF** ($9–19) | Direct conversion from YouTube subscribers. Low friction. | Gumroad / Stan.store |
| **1-on-1 Mentorship Call** ($120–250) | Highest dollar per hour. Filters serious people. | Cal.com (free) + Stripe |

**Future products to consider:**
- "The Faith-Centered Wedding Guide" PDF ($24) — bundles both niches
- A YouTube starter kit for Christian creators ($79) — leverages your channel authority
- Print-on-demand fine-art prints via [Printful](https://printful.com) — passive

---

## 5. Editing tips

- **Change the headline:** `src/components/Hero.astro`
- **Change the about copy:** `src/components/Story.astro`
- **Change products:** edit the `products` array at the top of `src/components/Shop.astro`
- **Change colors/fonts:** `tailwind.config.mjs` and `src/styles/global.css`
- **Add a blog:** create `src/pages/blog/[...slug].astro` — Astro's content collections are perfect for this. Ask me.

---

## 6. Performance notes

- Site is static HTML + ~5KB of JS for parallax. Lighthouse 100/100 if your photos are compressed.
- Parallax respects `prefers-reduced-motion`.
- All images are CSS backgrounds — for best perf consider converting to `<img>` with Astro's `<Image />` component once you add real photos. Ask me to refactor when you're ready.

---

Built with care. Soli Deo gloria.
