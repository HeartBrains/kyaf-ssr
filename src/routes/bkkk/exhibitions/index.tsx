import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../bkkk/utils/useAppNavigate';
import { useSearch } from '@tanstack/react-router';

const ExhibitionsPage = lazy(() =>
  import('../../../bkkk/components/pages/ExhibitionsPage').then((m) => ({ default: m.ExhibitionsPage }))
);

function ExhibitionsPageRoute() {
  const navigate = useAppNavigate();
  const search = useSearch({ strict: false }) as { sectionId?: string };
  return <ExhibitionsPage onNavigate={navigate} targetSectionId={search.sectionId} />;
}

export const Route = createFileRoute('/bkkk/exhibitions/')({ component: ExhibitionsPageRoute });
