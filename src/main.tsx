import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { createRouter } from './router';
import './index.css';

const router = createRouter();

// Signal to vite-plugin-prerender that the app has rendered
router.subscribe('onResolved', () => {
  document.dispatchEvent(new Event('render-event'));
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
