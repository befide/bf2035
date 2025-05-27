import type { TaxonomyItemSchema } from "@/astro/domain/taxonomy/taxonomy.config"
import { getCollection } from "astro:content"

import { flattenTreeNodes, getRoots } from "../content.tree"
import { getValue } from "../index"
import { getLocalizedValue } from "../content"

export const taxonomyItemRoots = async (lang = "en") => {
  
  const items = (
    await getCollection(
      "taxonomyItems"    )
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
export const getTaxonomyItemRoots = (items: TaxonomyItemSchema[]) => {
  return getRoots<TaxonomyItemSchema>(items)
}

export const taxonomyForAPI = async (locale?: string) => {
  const roots = await taxonomyItemRoots(locale)
  const list = flattenTreeNodes(roots).map((item) => ({
    id: item.id,
    depth: item.depth,
    height: item.children.length,
    parent_id: item.data.parent_id,
    label: getLocalizedValue(item, "data.term", locale),
    definition: getLocalizedValue(item, "data.definition", locale),
    synonyms: item.data.synonyms,
    type: item.id.indexOf(":") > -1 ? "instance" : "class",
    taxonomyURI: item.data.taxonomyURI,
    reviewStatus: item.data.review.status_id,
    reviewReviewer: item.data.review.reviewer
  }))

  return list
}


export type Taxonmomy = TaxonmomyItem[]

export interface TaxonmomyItem {
  id: string
  parent_id: string
  depth: number
  height: number
  taxonomyURI: string
  type: "class" | "instance"
  term: { de: string; en: string }
  definition: { de: string; en: string }
  synonyms: { de: string; en: string }
  reviewStatus: string
  reviewReviewer: string
}
