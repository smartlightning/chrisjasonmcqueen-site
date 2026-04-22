// Single source of truth for the shop. Edit prices, copy, and links here.
import { links } from './links';

export interface Product {
  slug: string;
  badge: string;
  title: string;
  tagline: string;
  description: string;
  price: string;
  priceNumber: number;
  cta: string;
  // Stripe Payment Link URL. Create at https://dashboard.stripe.com/payment-links
  // Format: https://buy.stripe.com/XXXXXXXXXXXX
  buyUrl: string;
  accent: string; // tailwind gradient classes
  features: string[];
  faq?: { q: string; a: string }[];
}

export const products: Product[] = [
  {
    slug: 'signature-presets',
    badge: 'Lightroom Presets',
    title: 'Signature Lightroom Presets',
    tagline: 'The 12-preset pack I use to color my weddings & films.',
    description:
      'Cinematic, warm, timeless. Built over years of shooting weddings and projects in mixed light — these are the looks I actually use, not throwaways. One-click in Lightroom Classic, CC, and Mobile.',
    price: '$39',
    priceNumber: 39,
    cta: 'Get the pack',
    buyUrl: links.stripe.presets,
    accent: 'from-amber-200 to-rose-300',
    features: [
      '12 signature presets (6 warm, 4 moody, 2 B&W)',
      'Works in Lightroom Classic, CC & Mobile',
      'Free lifetime updates',
      'PDF install guide included',
    ],
    faq: [
      {
        q: 'Will these work on my photos?',
        a: 'Yes — they\'re built for natural light, but include adjustment notes for indoor/flash. Every preset is a starting point, not a one-click magic button.',
      },
      {
        q: 'Do I need Lightroom?',
        a: 'Yes. Free Lightroom Mobile works for the .DNG versions; Classic/CC for the .XMP versions. Both included.',
      },
    ],
  },
  {
    slug: 'faith-devotional',
    badge: 'Devotional',
    title: '30-Day Faith Devotional',
    tagline: 'One page a day. Real questions, real Scripture.',
    description:
      'A printable PDF devotional drawn from my YouTube series. Each day: a passage, a short reflection, and a question that actually makes you stop. Designed for young adults wrestling with what real faith looks like in 2026.',
    price: '$12',
    priceNumber: 12,
    cta: 'Download now',
    buyUrl: links.stripe.devotional,
    accent: 'from-sky-200 to-indigo-300',
    features: [
      '30 days of guided reflections',
      'Print-ready PDF (A4 + US Letter)',
      'Companion video for each week',
      'Journal prompts included',
    ],
    faq: [
      {
        q: 'What translation do you use?',
        a: 'Mostly ESV, with NIV cross-references where it helps clarity.',
      },
      {
        q: 'Is this for new Christians?',
        a: 'It\'s for anyone — but especially helpful if you\'re coming back to faith or feeling lukewarm.',
      },
    ],
  },
  {
    slug: 'mentorship-call',
    badge: '1-on-1',
    title: 'Mentorship Call',
    tagline: '60 minutes. You bring the questions, I bring the honesty.',
    description:
      'For aspiring photographers, faith creators, or anyone wrestling with calling. We\'ll talk YouTube growth, photography business, faith and creativity — whatever you need. I keep slots limited so each call gets my full focus.',
    price: '$120',
    priceNumber: 120,
    cta: 'Book a call',
    buyUrl: links.cal.mentorship,
    accent: 'from-emerald-200 to-teal-300',
    features: [
      '60 minutes 1-on-1 over Zoom',
      'Pre-call questionnaire so we don\'t waste time',
      'Recording sent to you afterward',
      'Follow-up email with action items',
    ],
    faq: [
      {
        q: 'What kind of people book this?',
        a: 'Mostly young creators starting YouTube channels about faith, or photographers building a wedding business.',
      },
      {
        q: 'Refund policy?',
        a: 'Full refund up to 24h before the call. After that, I\'ll have already prepped — so no.',
      },
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
