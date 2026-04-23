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
  originalPrice?: string; // shown struck-through next to `price` when present
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
    slug: 'pocket-faith-wallpapers',
    badge: 'Wallpapers',
    title: 'Pocket Faith Wallpapers',
    tagline: 'A quiet anchor, right there in your pocket.',
    description:
      'I created these wallpapers during a season when I felt spiritually low. Every time I picked up my phone, I was bombarded with news, notifications, and stress. It felt like my phone was pulling me away from God. But I asked myself: what if picking up my phone actually helped me connect with God\'s word? So I began designing wallpapers — with my photography and verses from Scripture — to fill that space with truth, peace, and reminders of God\'s presence.',
    price: '€8',
    priceNumber: 8,
    originalPrice: '€17',
    cta: 'Download now',
    buyUrl: links.stripe.wallpapers,
    accent: 'from-sky-200 to-indigo-300',
    features: [
      '8 high-resolution, lockscreen-ready wallpapers',
      'Each features minimalist Scripture and calming visuals',
      'Designed to help you stay spiritually grounded in the digital world',
      'Set them as your lock screen, and let every day start with Scripture',
    ],
    faq: [
      {
        q: 'What devices do these work on?',
        a: 'They\'re sized for modern iPhone and Android lockscreens (1170x2532 and similar). They also look great on most smartphones from the last 5 years.',
      },
      {
        q: 'How do I install them?',
        a: 'Download the ZIP, save the images to your photos, and set one as your lock screen wallpaper. A short install guide is included in the download.',
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
