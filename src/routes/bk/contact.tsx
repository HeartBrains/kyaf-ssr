import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useSEO, bkkkMeta } from '../../lib/seo';

const ContactPage = lazy(() =>
  import('../../bkkk/components/pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);

function ContactPageRoute() {
  useSEO(bkkkMeta('Contact', 'Contact Bangkok Kunsthalle.', { path: '/bk/contact' }));
  return <ContactPage  />;
}

export const Route = createFileRoute('/bk/contact')({ component: ContactPageRoute });
