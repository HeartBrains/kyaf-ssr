import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useSEO, bkkkMeta } from '../../lib/seo';

const PressPage = lazy(() =>
  import('../../bkkk/components/pages/PressPage').then((m) => ({ default: m.PressPage }))
);

function PressPageRoute() {
  useSEO(bkkkMeta('Press', 'Press and media resources for Bangkok Kunsthalle.', { path: '/bk/press' }));
  return <PressPage  />;
}

export const Route = createFileRoute('/bk/press')({ component: PressPageRoute });
