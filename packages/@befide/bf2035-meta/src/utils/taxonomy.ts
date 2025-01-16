import { getCollection, type CollectionEntry } from 'astro:content';

import { stratify } from 'd3-hierarchy';

export const taxonomyEntries = async () => await getCollection('taxonomy');

export const taxonomyRoot = (taxonomyEntries: any) => {
  const root = stratify()
    .id((d) => d.id)
    .parentId((d) => {
      // console.log(d.data.meta.parentId);
      return d.data.meta.parentId;
    })(taxonomyEntries);

  root.each((node: any) => {
    node.data.descendantsCount = node.descendants().length;
  });
  return root;
};
