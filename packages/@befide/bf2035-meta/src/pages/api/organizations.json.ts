import { circularReplacer } from '@/utils/jsonReplacer.ts';
import { getOrganizations } from '@/utils/';

import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

const organizations: CollectionEntry<'organizations'>[] =
  await getOrganizations();

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(organizations, circularReplacer(), 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
