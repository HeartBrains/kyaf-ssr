import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const HiddenAssetsPage = lazy(() =>
  import('../../bkkk/components/pages/HiddenAssetsPage').then((m) => ({ default: m.HiddenAssetsPage }))
);

function HiddenAssetsPageRoute() {
  return <HiddenAssetsPage  />;
}

export const Route = createFileRoute('/bk/hidden-assets')({ component: HiddenAssetsPageRoute });
