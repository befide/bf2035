import { getTaxonomyEntries } from '@/utils/';
import type { APIRoute } from 'astro';

const taxonomy = await getTaxonomyEntries();

export const GET: APIRoute = () => {
	return new Response(JSON.stringify(taxonomy, null, 2), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
};
