# Spec: Static Prerendering + Full SEO Meta Tags

## Problem Statement

The site is a Vite SPA deployed on Hostinger (Apache, no Node runtime). Search engines receive a blank `index.html` until JavaScript executes, making most content invisible to crawlers. The fix is two-part:

1. **Static prerendering** — generate real HTML for every route at build time using `vite-plugin-prerender`
2. **Per-page meta tags** — inject `<title>`, `<meta description>`, Open Graph, Twitter Card, and `<link rel="canonical">` into each prerendered HTML file

---

## Constraints

- Hostinger shared/cloud hosting — Apache only, no Node.js runtime
- Must remain a static file deployment (no server process)
- TanStack Router (file-based) already handles client-side routing
- WP API (`https://content.bkkkapp.com/wp-json/wp/v2`) is available at build time to fetch slugs for dynamic routes
- `.htaccess` already rewrites all requests to `index.html` — prerendered files will be served directly by Apache before the rewrite fires

---

## Approach: `vite-plugin-prerender`

`vite-plugin-prerender` runs a headless browser (Puppeteer) after the Vite build, visits each URL, and saves the rendered HTML. This is the standard approach for Vite SPAs on static hosts.

**Alternative considered and rejected:** `@tanstack/router-plugin` prerender — requires TanStack Start (not set up). `vite-ssg` — requires Vue. Custom Puppeteer script — more maintenance.

---

## Routes to Prerender

### Static routes (always prerendered)
```
/
/bkkk
/bkkk/exhibitions
/bkkk/activities
/bkkk/moving-image
/bkkk/residency
/bkkk/about
/bkkk/about/history
/bkkk/about/vision
/bkkk/team
/bkkk/visit
/bkkk/contact
/bkkk/support
/bkkk/press
/bkkk/shop
/bkkk/blog
/bkkk/archives
/kyaf
/kyaf/exhibitions
/kyaf/activities
/kyaf/residency
/kyaf/about
/kyaf/about/history
/kyaf/about/vision
/kyaf/team
/kyaf/visit
/kyaf/contact
/kyaf/support
/kyaf/press
/kyaf/shop
/kyaf/blog
/kyaf/archives
```

### Dynamic routes (slugs fetched from WP API at build time, fallback to static data files)

| Route pattern | WP endpoint | Fallback static file |
|---|---|---|
| `/bkkk/exhibitions/$slug` | `exhibitions?site=bkkk` | `bkkk/utils/exhibitionsDataNew.ts` (17 slugs) |
| `/bkkk/moving-image/$slug` | `moving-images?site=bkkk` | `bkkk/utils/movingImageData.ts` (7 slugs) |
| `/bkkk/artists/$slug` | `residency-artists?site=bkkk` | `bkkk/utils/residencyData.ts` (10 slugs) |
| `/bkkk/activities/$slug` | `activities?site=bkkk` | `bkkk/utils/activitiesDataNew.ts` (3 slugs) |
| `/kyaf/exhibitions/$slug` | `exhibitions?site=kyaf` | `kyaf/utils/exhibitionsDataNew.ts` (10 slugs) |
| `/kyaf/activities/$slug` | `activities?site=kyaf` | `kyaf/utils/activitiesDataNew.ts` (4 slugs) |
| `/kyaf/artists/$slug` | `residency-artists?site=kyaf` | none (skip if WP empty) |

---

## Meta Tags — Per Page

### Utility: `src/lib/seo.ts`
A `useSEO(meta)` hook that uses `document.title` and injects/updates `<meta>` tags in `<head>` on mount. Works both client-side and is picked up by the prerenderer.

Fields:
```ts
interface SEOMeta {
  title: string;          // "<Page Title> | Bangkok Kunsthalle" or "| Khao Yai Art Forest"
  description: string;
  image?: string;         // absolute URL, defaults to site OG image
  canonical?: string;     // absolute URL for this page
  type?: 'website' | 'article';  // defaults to 'website'
}
```

Tags injected:
- `<title>`
- `<meta name="description">`
- `<meta property="og:title">`
- `<meta property="og:description">`
- `<meta property="og:image">`
- `<meta property="og:url">`
- `<meta property="og:type">`
- `<meta name="twitter:card">` = `summary_large_image`
- `<meta name="twitter:title">`
- `<meta name="twitter:description">`
- `<meta name="twitter:image">`
- `<link rel="canonical">`

