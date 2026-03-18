import { createFileRoute, Outlet, useRouterState, useNavigate } from '@tanstack/react-router';
import { useState, useEffect, Suspense } from 'react';
import { Header } from '../../kyaf/components/layout/Header';
import { Footer } from '../../kyaf/components/layout/Footer';
import { MenuOverlay } from '../../kyaf/components/layout/MenuOverlay';
import { BackToTop } from '../../kyaf/components/ui/BackToTop';
import { useAppNavigate } from '../../kyaf/utils/useAppNavigate';

function PageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function KyafLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useAppNavigate();
  const navigateRouter = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
      <Header
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)}
        onLogoClick={() => navigateRouter({ to: '/' })}
        isTransparent={!scrolled}
      />
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={navigate}
        activePage={pathname}
      />
      <main>
        <Suspense fallback={<PageLoading />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer onNavigate={navigate} />
      <BackToTop />
    </div>
  );
}

export const Route = createFileRoute('/kyaf/__layout')({
  component: KyafLayout,
});
