import { createFileRoute, useParams } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../kyaf/utils/useAppNavigate';
import { useSEO, kyafMeta } from '../../../lib/seo';
import { useActivityBySlug } from '../../../lib/useWPData';

const ActivityDetailPage = lazy(() =>
  import('../../../kyaf/components/pages/ActivityDetailPage').then((m) => ({ default: m.ActivityDetailPage }))
);

// Loader: fetches from WordPress REST API if env var is set, falls back to mock data.
// Set WORDPRESS_KYAF_API_URL on the server to enable live data.
async function fetchSlugData(slug: string, type: string, apiBase: string | undefined) {
  if (!apiBase) return null;
  try {
    const endpoint = type === 'post' ? 'posts' : type === 'artist' ? 'artists' : `${type}s`;
    const res = await fetch(`${apiBase}/wp-json/wp/v2/${endpoint}?slug=${slug}&_embed`);
    if (!res.ok) return null;
    const data = await res.json();
    return data?.[0] ?? null;
  } catch {
    return null;
  }
}

function ActivityDetailPageRoute() {
  const navigate = useAppNavigate();
  const { slug } = useParams({ strict: false }) as { slug: string };
  const { data } = useActivityBySlug(slug, 'kyaf');
  const name = (data as any)?.title?.en ?? (data as any)?.name ?? slug;
  const desc = (data as any)?.listingSummary?.en ?? (data as any)?.bio ?? '';
  const img = (data as any)?.featuredImage ?? undefined;
  useSEO(kyafMeta(name, typeof desc === 'string' ? desc.replace(/<[^>]+>/g, '').slice(0, 160) : '', { path: `/kyaf/activities/${slug}`, image: img, type: 'article' }));
  return <ActivityDetailPage onNavigate={navigate} slug={slug || 'neon-reveries'} backPage={undefined} />;
}

export const Route = createFileRoute('/kyaf/activities/$slug')({
  loader: async ({ params }) => {
    const apiBase = import.meta.env.VITE_WP_BASE_URL;
    const data = await fetchSlugData(params.slug, 'activity', apiBase);
    return { slug: params.slug, wpData: data };
  },
  component: ActivityDetailPageRoute,
});
