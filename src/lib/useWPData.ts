import { useState, useEffect } from 'react';
import { fetchCPT, fetchCPTBySlug, type WPSite, type WPRawPost } from './wp-api';
import {
  mapBkkkExhibition,
  mapKyafExhibition,
  mapMovingImage,
  mapResidencyArtist,
  mapBkkkTeamMember,
  mapKyafTeamMember,
  mapActivity,
} from './wp-mappers';
import {
  getMockBkkkExhibitions,
  getMockKyafExhibitions,
  getMockMovingImages,
  getMockResidencyArtists,
  getMockBkkkActivities,
  getMockKyafActivities,
} from './mock-data';

const USE_MOCK = import.meta.env.VITE_USE_MOCK === 'true';

interface WPState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

interface WPSingleState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

function useMockList<T>(mockFn: () => T[]): WPState<T> {
  return { data: mockFn(), loading: false, error: null };
}

function useWPList<T>(
  cptSlug: string,
  site: WPSite,
  mapper: (post: WPRawPost) => T,
): WPState<T> {
  const [state, setState] = useState<WPState<T>>({ data: [], loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ data: [], loading: true, error: null });
    fetchCPT(cptSlug, site)
      .then(posts => {
        if (!cancelled) setState({ data: posts.map(mapper), loading: false, error: null });
      })
      .catch(err => {
        if (!cancelled) setState({ data: [], loading: false, error: String(err) });
      });
    return () => { cancelled = true; };
  }, [cptSlug, site]);

  return state;
}

function useWPSingle<T>(
  cptSlug: string,
  slug: string,
  mapper: (post: WPRawPost) => T,
): WPSingleState<T> {
  const [state, setState] = useState<WPSingleState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });
    fetchCPTBySlug(cptSlug, slug)
      .then(post => {
        if (!cancelled) setState({ data: post ? mapper(post) : null, loading: false, error: null });
      })
      .catch(err => {
        if (!cancelled) setState({ data: null, loading: false, error: String(err) });
      });
    return () => { cancelled = true; };
  }, [cptSlug, slug]);

  return state;
}

// ─── Public hooks ─────────────────────────────────────────────────────────────

export function useBkkkExhibitions() {
  if (USE_MOCK) return useMockList(getMockBkkkExhibitions);
  return useWPList('exhibitions', 'bkkk', mapBkkkExhibition);
}

export function useKyafExhibitions() {
  if (USE_MOCK) return useMockList(getMockKyafExhibitions);
  return useWPList('exhibitions', 'kyaf', mapKyafExhibition);
}

export function useBkkkExhibitionBySlug(slug: string) {
  return useWPSingle('exhibitions', slug, mapBkkkExhibition);
}

export function useKyafExhibitionBySlug(slug: string) {
  return useWPSingle('exhibitions', slug, mapKyafExhibition);
}

export function useMovingImages() {
  if (USE_MOCK) return useMockList(getMockMovingImages);
  return useWPList('moving-images', 'bkkk', mapMovingImage);
}

export function useMovingImageBySlug(slug: string) {
  return useWPSingle('moving-images', slug, mapMovingImage);
}

export function useResidencyArtists() {
  if (USE_MOCK) return useMockList(getMockResidencyArtists);
  return useWPList('residency-artists', 'bkkk', mapResidencyArtist);
}

export function useResidencyArtistBySlug(slug: string) {
  return useWPSingle('residency-artists', slug, mapResidencyArtist);
}

export function useBkkkTeamMembers() {
  return useWPList('team-members', 'bkkk', mapBkkkTeamMember);
}

export function useKyafTeamMembers() {
  return useWPList('team-members', 'kyaf', mapKyafTeamMember);
}

export function useBkkkActivities() {
  if (USE_MOCK) return useMockList(getMockBkkkActivities);
  return useWPList('activities', 'bkkk', mapActivity);
}

export function useKyafActivities() {
  if (USE_MOCK) return useMockList(getMockKyafActivities);
  return useWPList('activities', 'kyaf', mapActivity);
}

export function useActivityBySlug(slug: string, site: WPSite) {
  return useWPSingle('activities', slug, mapActivity);
}
