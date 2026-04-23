# Private downloads served from /downloads/<unguessable-filename>

These files are linked only from post-payment thank-you pages (e.g.
`/shop/pocket-faith-wallpapers/thanks`). The filenames include a random suffix
so they're not guessable, and they're not referenced anywhere else on the site.

## How to add the wallpaper ZIP

1. Build your zip locally (8 wallpapers + an install guide if you want).
2. Save it here as **exactly** this filename:

       pocket-faith-wallpapers-JQRKYu5FXWJYPUmg.zip

3. Commit + deploy. The thank-you page links to this exact filename.

## Rotating the filename

If a link ever leaks, generate a new random suffix and rename:

```sh
node -e "console.log(require('crypto').randomBytes(12).toString('base64url'))"
# rename the file in public/downloads/
# update the href in src/pages/shop/pocket-faith-wallpapers/thanks.astro
# delete the old file
```

Old buyers who saved the link will get a 404 — they can email you for a fresh
link.
