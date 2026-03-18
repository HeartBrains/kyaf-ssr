import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../bkkk/utils/useAppNavigate';

const TeamPage = lazy(() =>
  import('../../bkkk/components/pages/TeamPage').then((m) => ({ default: m.TeamPage }))
);

function TeamPageRoute() {
  const navigate = useAppNavigate();
  return <TeamPage onNavigate={navigate} activePage="founder" />;
}

export const Route = createFileRoute('/bkkk/team')({ component: TeamPageRoute });
