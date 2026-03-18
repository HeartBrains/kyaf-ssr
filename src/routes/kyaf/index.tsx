import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../kyaf/utils/useAppNavigate';

const HomePage = lazy(() =>
  import('../../kyaf/components/pages/HomePage').then((m) => ({ default: m.HomePage }))
);

function HomePageRoute() {
  const navigate = useAppNavigate();
  return <HomePage onNavigate={navigate} />;
}

export const Route = createFileRoute('/kyaf/')({ component: HomePageRoute });
