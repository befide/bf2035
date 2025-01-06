import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const programOfStudies = await getCollection('programOfStudies');

// const resolved = programOfStudies.map(async (pos) => {
//   return {
//     ...pos,
//     ...pos.data.universities?.map((u) => u.toUpperCase())
//   };
// });

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(programOfStudies), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
