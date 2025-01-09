import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const theses = await getCollection('theses');

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(theses.filter((d) => d.data.university)), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
