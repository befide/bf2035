import { getCollection, type CollectionEntry } from 'astro:content';

import { stratify } from 'd3-hierarchy';

export const getTaxonomyEntries = async (
  isAcceleratorResearchSpecific?: boolean
) =>
  (await getCollection('taxonomy')).filter((d) =>
    d.data.id === '/' || isAcceleratorResearchSpecific === undefined
      ? true
      : isAcceleratorResearchSpecific
        ? d.data.isAcceleratorResearchSpecific
        : !d.data.isAcceleratorResearchSpecific
  );

export const getTaxonomyRoot = (
  taxonomyEntries: CollectionEntry<'taxonomy'>[]
) => {
  const root = stratify<CollectionEntry<'taxonomy'>>()
    .id((d) => d.id)
    .parentId((d) => {
      return d.data.isA?.id;
    })(taxonomyEntries);

  root.each((node: any) => {
    node.data.descendantsCount = node.descendants().length;
  });
  return root;
};
