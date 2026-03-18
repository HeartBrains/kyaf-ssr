import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../kyaf/utils/useAppNavigate';
import { useSEO, kyafMeta } from '../../lib/seo';

const ArchivesPage = lazy(() =>
  import('../../kyaf/components/pages/ArchivesPage').then((m) => ({ default: m.ArchivesPage }))
);

function ArchivesPageRoute() {
  useSEO(kyafMeta('Archives', 'Archives of Khao Yai Art Forest.', { path: '/kyaf/archives' }));
  const navigate = useAppNavigate();
  return <ArchivesPage onNavigate={navigate} />;
}

export const Route = createFileRoute('/kyaf/archives')({ component: ArchivesPageRoute });
