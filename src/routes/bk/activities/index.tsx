import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../bkkk/utils/useAppNavigate';
import { useSearch } from '@tanstack/react-router';
import { useSEO, bkkkMeta } from '../../../lib/seo';

const ActivitiesPage = lazy(() =>
  import('../../../bkkk/components/pages/ActivitiesPage').then((m) => ({ default: m.ActivitiesPage }))
);

function ActivitiesPageRoute() {
  useSEO(bkkkMeta('Activities', 'Events and activities at Bangkok Kunsthalle.', { path: '/bk/activities' }));
  const navigate = useAppNavigate();
  const search = useSearch({ strict: false }) as { sectionId?: string };
  return <ActivitiesPage onNavigate={navigate} targetSectionId={search.sectionId} />;
}

export const Route = createFileRoute('/bk/activities/')({ component: ActivitiesPageRoute });
