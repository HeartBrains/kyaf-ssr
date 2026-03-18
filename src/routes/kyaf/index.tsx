import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../kyaf/utils/useAppNavigate';
import { useSEO, kyafMeta } from '../../lib/seo';

const HomePage = lazy(() =>
  import('../../kyaf/components/pages/HomePage').then((m) => ({ default: m.HomePage }))
);

function HomePageRoute() {
  useSEO(kyafMeta('Khao Yai Art Forest', 'Contemporary art space in Khao Yai, Thailand.', { path: '/kyaf' }));
  const navigate = useAppNavigate();
  return <HomePage onNavigate={navigate} />;
}

export const Route = createFileRoute('/kyaf/')({ component: HomePageRoute });
