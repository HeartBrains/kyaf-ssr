import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../kyaf/utils/useAppNavigate';
import { useSEO, kyafMeta } from '../../../lib/seo';

const BlogPage = lazy(() =>
  import('../../../kyaf/components/pages/BlogPage').then((m) => ({ default: m.BlogPage }))
);

function BlogPageRoute() {
  useSEO(kyafMeta('Blog', 'Articles and writing from Khao Yai Art Forest.', { path: '/kyaf/blog' }));
  const navigate = useAppNavigate();
  return <BlogPage onNavigate={navigate} />;
}

export const Route = createFileRoute('/kyaf/blog/')({ component: BlogPageRoute });
