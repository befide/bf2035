import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

const formalOrganization = await getCollection('formalOrganization');

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(formalOrganization), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
