import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

const courses = await getCollection('courses');

courses.forEach(async (d) => {
  d.university = await getEntry('formalOrganizations', d.data.university.id);
});

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(courses), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
