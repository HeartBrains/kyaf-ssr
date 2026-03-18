import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../bkkk/utils/useAppNavigate';
import { useSearch } from '@tanstack/react-router';
import { useSEO, bkkkMeta } from '../../lib/seo';

const ArchivesPage = lazy(() =>
  import('../../bkkk/components/pages/ArchivesPage').then((m) => ({ default: m.ArchivesPage }))
);

function ArchivesPageRoute() {
  useSEO(bkkkMeta('Archives', 'Archives of Bangkok Kunsthalle.', { path: '/bkkk/archives' }));
  const navigate = useAppNavigate();
  const search = useSearch({ strict: false }) as { sectionId?: string };
  return <ArchivesPage onNavigate={navigate} targetSectionId={search.sectionId} />;
}

export const Route = createFileRoute('/bkkk/archives')({ component: ArchivesPageRoute });
