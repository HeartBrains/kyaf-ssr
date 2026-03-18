import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const VisitPage = lazy(() =>
  import('../../bkkk/components/pages/VisitPage').then((m) => ({ default: m.VisitPage }))
);

function VisitPageRoute() {
  return <VisitPage  />;
}

export const Route = createFileRoute('/bkkk/visit')({ component: VisitPageRoute });
