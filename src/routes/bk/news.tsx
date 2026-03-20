import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../bkkk/utils/useAppNavigate';

const PostPage = lazy(() =>
  import('../../bkkk/components/pages/PostPage').then((m) => ({ default: m.PostPage }))
);

function PostPageRoute() {
  const navigate = useAppNavigate();
  return <PostPage onNavigate={navigate} />;
}

export const Route = createFileRoute('/bk/news')({ component: PostPageRoute });
