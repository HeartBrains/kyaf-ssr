import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useSEO, kyafMeta } from '../../lib/seo';

const VisitPage = lazy(() =>
  import('../../kyaf/components/pages/VisitPage').then((m) => ({ default: m.VisitPage }))
);

function VisitPageRoute() {
  useSEO(kyafMeta('Visit', 'How to visit Khao Yai Art Forest.', { path: '/kyaf/visit' }));
  return <VisitPage  />;
}

export const Route = createFileRoute('/kyaf/visit')({ component: VisitPageRoute });
