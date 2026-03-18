import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const VisitPage = lazy(() =>
  import('../../kyaf/components/pages/VisitPage').then((m) => ({ default: m.VisitPage }))
);

function VisitPageRoute() {
  return <VisitPage  />;
}

export const Route = createFileRoute('/kyaf/visit')({ component: VisitPageRoute });
