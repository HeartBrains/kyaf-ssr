import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../kyaf/utils/useAppNavigate';
import { useSearch } from '@tanstack/react-router';

const ResidencyPage = lazy(() =>
  import('../../kyaf/components/pages/ResidencyPage').then((m) => ({ default: m.ResidencyPage }))
);

function ResidencyPageRoute() {
  const navigate = useAppNavigate();
  const search = useSearch({ strict: false }) as { sectionId?: string };
  return <ResidencyPage onNavigate={navigate} activeSection={search.sectionId} />;
}

export const Route = createFileRoute('/kyaf/residency')({ component: ResidencyPageRoute });
