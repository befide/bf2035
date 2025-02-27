import { circularReplacer } from '@/utils/jsonReplacer.ts';
import { allCommunityTopLevelOrganizations } from '@/utils/';

import type { APIRoute } from 'astro';

export const GET: APIRoute = () => {
	return new Response(JSON.stringify(allCommunityTopLevelOrganizations, circularReplacer(), 2), {
		headers: {
			'Content-Type': 'application/json; charset=utf-8',
		},
	});
};
