import type { APIRoute } from 'astro';
import {
  getEntries,
  getCollection,
  type CollectionEntry,
  getEntry
} from 'astro:content';

const workingGroups = await getCollection('workingGroups');

workingGroups.forEach(async (d) => {
  d.partOf = await getEntry('formalOrganizations', d.data.partOf.id);
});

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(workingGroups), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
