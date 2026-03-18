import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../bkkk/utils/useAppNavigate';
import { useSearch } from '@tanstack/react-router';

const ShopPage = lazy(() =>
  import('../../bkkk/components/pages/ShopPage').then((m) => ({ default: m.ShopPage }))
);

function ShopPageRoute() {
  const navigate = useAppNavigate();
  const search = useSearch({ strict: false }) as { sectionId?: string };
  return <ShopPage onNavigate={navigate} targetSectionId={search.sectionId} />;
}

export const Route = createFileRoute('/bkkk/shop')({ component: ShopPageRoute });
