import { useNavigate, createFileRoute } from '@tanstack/react-router';
import { LandingPage } from '../landing/components/pages/LandingPage';

function LandingRoute() {
  const navigate = useNavigate();
  return (
    <LandingPage
      onEnterBkkk={() => navigate({ to: '/bkkk' })}
      onEnterKyaf={() => navigate({ to: '/kyaf' })}
    />
  );
}

export const Route = createFileRoute('/')({
  component: LandingRoute,
});
