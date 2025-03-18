import type { TaxonomyItem } from '@/content.config.taxonomyItems'
import { getCollection } from 'astro:content'

import { getRoots } from './content.tree'
import { getValue } from './content'

export const taxonomyItemRoots = async (
  isDomainSpecific: boolean | null,
  lang = 'en'
) => {
  let items = (
    await getCollection(
      'taxonomyItems',
      ({ data }) => !isDomainSpecific || data.isDomainSpecific === isDomainSpecific
    )
  )
    .map((d) => d.data)
    .sort((a, b) =>
      getValue(a, 'term.' + lang).localeCompare(
        getValue(b, 'term.' + lang),
        lang
      )
    )

  return getTaxonomyItemRoots(items)


}

// export const genericTaxonomyItemRoots = async () => {
//   let items = (await (getCollection(
//     "taxonomyItems", ({ data }) => data.id === "/" || data.isAcceleratorResearchSpecific === false
//   ))).map(d => d.data)

//   return getTaxonomyItemRoots(items)
//   // return flattenTreeNodes(roots)
// }
export const getTaxonomyItemRoots = (items: TaxonomyItem[]) => {
  return getRoots<TaxonomyItem>(items)
}
