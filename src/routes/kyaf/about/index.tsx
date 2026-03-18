import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../../kyaf/utils/useAppNavigate';
import { useSEO, kyafMeta } from '../../../lib/seo';

const AboutPage = lazy(() =>
  import('../../../kyaf/components/pages/AboutPage').then((m) => ({ default: m.AboutPage }))
);

function AboutPageRoute() {
  useSEO(kyafMeta('About', 'About Khao Yai Art Forest.', { path: '/kyaf/about' }));
  const navigate = useAppNavigate();
  return <AboutPage onNavigate={navigate} activePage="about" />;
}

export const Route = createFileRoute('/kyaf/about/')({ component: AboutPageRoute });
