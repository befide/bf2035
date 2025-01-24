import { circularReplacer } from '@/utils/jsonReplacer.ts';
import { getCommunityOrganizationsRoot } from '@/utils/organizations';
import type { APIRoute } from 'astro';

const root = await getCommunityOrganizationsRoot();

const result = {
  tree: root,
  keys: root
    .descendants()
    .map((t) => t.data.id)
    .sort()
};

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(result, circularReplacer(), 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