### Site defaults
- **BKKK**: title suffix `| Bangkok Kunsthalle`, base URL `https://bkkk.art` (or env var `VITE_BKKK_BASE_URL`)
- **KYAF**: title suffix `| Khao Yai Art Forest`, base URL `https://khaoyaiartforest.com` (or env var `VITE_KYAF_BASE_URL`)
- Default OG image: site hero image (existing figma asset)

### Per-page meta content

**Static pages** — hardcoded strings in each route component:

| Route | Title | Description |
|---|---|---|
| `/` | Bangkok Kunsthalle / Khao Yai Art Forest | Two contemporary art spaces in Thailand |
| `/bkkk` | Bangkok Kunsthalle | Contemporary art space in Bangkok |
| `/bkkk/exhibitions` | Exhibitions | Bangkok Kunsthalle exhibitions |
| `/bkkk/activities` | Activities | Events and activities at Bangkok Kunsthalle |
| `/bkkk/moving-image` | Moving Image | Moving image programs at Bangkok Kunsthalle |
| `/bkkk/residency` | Residency | Artist residency program at Bangkok Kunsthalle |
| `/bkkk/about` | About | About Bangkok Kunsthalle |
| `/bkkk/team` | Team | The team behind Bangkok Kunsthalle |
| `/bkkk/visit` | Visit | How to visit Bangkok Kunsthalle |
| `/bkkk/contact` | Contact | Contact Bangkok Kunsthalle |
| `/kyaf` | Khao Yai Art Forest | Contemporary art space in Khao Yai |
| `/kyaf/exhibitions` | Exhibitions | Khao Yai Art Forest exhibitions |
| `/kyaf/activities` | Activities | Events and activities at Khao Yai Art Forest |
| (etc.) | (pattern follows above) | |

**Dynamic detail pages** — meta derived from fetched data:
- `title`: `{exhibition.title.en} | Bangkok Kunsthalle`
- `description`: `{exhibition.listingSummary.en}` or first 160 chars of content
- `image`: `{exhibition.featuredImage}`
- `canonical`: `https://bkkk.art/bkkk/exhibitions/{slug}`

---

## `robots.txt`

```
User-agent: *
Allow: /

Sitemap: https://bkkk.art/sitemap.xml
Sitemap: https://khaoyaiartforest.com/sitemap.xml
```

## `sitemap.xml`

Generated at build time by a Vite plugin or build script. Lists all static + dynamic URLs with `<lastmod>` = build date. One file covering both sites (or two separate files).

---

## Implementation Steps

1. **Install** `vite-plugin-prerender` (and Puppeteer as peer dep)
2. **Create `scripts/get-prerender-routes.ts`** — fetches slugs from WP API at build time, falls back to static data files, returns full list of URLs to prerender
3. **Update `vite.config.ts`** — add prerender plugin, pass route list from step 2
4. **Create `src/lib/seo.ts`** — `useSEO()` hook
5. **Add `useSEO()` to each static route component** — hardcoded meta per page
6. **Add `useSEO()` to each dynamic detail route** — meta derived from fetched data
7. **Add `public/robots.txt`**
8. **Add sitemap generation** to build script (simple XML output from same slug list)
9. **Add env vars** `VITE_BKKK_BASE_URL` and `VITE_KYAF_BASE_URL` to `.env.example`
10. **Test build** — verify prerendered HTML files contain correct `<title>` and `<meta>` tags
11. **Commit and push**

---

## Acceptance Criteria

- `npm run build` completes without errors
- `dist/bkkk/exhibitions/nine-plus-five-works/index.html` exists and contains `<title>Nine Plus Five Works | Bangkok Kunsthalle</title>`
- `dist/bkkk/index.html` contains correct `og:title`, `og:description`, `og:image`
- `dist/robots.txt` exists
- `dist/sitemap.xml` exists and lists all prerendered URLs
- Curl of any prerendered URL returns HTML with populated `<title>` (not empty)
- Client-side navigation still works after hydration

---

## Known Limitations

- Prerender adds significant build time (Puppeteer visits every URL — ~60–80 pages)
- Dynamic routes that don't exist in WP yet won't be prerendered until next build
- Thai-language meta tags not included in this spec (EN only for now)
