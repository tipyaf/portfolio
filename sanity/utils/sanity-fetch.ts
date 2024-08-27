import client from '@/sanity/sanity.client';
import { type QueryParams } from 'next-sanity';

export interface SanityFetchParams {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: SanityFetchParams): Promise<T> {
  return client.fetch(query, params, {
    next: {
      revalidate: tags.length ? false : revalidate,
      tags,
    },
  });
}
