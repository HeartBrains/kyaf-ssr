import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../bkkk/utils/useAppNavigate';
import { useSEO, bkkkMeta } from '../../../lib/seo';

const AboutPage = lazy(() =>
  import('../../../bkkk/components/pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);

function AboutPageRoute() {
  useSEO(bkkkMeta('About', 'About Bangkok Kunsthalle.', { path: '/bkkk/about' }));
  const navigate = useAppNavigate();
  return <AboutPage onNavigate={navigate} activePage="about" />;
}

export const Route = createFileRoute('/bkkk/about/')({ component: AboutPageRoute });
