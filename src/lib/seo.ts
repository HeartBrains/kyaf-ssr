import { useEffect } from 'react';

const BKKK_BASE_URL = import.meta.env.VITE_BKKK_BASE_URL ?? 'https://khaoyaiart.bkkkapp.com';
const KYAF_BASE_URL = import.meta.env.VITE_KYAF_BASE_URL ?? 'https://khaoyaiartforest.com';

export const BKKK_DEFAULT_OG_IMAGE = `${BKKK_BASE_URL}/og-bkkk.jpg`;
export const KYAF_DEFAULT_OG_IMAGE = `${KYAF_BASE_URL}/og-kyaf.jpg`;

export interface SEOMeta {
  title: string;
  description: string;
  image?: string;
  canonical?: string;
  type?: 'website' | 'article';
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function useSEO(meta: SEOMeta) {
  useEffect(() => {
    document.title = meta.title;

    setMeta('description', meta.description);

    // Open Graph
    setMeta('og:title', meta.title, 'property');
    setMeta('og:description', meta.description, 'property');
    setMeta('og:type', meta.type ?? 'website', 'property');
    if (meta.image) setMeta('og:image', meta.image, 'property');
    if (meta.canonical) setMeta('og:url', meta.canonical, 'property');

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', meta.title);
    setMeta('twitter:description', meta.description);
    if (meta.image) setMeta('twitter:image', meta.image);

    // Canonical
    if (meta.canonical) setLink('canonical', meta.canonical);
  }, [meta.title, meta.description, meta.image, meta.canonical, meta.type]);
}

// ─── Site-specific helpers ────────────────────────────────────────────────────

export function bkkkMeta(
  title: string,
  description: string,
  opts: { path?: string; image?: string; type?: SEOMeta['type'] } = {},
): SEOMeta {
  return {
    title: `${title} | Bangkok Kunsthalle`,
    description,
    image: opts.image ?? BKKK_DEFAULT_OG_IMAGE,
    canonical: opts.path ? `${BKKK_BASE_URL}${opts.path}` : undefined,
    type: opts.type,
  };
}

export function kyafMeta(
  title: string,
  description: string,
  opts: { path?: string; image?: string; type?: SEOMeta['type'] } = {},
): SEOMeta {
  return {
    title: `${title} | Khao Yai Art Forest`,
    description,
    image: opts.image ?? KYAF_DEFAULT_OG_IMAGE,
    canonical: opts.path ? `${KYAF_BASE_URL}${opts.path}` : undefined,
    type: opts.type,
  };
}
