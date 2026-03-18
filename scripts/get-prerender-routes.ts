/**
 * Returns the full list of URLs to prerender.
 * Fetches dynamic slugs from the WP API at build time;
 * falls back to static data files if the API is unreachable.
 */

const WP_BASE =
  process.env.VITE_WP_BASE_URL ?? 'https://content.bkkkapp.com/wp-json/wp/v2';

// ─── Static fallback slugs ────────────────────────────────────────────────────

const FALLBACK_BKKK_EXHIBITIONS = [
  'nine-plus-five-works', 'nostalgia-for-unity', 'mend-piece',
  'like-nouns-slipping-into-verbs', 'calligraphic-abstraction',
  'liminal-signals', 'the-weight-of-light', 'echoes-in-form',
  'between-the-lines', 'surface-tension', 'material-witness',
  'the-archive-speaks', 'soft-geometries', 'field-notes',
  'after-the-fact', 'common-ground', 'open-system',
];

const FALLBACK_KYAF_EXHIBITIONS = [
  'forest-as-canvas', 'roots-and-routes', 'the-living-archive',
  'soil-memory', 'canopy-light', 'watershed', 'understory',
  'seasonal-marks', 'edge-habitat', 'rewilding',
];

const FALLBACK_BKKK_MOVING_IMAGE = [
  'a-very-long-gif', 'signal-noise', 'loop-studies',
  'transmission', 'still-moving', 'frame-by-frame', 'afterimage',
];

const FALLBACK_BKKK_ARTISTS = [
  'upcoming-artist-2026', 'artist-in-residence-2025',
  'past-resident-2024', 'past-resident-2023',
];

const FALLBACK_BKKK_ACTIVITIES = [
  'concrete-ghosts', 'club-pluto', 'tagteams-2026',
];

const FALLBACK_KYAF_ACTIVITIES = [
  'k-bar-experience', 'bamboo-journey', 'forest-table', 'forest-print',
];

// ─── WP fetch helper ─────────────────────────────────────────────────────────

async function fetchSlugs(cpt: string, site: string): Promise<string[]> {
  try {
    const url = `${WP_BASE}/${cpt}?per_page=100&meta_query[0][key]=site&meta_query[0][value]=${site}`;
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const posts: Array<{ slug: string }> = await res.json();
    return posts.map(p => p.slug).filter(Boolean);
  } catch {
    return [];
  }
}

// ─── Static routes ────────────────────────────────────────────────────────────

const STATIC_ROUTES = [
  '/',
  '/bkkk',
  '/bkkk/exhibitions',
  '/bkkk/activities',
  '/bkkk/moving-image',
  '/bkkk/residency',
  '/bkkk/about',
  '/bkkk/about/history',
  '/bkkk/about/vision',
  '/bkkk/team',
  '/bkkk/visit',
  '/bkkk/contact',
  '/bkkk/support',
  '/bkkk/press',
  '/bkkk/shop',
  '/bkkk/blog',
  '/bkkk/archives',
  '/kyaf',
  '/kyaf/exhibitions',
  '/kyaf/activities',
  '/kyaf/residency',
  '/kyaf/about',
  '/kyaf/about/history',
  '/kyaf/about/vision',
  '/kyaf/team',
  '/kyaf/visit',
  '/kyaf/contact',
  '/kyaf/support',
  '/kyaf/press',
  '/kyaf/shop',
  '/kyaf/blog',
  '/kyaf/archives',
];

// ─── Main export ──────────────────────────────────────────────────────────────

export async function getPrerenderRoutes(): Promise<string[]> {
  console.log('[prerender] Fetching dynamic slugs from WP API...');

  const [
    bkkkExhibitions,
    kyafExhibitions,
    bkkkMovingImage,
    bkkkArtists,
    kyafArtists,
    bkkkActivities,
    kyafActivities,
  ] = await Promise.all([
    fetchSlugs('exhibitions', 'bkkk'),
    fetchSlugs('exhibitions', 'kyaf'),
    fetchSlugs('moving-images', 'bkkk'),
    fetchSlugs('residency-artists', 'bkkk'),
    fetchSlugs('residency-artists', 'kyaf'),
    fetchSlugs('activities', 'bkkk'),
    fetchSlugs('activities', 'kyaf'),
  ]);

  const use = (fetched: string[], fallback: string[]) =>
    fetched.length > 0 ? fetched : fallback;

  const dynamic = [
    ...use(bkkkExhibitions, FALLBACK_BKKK_EXHIBITIONS).map(s => `/bkkk/exhibitions/${s}`),
    ...use(kyafExhibitions, FALLBACK_KYAF_EXHIBITIONS).map(s => `/kyaf/exhibitions/${s}`),
    ...use(bkkkMovingImage, FALLBACK_BKKK_MOVING_IMAGE).map(s => `/bkkk/moving-image/${s}`),
    ...use(bkkkArtists, FALLBACK_BKKK_ARTISTS).map(s => `/bkkk/artists/${s}`),
    ...use(kyafArtists, []).map(s => `/kyaf/artists/${s}`),
    ...use(bkkkActivities, FALLBACK_BKKK_ACTIVITIES).map(s => `/bkkk/activities/${s}`),
    ...use(kyafActivities, FALLBACK_KYAF_ACTIVITIES).map(s => `/kyaf/activities/${s}`),
  ];

  const all = [...STATIC_ROUTES, ...dynamic];
  console.log(`[prerender] ${all.length} routes total (${dynamic.length} dynamic)`);
  return all;
}
