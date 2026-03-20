import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../bkkk/utils/useAppNavigate';
import { useSEO, bkkkMeta } from '../../lib/seo';

const TeamPage = lazy(() =>
  import('../../bkkk/components/pages/TeamPage').then((m) => ({ default: m.TeamPage }))
);

function TeamPageRoute() {
  useSEO(bkkkMeta('Team', 'The team behind Bangkok Kunsthalle.', { path: '/bk/team' }));
  const navigate = useAppNavigate();
  return <TeamPage onNavigate={navigate} activePage="founder" />;
}

export const Route = createFileRoute('/bk/team')({ component: TeamPageRoute });
