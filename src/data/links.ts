// Centralized external links. Update these once your real URLs are ready.
//
// Each value is a DEMO URL right now — clickable but not functional.
// Replace each with your real URL when:
//   • Stripe Payment Links: created in https://dashboard.stripe.com/payment-links
//   • Cal.com events:       created in https://cal.com
//   • Buttondown:           created in https://buttondown.email

export const links = {
  // ─── YouTube ────────────────────────────────────────────────
  youtube: {
    channel: 'https://youtube.com/@chrisjasonmcqueen',
    subscribe: 'https://youtube.com/@chrisjasonmcqueen?sub_confirmation=1',
    videos: 'https://youtube.com/@chrisjasonmcqueen/videos',
  },

  // ─── Cal.com booking links ──────────────────────────────────
  // Demo handle is `chrisjasonmcqueen` — change if yours differs.
  cal: {
    intro: 'https://cal.eu/chris-jason-mcqueen/free-intro-call',         // free 15-min intro call
    mentorship: 'https://cal.eu/chris-jason-mcqueen/faith-mentoring', // paid 60-min ($120 via Stripe)
  },

  // ─── Stripe Payment Links ───────────────────────────────────
  // Replace with the real https://buy.stripe.com/xxxxx once created.
  stripe: {
    presets: 'https://buy.stripe.com/test_demo_presets_39',
    wallpapers: 'https://buy.stripe.com/3cI7sL2W3bQada97A68N200',
  },

  // ─── Newsletter (Buttondown) ────────────────────────────────
  buttondown: {
    // Replace `chrisjasonmcqueen` with your Buttondown username
    embedAction: 'https://buttondown.email/api/emails/embed-subscribe/chrisjasonmcqueen',
  },

  // ─── Email ──────────────────────────────────────────────────
  email: 'chrisjasonmcqueen@icloud.com',
} as const;
