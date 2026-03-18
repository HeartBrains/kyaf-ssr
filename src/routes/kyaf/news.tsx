import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../kyaf/utils/useAppNavigate';

const PostPage = lazy(() =>
  import('../../kyaf/components/pages/PostPage').then((m) => ({ default: m.PostPage }))
);

function PostPageRoute() {
  const navigate = useAppNavigate();
  return <PostPage onNavigate={navigate} />;
}

export const Route = createFileRoute('/kyaf/news')({ component: PostPageRoute });
