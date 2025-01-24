import { getTaxonomyEntries } from '@/utils/';
import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

const taxonomy = await getTaxonomyEntries();

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(taxonomy, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
