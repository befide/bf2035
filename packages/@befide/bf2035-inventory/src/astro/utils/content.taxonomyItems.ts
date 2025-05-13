import type { TaxonomyItem } from "@/content/config.taxonomyItems"
import { getCollection } from "astro:content"

import { flattenTreeNodes, getRoots } from "./content.tree"
import { getValue } from "./index"

export const taxonomyItemRoots = async (isDomainSpecific: boolean | null, lang = "en") => {
  
  const items = (
    await getCollection(
      "taxonomyItems",
      ({ data }) => isDomainSpecific === null || data.isDomainSpecific === isDomainSpecific,
    )
  )
    .map((d) => d.data)
    .sort((a, b) => getValue(a, "term." + lang).localeCompare(getValue(b, "term." + lang), lang))

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

export const taxonomyForAPI = async (locale?: string) => {
  const roots = await taxonomyItemRoots(null, locale)

  const list = flattenTreeNodes(roots).map((item) => ({
    id: item.id,
    depth: item.depth,
    height: item.children.length,
    parentId: item.parentId,
    label: item.data.term[locale],
    term: item.data.term,
    definition: item.data.definition,
    synonyms: item.data.synonyms,
    type: item.id.indexOf(":") > -1 ? "instance" : "class",
    isDomainSpecific: !!item.data.isDomainSpecific,
    reviewStatus: item.data.review.status.id,
    reviewReviewer: item.data.review.reviewer,
  }))

  return list
}
