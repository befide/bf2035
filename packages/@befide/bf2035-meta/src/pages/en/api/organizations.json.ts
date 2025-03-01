import { circularReplacer } from '@/utils/jsonReplacer.ts';
import { allOrganizationsForTopLevelOrganization } from '@/utils/';

import type { APIRoute } from 'astro';
import { type CollectionEntry } from 'astro:content';

const organizations: CollectionEntry<'organizations'>[] =
	await allOrganizationsForTopLevelOrganization();

export const GET: APIRoute = () => {
	return new Response(JSON.stringify(organizations, circularReplacer(), 2), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
};
