import type { TaxonomyItem } from '@/content.config.taxonomy'
import { type CollectionEntry, getCollection } from 'astro:content'

import { getRoots } from './content.tree'

export const getTaxonomyItems = async (options: {
  isAcceleratorResearchSpecific: boolean
}) =>
  (await getCollection('taxonomyItems'))
    .filter(
      (d) =>
        options.isAcceleratorResearchSpecific === undefined ||
        d.data.isAcceleratorResearchSpecific ==
          options.isAcceleratorResearchSpecific
    )
    .map((d) => d.data)

export const getTaxonomyRoots = (items: TaxonomyItem[]) => {
  return getRoots<TaxonomyItem>(items)
}
