import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useSEO, kyafMeta } from '../../lib/seo';

const PressPage = lazy(() =>
  import('../../kyaf/components/pages/PressPage').then((m) => ({ default: m.PressPage }))
);

function PressPageRoute() {
  useSEO(kyafMeta('Press', 'Press and media resources for Khao Yai Art Forest.', { path: '/kyaf/press' }));
  return <PressPage  />;
}

export const Route = createFileRoute('/kyaf/press')({ component: PressPageRoute });
