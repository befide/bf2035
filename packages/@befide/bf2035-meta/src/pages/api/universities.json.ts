import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

const universitiesJson = (await getCollection('formalOrganizations')).filter(
  (d) => d.data.meta.type.id === '/organization/university' || d.id === '/kit'
);

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(universitiesJson), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
