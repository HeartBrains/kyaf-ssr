import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const ContactPage = lazy(() =>
  import('../../bkkk/components/pages/ContactPage').then((m) => ({ default: m.ContactPage }))
);

function ContactPageRoute() {
  return <ContactPage  />;
}

export const Route = createFileRoute('/bkkk/contact')({ component: ContactPageRoute });
