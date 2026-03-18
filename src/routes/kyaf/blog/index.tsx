import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../kyaf/utils/useAppNavigate';

const BlogPage = lazy(() =>
  import('../../../kyaf/components/pages/BlogPage').then((m) => ({ default: m.BlogPage }))
);

function BlogPageRoute() {
  const navigate = useAppNavigate();
  return <BlogPage onNavigate={navigate} />;
}

export const Route = createFileRoute('/kyaf/blog/')({ component: BlogPageRoute });
