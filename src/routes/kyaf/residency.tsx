import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../kyaf/utils/useAppNavigate';
import { useSearch } from '@tanstack/react-router';
import { useSEO, kyafMeta } from '../../lib/seo';

const ResidencyPage = lazy(() =>
  import('../../kyaf/components/pages/ResidencyPage').then((m) => ({ default: m.ResidencyPage }))
);

function ResidencyPageRoute() {
  useSEO(kyafMeta('Residency', 'Artist residency program at Khao Yai Art Forest.', { path: '/kyaf/residency' }));
  const navigate = useAppNavigate();
  const search = useSearch({ strict: false }) as { sectionId?: string };
  return <ResidencyPage onNavigate={navigate} activeSection={search.sectionId} />;
}

export const Route = createFileRoute('/kyaf/residency')({ component: ResidencyPageRoute });
