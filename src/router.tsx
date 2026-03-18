import { createRouter as createTanStackRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { LanguageProvider } from './utils/languageContext';

export function createRouter() {
  return createTanStackRouter({
    routeTree,
    context: {},
    defaultPreload: 'intent',
    scrollRestoration: true,
    Wrap: ({ children }) => (
      <LanguageProvider>{children}</LanguageProvider>
    ),
  });
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
