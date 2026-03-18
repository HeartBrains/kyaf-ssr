import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useSEO, kyafMeta } from '../../lib/seo';

const SupportPage = lazy(() =>
  import('../../kyaf/components/pages/SupportPage').then((m) => ({ default: m.SupportPage }))
);

function SupportPageRoute() {
  useSEO(kyafMeta('Support', 'Support Khao Yai Art Forest.', { path: '/kyaf/support' }));
  return <SupportPage  />;
}

export const Route = createFileRoute('/kyaf/support')({ component: SupportPageRoute });
