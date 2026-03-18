import { createFileRoute, useParams } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../kyaf/utils/useAppNavigate';

const ArtistDetailPage = lazy(() =>
  import('../../../kyaf/components/pages/ArtistDetailPage').then((m) => ({ default: m.ArtistDetailPage }))
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

function ArtistDetailPageRoute() {
  const navigate = useAppNavigate();
  const { slug } = useParams({ strict: false }) as { slug: string };
  return <ArtistDetailPage onNavigate={navigate} slug={slug} backPage={undefined} />;
}

export const Route = createFileRoute('/kyaf/artists/$slug')({
  loader: async ({ params }) => {
    const apiBase = process.env.WORDPRESS_KYAF_API_URL;
    const data = await fetchSlugData(params.slug, 'artist', apiBase);
    return { slug: params.slug, wpData: data };
  },
  component: ArtistDetailPageRoute,
});
