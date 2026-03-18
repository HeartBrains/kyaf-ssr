import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const ContactPage = lazy(() =>
  import('../../kyaf/components/pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);

function ContactPageRoute() {
  return <ContactPage  />;
}

export const Route = createFileRoute('/kyaf/contact')({ component: ContactPageRoute });
