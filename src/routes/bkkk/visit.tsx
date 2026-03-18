import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useSEO, bkkkMeta } from '../../lib/seo';

const VisitPage = lazy(() =>
  import('../../bkkk/components/pages/VisitPage').then((m) => ({ default: m.VisitPage }))
);

function VisitPageRoute() {
  useSEO(bkkkMeta('Visit', 'How to visit Bangkok Kunsthalle.', { path: '/bkkk/visit' }));
  return <VisitPage  />;
}

export const Route = createFileRoute('/bkkk/visit')({ component: VisitPageRoute });
