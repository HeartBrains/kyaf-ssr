import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../kyaf/utils/useAppNavigate';

const ShopPage = lazy(() =>
  import('../../kyaf/components/pages/ShopPage').then((m) => ({ default: m.ShopPage }))
);

function ShopPageRoute() {
  const navigate = useAppNavigate();
  return <ShopPage onNavigate={navigate} />;
}

export const Route = createFileRoute('/kyaf/shop')({ component: ShopPageRoute });
