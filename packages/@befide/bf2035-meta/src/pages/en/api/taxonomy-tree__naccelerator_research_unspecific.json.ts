import { circularReplacer } from '@/utils/jsonReplacer.ts';
import { getTaxonomyEntries, getTaxonomyRoot } from '@/utils/';
import type { APIRoute } from 'astro';

const entries = await getTaxonomyEntries(false);
const root = getTaxonomyRoot(entries);

const result = {
	tree: root,
	keys: root.descendants().map((t) => t.data.id),
};

export const GET: APIRoute = () => {
	return new Response(JSON.stringify(result, circularReplacer(), 2), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
};
