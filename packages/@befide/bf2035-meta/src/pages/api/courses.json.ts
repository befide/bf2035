import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const courses = await getCollection('courses');


export const GET: APIRoute = () => {
  return new Response(JSON.stringify(courses), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
