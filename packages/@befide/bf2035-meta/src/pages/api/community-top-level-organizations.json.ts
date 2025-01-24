import { circularReplacer } from '@/utils/jsonReplacer.ts';
import { getCommunityTopLevelOrganizations } from '@/utils/';

import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

const communityTopLevelOrganizations: CollectionEntry<'organizations'>[] =
  await getCommunityTopLevelOrganizations();

export const GET: APIRoute = () => {
  return new Response(
    JSON.stringify(communityTopLevelOrganizations, circularReplacer(), 2),
    {
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      }
    }
  );
};
