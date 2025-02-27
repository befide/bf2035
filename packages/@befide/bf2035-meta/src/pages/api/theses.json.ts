import type { APIRoute } from 'astro';
import { getCollection, getEntry } from 'astro:content';

const theses = await getCollection('theses');

// theses.forEach(async (d) => {
//   d.type = await getEntry('taxonomyItems', d.data.thesisTypetype.id);
//   d.university = await getEntry('organizations', d.data.university.id);
// });

export const GET: APIRoute = () => {
	return new Response(JSON.stringify(theses.filter((d) => d.data)), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
};
