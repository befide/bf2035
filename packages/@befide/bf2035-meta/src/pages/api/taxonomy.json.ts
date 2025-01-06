import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

const taxonomy: CollectionEntry<'taxonomy'>[] = await getCollection('taxonomy');

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(taxonomy), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
