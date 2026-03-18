import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../kyaf/utils/useAppNavigate';
import { useSearch } from '@tanstack/react-router';

const ExhibitionsPage = lazy(() =>
  import('../../../kyaf/components/pages/ExhibitionsPage').then((m) => ({ default: m.ExhibitionsPage }))
);

function ExhibitionsPageRoute() {
  const navigate = useAppNavigate();
  const search = useSearch({ strict: false }) as { sectionId?: string };
  return <ExhibitionsPage onNavigate={navigate} activeSection={search.sectionId} />;
}

export const Route = createFileRoute('/kyaf/exhibitions/')({ component: ExhibitionsPageRoute });
