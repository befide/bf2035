import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const organization = await getCollection('facilities');

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(organization, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
