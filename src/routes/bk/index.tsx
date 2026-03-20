import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../bkkk/utils/useAppNavigate';
import { useSEO, bkkkMeta } from '../../lib/seo';

const HomePage = lazy(() =>
  import('../../bkkk/components/pages/HomePage').then((m) => ({ default: m.HomePage }))
);

function HomePageRoute() {
  useSEO(bkkkMeta('Bangkok Kunsthalle', 'Contemporary art space in Bangkok, Thailand.', { path: '/bk' }));
  const navigate = useAppNavigate();
  return <HomePage onNavigate={navigate} />;
}

export const Route = createFileRoute('/bk/')({ component: HomePageRoute });
