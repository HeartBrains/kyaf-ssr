const WP_BASE = import.meta.env.VITE_WP_BASE_URL ?? 'https://content.bkkkapp.com/wp-json/wp/v2';

export type WPSite = 'bkkk' | 'kyaf';

export interface WPRawPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  meta: Record<string, string>;
}

/**
 * Fetch a list of CPT records filtered by site.
 * Meta fields are returned under the `meta` key (JetEngine exposes them via show_in_rest).
 */
export async function fetchCPT(
  cptSlug: string,
  site: WPSite,
  perPage = 100,
): Promise<WPRawPost[]> {
  const url = new URL(`${WP_BASE}/${cptSlug}`);
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('meta_query[0][key]', 'site');
  url.searchParams.set('meta_query[0][value]', site);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`WP API error ${res.status} for ${cptSlug}`);
  return res.json();
}

/**
 * Fetch a single CPT record by slug.
 */
export async function fetchCPTBySlug(
  cptSlug: string,
  slug: string,
): Promise<WPRawPost | null> {
  const url = `${WP_BASE}/${cptSlug}?slug=${encodeURIComponent(slug)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`WP API error ${res.status} for ${cptSlug}/${slug}`);
  const data: WPRawPost[] = await res.json();
  return data[0] ?? null;
}
