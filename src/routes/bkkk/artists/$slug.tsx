import { createFileRoute, useParams } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../bkkk/utils/useAppNavigate';
import { useSEO, bkkkMeta } from '../../../lib/seo';
import { useResidencyArtistBySlug } from '../../../lib/useWPData';

const ArtistDetailPage = lazy(() =>
  import('../../../bkkk/components/pages/ArtistDetailPage').then((m) => ({ default: m.ArtistDetailPage }))
);

// Loader: fetches from WordPress REST API if env var is set, falls back to mock data.
// Set WORDPRESS_BKKK_API_URL on the server to enable live data.
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

function ArtistDetailPageRoute() {
  const navigate = useAppNavigate();
  const { slug } = useParams({ strict: false }) as { slug: string };
  const { data } = useResidencyArtistBySlug(slug);
  const name = (data as any)?.title?.en ?? (data as any)?.name ?? slug;
  const desc = (data as any)?.listingSummary?.en ?? (data as any)?.bio ?? '';
  const img = (data as any)?.featuredImage ?? undefined;
  useSEO(bkkkMeta(name, typeof desc === 'string' ? desc.replace(/<[^>]+>/g, '').slice(0, 160) : '', { path: `/bkkk/artists/${slug}`, image: img, type: 'article' }));
  return <ArtistDetailPage onNavigate={navigate} slug={slug} backPage={undefined} />;
}

export const Route = createFileRoute('/bkkk/artists/$slug')({
  loader: async ({ params }) => {
    const apiBase = import.meta.env.VITE_WP_BASE_URL;
    const data = await fetchSlugData(params.slug, 'artist', apiBase);
    return { slug: params.slug, wpData: data };
  },
  component: ArtistDetailPageRoute,
});
