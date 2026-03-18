import { hydrateRoot } from 'react-dom/client';
import { StartClient } from '@tanstack/start/client';
import { createRouter } from '../src/router';

const router = createRouter();

hydrateRoot(document.getElementById('root')!, <StartClient router={router} />);
