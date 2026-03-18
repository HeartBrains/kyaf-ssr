import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../bkkk/utils/useAppNavigate';
import { useSearch } from '@tanstack/react-router';
import { useSEO, bkkkMeta } from '../../../lib/seo';

const MovingImagePage = lazy(() =>
  import('../../../bkkk/components/pages/MovingImagePage').then((m) => ({ default: m.MovingImagePage }))
);

function MovingImagePageRoute() {
  useSEO(bkkkMeta('Moving Image', 'Moving image programs at Bangkok Kunsthalle.', { path: '/bkkk/moving-image' }));
  const navigate = useAppNavigate();
  const search = useSearch({ strict: false }) as { sectionId?: string };
  return <MovingImagePage onNavigate={navigate} targetSectionId={search.sectionId} />;
}

export const Route = createFileRoute('/bkkk/moving-image/')({ component: MovingImagePageRoute });
