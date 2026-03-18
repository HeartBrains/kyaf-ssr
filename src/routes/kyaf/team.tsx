import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useAppNavigate } from '../../kyaf/utils/useAppNavigate';

const TeamPage = lazy(() =>
  import('../../kyaf/components/pages/TeamPage').then((m) => ({ default: m.TeamPage }))
);

function TeamPageRoute() {
  const navigate = useAppNavigate();
  return <TeamPage onNavigate={navigate} activePage="founder" />;
}

export const Route = createFileRoute('/kyaf/team')({ component: TeamPageRoute });
