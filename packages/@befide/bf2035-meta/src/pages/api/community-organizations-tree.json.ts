import { circularReplacer } from '@/utils/jsonReplacer.ts';
import { allOrganizationRoots, allCommunityOrganizations } from '@/utils/';
import type { APIRoute } from 'astro';

const organizations = await allCommunityOrganizations();
const roots = allOrganizationRoots(organizations);

const result = {
	tree: roots[0],
	keys: organizations.map((d) => d.id).sort(),
};

export const GET: APIRoute = () => {
	return new Response(JSON.stringify(result, circularReplacer(), 2), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
};
