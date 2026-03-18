import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../bkkk/utils/useAppNavigate';

const AboutPage = lazy(() =>
  import('../../../bkkk/components/pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);

function AboutPageRoute() {
  const navigate = useAppNavigate();
  return <AboutPage onNavigate={navigate} activePage="history" />;
}

export const Route = createFileRoute('/bkkk/about/history')({ component: AboutPageRoute });
