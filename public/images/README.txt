# Drop your real photos here, then commit them.
#
# Until you do, every photo slot on the site renders as an elegant gradient
# blank (warm/light/cool tones) — the site looks intentional, just photo-free.
#
# ─── To use a real photo in a section ──────────────────────────────────────
#
# 1. Save your photo here. Recommended names:
#
#       hero.jpg              homepage big background     (~2400x1600)
#       story.jpg             homepage story section      (~2000x1400)
#       about.jpg             portrait on /about          (~1200x1500, vertical)
#       weddings-hero.jpg     /weddings hero              (~2400x1600)
#       work-1.jpg ... work-8.jpg   portfolio grid        (varied)
#
#       og.jpg                social share image          (1200x630, in /public NOT /public/images)
#
#       blog/<post-slug>.jpg  cover image per blog post   (~1600x900)
#
# 2. Reference it in the relevant component / page. The components currently
#    render `<div class="photo-blank ...">`. Replace that with:
#
#       <div class="bg-cover bg-center"
#            style="background-image: url('/images/hero.jpg')"></div>
#
#    OR (recommended) wait until you're ready and I'll refactor every section
#    to use Astro's optimized <Image /> component in one pass.
#
# 3. Compress photos at https://squoosh.app — target ~300KB each, JPG/WEBP, sRGB.
#
# ─── Where each photo shows up ─────────────────────────────────────────────
#
#   src/components/Hero.astro          → hero.jpg
#   src/components/Story.astro         → story.jpg
#   src/components/Photography.astro   → work-1..6.jpg
#   src/pages/about.astro              → about.jpg
#   src/pages/weddings.astro           → weddings-hero.jpg, work-1..8.jpg
#   src/content/blog/*.md              → set `image: /images/blog/<file>.jpg` in frontmatter
#
