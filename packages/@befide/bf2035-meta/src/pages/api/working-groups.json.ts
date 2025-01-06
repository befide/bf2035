import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

const workingGroups = await getCollection('workingGroups');

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(workingGroups), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
