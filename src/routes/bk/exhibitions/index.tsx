import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../bkkk/utils/useAppNavigate';
import { useSearch } from '@tanstack/react-router';
import { useSEO, bkkkMeta } from '../../../lib/seo';

const ExhibitionsPage = lazy(() =>
  import('../../../bkkk/components/pages/ExhibitionsPage').then((m) => ({ default: m.ExhibitionsPage }))
);

function ExhibitionsPageRoute() {
  useSEO(bkkkMeta('Exhibitions', 'Current and past exhibitions at Bangkok Kunsthalle.', { path: '/bk/exhibitions' }));
  const navigate = useAppNavigate();
  const search = useSearch({ strict: false }) as { sectionId?: string };
  return <ExhibitionsPage onNavigate={navigate} targetSectionId={search.sectionId} />;
}

export const Route = createFileRoute('/bk/exhibitions/')({ component: ExhibitionsPageRoute });
