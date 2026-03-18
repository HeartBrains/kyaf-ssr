import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../kyaf/utils/useAppNavigate';
import { useSEO, kyafMeta } from '../../lib/seo';

const ShopPage = lazy(() =>
  import('../../kyaf/components/pages/ShopPage').then((m) => ({ default: m.ShopPage }))
);

function ShopPageRoute() {
  useSEO(kyafMeta('Shop', 'Shop at Khao Yai Art Forest.', { path: '/kyaf/shop' }));
  const navigate = useAppNavigate();
  return <ShopPage onNavigate={navigate} />;
}

export const Route = createFileRoute('/kyaf/shop')({ component: ShopPageRoute });
