import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../kyaf/utils/useAppNavigate';
import { useSearch } from '@tanstack/react-router';
import { useSEO, kyafMeta } from '../../../lib/seo';

const ActivitiesPage = lazy(() =>
  import('../../../kyaf/components/pages/ActivitiesPage').then((m) => ({ default: m.ActivitiesPage }))
);

function ActivitiesPageRoute() {
  useSEO(kyafMeta('Activities', 'Events and activities at Khao Yai Art Forest.', { path: '/kyaf/activities' }));
  const navigate = useAppNavigate();
  const search = useSearch({ strict: false }) as { sectionId?: string };
  return <ActivitiesPage onNavigate={navigate} activeSection={search.sectionId} />;
}

export const Route = createFileRoute('/kyaf/activities/')({ component: ActivitiesPageRoute });
