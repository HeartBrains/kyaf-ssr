import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../bkkk/utils/useAppNavigate';

const BlogPage = lazy(() =>
  import('../../../bkkk/components/pages/BlogPage').then((m) => ({ default: m.BlogPage }))
);

function BlogPageRoute() {
  const navigate = useAppNavigate();
  return <BlogPage onNavigate={navigate} />;
}

export const Route = createFileRoute('/bkkk/blog/')({ component: BlogPageRoute });
