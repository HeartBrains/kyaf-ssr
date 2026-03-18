import { useNavigate, createFileRoute } from '@tanstack/react-router';
import { LandingPage } from '../landing/components/pages/LandingPage';
import { useSEO } from '../lib/seo';

function LandingRoute() {
  const navigate = useNavigate();
  useSEO({
    title: 'Bangkok Kunsthalle / Khao Yai Art Forest',
    description: 'Two contemporary art spaces in Thailand — Bangkok Kunsthalle and Khao Yai Art Forest.',
    canonical: 'https://khaoyaiart.bkkkapp.com',
  });
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
