import { circularReplacer } from '@/utils/jsonReplacer.ts';
import { getOrganizationRoots, getCommunityOrganizations } from '@/utils/';
import type { APIRoute } from 'astro';

const organizations = await getCommunityOrganizations();
const roots = getOrganizationRoots(organizations);

const result = {
  tree: roots[0],
  keys: organizations.map((d) => d.id).sort()
};

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(result, circularReplacer(), 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
