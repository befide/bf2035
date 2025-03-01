import type { Organization } from '@/content.config.organizations';
import { allCommunityTopLevelOrganizations } from '@/utils/content.organizations';
import type { APIRoute } from 'astro';

const communityTopLevelOrganizations: Organization[] = await allCommunityTopLevelOrganizations();

export const GET: APIRoute = () => {
	return new Response(
		JSON.stringify(
			communityTopLevelOrganizations.map((o) => ({
				label: o.label.short.en,
				link: '/profiles/' + o.id,
			})),
			null,
			2
		),
		{
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
			},
		}
	);
};
