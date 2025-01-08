import {
  buildRolledUpContentCollectionTree,
  getParentPath
} from '@/utils/content';
import { circularReplacer } from '@/utils/jsonReplacer';
import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';

import { stratify } from 'd3-hierarchy';

const taxonomyEntries: CollectionEntry<'taxonomy'>[] =
  await getCollection('taxonomy');

// console.log(
//   taxonomyEntries.map((d) => ({
//     id: d.id,
//     // dataId: d.data.id,
//     // dataMetaId: d.data.id,
//     parentId: d.data.meta.parentId
//   }))
// );

const filteredTtaxonomyEntries = taxonomyEntries.filter(
  (d) =>
    d.data.meta.parentId === '/' ||
    d.id === '/' ||
    d.data.meta.rootId === '/strategic-issue/'
);

console.log(
  filteredTtaxonomyEntries.map((d) => ({ parentId: d.data.meta.parentId }))
);

const root = stratify()
  .id((d) => d.id)
  .parentId((d) => {
    // console.log(d.data.meta.parentId);
    return d.data.meta.parentId;
  })(taxonomyEntries);

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
