// Generates SVG placeholder images for hero/story/work/about/weddings/shop.
// Run: node scripts/gen-placeholders.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

function svg({ w, h, label, gradient, dark = false }) {
  const fg = dark ? '#fbfbfd' : '#1d1d1f';
  const sub = dark ? 'rgba(251,251,253,0.55)' : 'rgba(29,29,31,0.5)';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      ${gradient.map((c, i) => `<stop offset="${i / (gradient.length - 1)}" stop-color="${c}"/>`).join('\n      ')}
    </linearGradient>
    <radialGradient id="r" cx="50%" cy="40%" r="60%">
      <stop offset="0" stop-color="rgba(255,255,255,0.35)"/>
      <stop offset="1" stop-color="rgba(255,255,255,0)"/>
    </radialGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#g)"/>
  <rect width="${w}" height="${h}" fill="url(#r)"/>
  <g font-family="-apple-system, BlinkMacSystemFont, Inter, sans-serif" text-anchor="middle">
    <text x="${w / 2}" y="${h / 2 - 10}" font-size="${Math.round(w * 0.045)}" font-weight="600" fill="${fg}" letter-spacing="-1">${label}</text>
    <text x="${w / 2}" y="${h / 2 + 30}" font-size="${Math.round(w * 0.018)}" fill="${sub}" letter-spacing="2">PLACEHOLDER · REPLACE IN /public/images</text>
  </g>
</svg>`;
}

const out = (path, content) => {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
  console.log('wrote', path);
};

// Big atmospheric images
out('public/images/hero.jpg.svg', svg({ w: 2400, h: 1600, label: 'Hero', gradient: ['#1a1a1f', '#3a2c2c', '#7a4a3a'], dark: true }));
out('public/images/story.jpg.svg', svg({ w: 2000, h: 1400, label: 'Story', gradient: ['#fbfbfd', '#e7dcc8', '#c9b89a'] }));
out('public/images/about.jpg.svg', svg({ w: 1200, h: 1500, label: 'Portrait', gradient: ['#2a2620', '#5a4a3a', '#a98b6a'], dark: true }));
out('public/images/weddings-hero.jpg.svg', svg({ w: 2400, h: 1600, label: 'Weddings', gradient: ['#1f1a1a', '#4a2f33', '#a87a7a'], dark: true }));

// Portfolio grid
const palettes = [
  ['#2a2a32', '#5a4252'],
  ['#dcd1c2', '#b59c7a'],
  ['#1f2a2a', '#3a5a52'],
  ['#3a2a2a', '#a87a72'],
  ['#e3d8cb', '#c9a98a'],
  ['#262626', '#7a6a5a'],
  ['#1a1f2a', '#5a728a'],
  ['#3a2a3a', '#a88aa8'],
];
for (let i = 1; i <= 8; i++) {
  out(`public/images/work-${i}.jpg.svg`, svg({ w: 1600, h: 1200, label: `Work ${i}`, gradient: palettes[i - 1], dark: true }));
}

// Shop product visuals
out('public/images/shop/presets.svg', svg({ w: 1000, h: 1000, label: 'Presets', gradient: ['#fde7c8', '#f0a98c'] }));
out('public/images/shop/devotional.svg', svg({ w: 1000, h: 1000, label: 'Devotional', gradient: ['#cfe1f5', '#7a8ed4'] }));
out('public/images/shop/mentorship.svg', svg({ w: 1000, h: 1000, label: 'Mentorship', gradient: ['#bfe6d4', '#5fb89a'] }));

// OG image
out('public/og.jpg.svg', svg({ w: 1200, h: 630, label: 'Chris Jason McQueen', gradient: ['#1a1a1f', '#3a2c2c', '#7a4a3a'], dark: true }));

console.log('done');
