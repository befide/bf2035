export type Taxonmomy = TaxonmomyItem[]

export interface TaxonmomyItem {
  id: string
  parentId: string
  depth: number
  height: number
  isDomainSpecific: boolean
  type: "class" | "instance"
  term: { de: string; en: string }
  definition: { de: string; en: string }
  synonyms: { de: string; en: string }
  reviewStatus: string
  reviewReviewer: string
}

import { computed, task } from "nanostores"
import crossfilter from "crossfilter2"
import { $locale } from "./locale"

export const $taxonomy = computed($locale, (locale) =>
  task(async () => {
    return await fetch("/api/" + locale + "/taxonomy.json").then((response) => {
      return response.json()
    })
  }),
)

export const $taxonomyIndex = computed($taxonomy, (taxonomy) =>
  task(async () => {
    return crossfilter((await taxonomy) || [])
  }),
)
