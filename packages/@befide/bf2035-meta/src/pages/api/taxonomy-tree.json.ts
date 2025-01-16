import { circularReplacer } from '@/utils/jsonReplacer.ts';
import { taxonomyRoot, taxonomyEntries } from '@/utils/taxonomy';
import type { APIRoute } from 'astro';

const entries = await taxonomyEntries();
console.log(entries);
const root = taxonomyRoot(entries);

const result = {
  tree: root,
  keys: entries.map((t) => t.id)
};

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(result, circularReplacer(), 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
