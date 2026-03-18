import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const PressPage = lazy(() =>
  import('../../bkkk/components/pages/PressPage').then((m) => ({ default: m.PressPage }))
);

function PressPageRoute() {
  return <PressPage  />;
}

export const Route = createFileRoute('/bkkk/press')({ component: PressPageRoute });
