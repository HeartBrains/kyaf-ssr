import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../bkkk/utils/useAppNavigate';
import { useSEO, bkkkMeta } from '../../../lib/seo';

const AboutPage = lazy(() =>
  import('../../../bkkk/components/pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);

function AboutPageRoute() {
  useSEO(bkkkMeta('History', 'The history of Bangkok Kunsthalle.', { path: '/bkkk/about/history' }));
  const navigate = useAppNavigate();
  return <AboutPage onNavigate={navigate} activePage="history" />;
}

export const Route = createFileRoute('/bkkk/about/history')({ component: AboutPageRoute });
