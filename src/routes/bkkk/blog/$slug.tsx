import { createFileRoute, useParams } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../bkkk/utils/useAppNavigate';

const BlogDetailPage = lazy(() =>
  import('../../../bkkk/components/pages/BlogDetailPage').then((m) => ({ default: m.BlogDetailPage }))
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

function BlogDetailPageRoute() {
  const navigate = useAppNavigate();
  const { slug } = useParams({ strict: false }) as { slug: string };
  return <BlogDetailPage onNavigate={navigate} slug={slug || 'art-as-reflection'} />;
}

export const Route = createFileRoute('/bkkk/blog/$slug')({
  loader: async ({ params }) => {
    const apiBase = import.meta.env.VITE_WP_BASE_URL;
    const data = await fetchSlugData(params.slug, 'post', apiBase);
    return { slug: params.slug, wpData: data };
  },
  component: BlogDetailPageRoute,
});
