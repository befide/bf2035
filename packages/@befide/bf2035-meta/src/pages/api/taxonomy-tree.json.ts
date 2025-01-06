import {
  buildRolledUpContentCollectionTree,
  getParentPath
} from '@/utils/content';
import { circularReplacer } from '@/utils/jsonReplacer';
import type { APIRoute } from 'astro';
import type { AnyZodObject } from 'astro/zod';
import { getCollection, type CollectionEntry } from 'astro:content';

import { stratify } from 'd3-hierarchy';

const taxonomyEntries: CollectionEntry<'taxonomy'>[] =
  await getCollection('taxonomy');

const root = stratify()
  .id((d) => d.id)
  .parentId((d) => getParentPath(d.id))(taxonomyEntries);

root.each((node: any) => {
  node.data.descendantsCount = node.descendants().length;
});

const result = {
  tree: root,
  keys: taxonomyEntries.map((t) => t.id)
};

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(result, circularReplacer(), 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
};
