# SEO Improvements

Ranked by impact.

## 1. Fix `lang=""` on `<html>` — trivial, high impact
`index.html:2` has an empty `lang` attribute. Search engines use this for language targeting.
```html
<html lang="en">
```

## 2. Add `<meta name="description">` — directly affects click-through rate
This is the text shown under your title in Google results. Currently missing entirely.
```html
<meta name="description" content="Practice blackjack basic strategy and card counting with real-time feedback, Illustrious 18 deviations, and session tracking.">
```

## 3. Open Graph + Twitter Card tags — social sharing
When someone shares the link, platforms use these to generate previews. Use `blackjack-strategy-trainer-logo.jpg` as `og:image`.
```html
<meta property="og:title" content="Blackjack Strategy Trainer">
<meta property="og:description" content="Practice blackjack basic strategy and card counting with real-time feedback, Illustrious 18 deviations, and session tracking.">
<meta property="og:image" content="https://blackjackstrategytrainer.com/blackjack-strategy-trainer-logo.jpg">
<meta property="og:url" content="https://blackjackstrategytrainer.com">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
```

## 4. Dynamic page title per route — per-page identity
The title is hardcoded as `"BlackJack Trainer"` for every page. Use Vue Router's `afterEach` hook to set distinct titles:
```ts
router.afterEach((to) => {
  document.title = to.meta.title as string ?? 'Blackjack Strategy Trainer'
})
```
And add `meta: { title: '...' }` to each route definition.

## 5. `robots.txt` + `sitemap.xml` in `/public/` — crawler guidance
Crawlers are left guessing without these. `/finishSignUp` should be excluded from the sitemap.

**`/public/robots.txt`**
```
User-agent: *
Allow: /
Disallow: /finishSignUp

Sitemap: https://blackjackstrategytrainer.com/sitemap.xml
```

**`/public/sitemap.xml`**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://blackjackstrategytrainer.com/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://blackjackstrategytrainer.com/game</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

## 6. JSON-LD structured data — rich results eligibility
Add to the landing page `<head>` to make the app eligible for rich result features (ratings, category, etc.).
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Blackjack Strategy Trainer",
  "description": "Practice blackjack basic strategy and card counting with real-time feedback.",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web",
  "url": "https://blackjackstrategytrainer.com"
}
</script>
```

## 7. Prerender the landing page — biggest SPA-specific concern
Because it's a Vue SPA, Googlebot sees an empty `<div id="app"></div>` before JavaScript runs. This makes all the above improvements less effective for `/`.

**Recommended approach:** `vite-ssg` or `vite-plugin-prerender` — generates static HTML at build time, no server needed, works with Firebase Hosting.

```bash
npm install -D vite-ssg
```

Without prerendering, the landing page content may not be indexed reliably.
