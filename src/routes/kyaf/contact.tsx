import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { useSEO, kyafMeta } from '../../lib/seo';

const ContactPage = lazy(() =>
  import('../../kyaf/components/pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);

function ContactPageRoute() {
  useSEO(kyafMeta('Contact', 'Contact Khao Yai Art Forest.', { path: '/kyaf/contact' }));
  return <ContactPage  />;
}

export const Route = createFileRoute('/kyaf/contact')({ component: ContactPageRoute });
