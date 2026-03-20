import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../bkkk/utils/useAppNavigate';
import { useSearch } from '@tanstack/react-router';
import { useSEO, bkkkMeta } from '../../lib/seo';

const ShopPage = lazy(() =>
  import('../../bkkk/components/pages/ShopPage').then((m) => ({ default: m.ShopPage }))
);

function ShopPageRoute() {
  useSEO(bkkkMeta('Shop', 'Shop at Bangkok Kunsthalle.', { path: '/bk/shop' }));
  const navigate = useAppNavigate();
  const search = useSearch({ strict: false }) as { sectionId?: string };
  return <ShopPage onNavigate={navigate} targetSectionId={search.sectionId} />;
}

export const Route = createFileRoute('/bk/shop')({ component: ShopPageRoute });
