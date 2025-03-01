import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const universitiesJson = (await getCollection('organizations')).filter(
	(d) => d.data.isInstanceOf.id === '/organization/university' || d.id === ':kit'
);

export const GET: APIRoute = () => {
	return new Response(JSON.stringify(universitiesJson), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
};
