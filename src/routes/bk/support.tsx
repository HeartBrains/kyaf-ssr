import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useSEO, bkkkMeta } from '../../lib/seo';

const SupportPage = lazy(() =>
  import('../../bkkk/components/pages/SupportPage').then((m) => ({ default: m.SupportPage }))
);

function SupportPageRoute() {
  useSEO(bkkkMeta('Support', 'Support Bangkok Kunsthalle.', { path: '/bk/support' }));
  return <SupportPage  />;
}

export const Route = createFileRoute('/bk/support')({ component: SupportPageRoute });
