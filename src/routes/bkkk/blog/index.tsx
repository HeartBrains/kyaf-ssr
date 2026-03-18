import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../bkkk/utils/useAppNavigate';
import { useSEO, bkkkMeta } from '../../../lib/seo';

const BlogPage = lazy(() =>
  import('../../../bkkk/components/pages/BlogPage').then((m) => ({ default: m.BlogPage }))
);

function BlogPageRoute() {
  useSEO(bkkkMeta('Blog', 'Articles and writing from Bangkok Kunsthalle.', { path: '/bkkk/blog' }));
  const navigate = useAppNavigate();
  return <BlogPage onNavigate={navigate} />;
}

export const Route = createFileRoute('/bkkk/blog/')({ component: BlogPageRoute });
