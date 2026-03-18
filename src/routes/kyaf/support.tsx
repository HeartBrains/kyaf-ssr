import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const SupportPage = lazy(() =>
  import('../../kyaf/components/pages/SupportPage').then((m) => ({ default: m.SupportPage }))
);

function SupportPageRoute() {
  return <SupportPage  />;
}

export const Route = createFileRoute('/kyaf/support')({ component: SupportPageRoute });
