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

import { atom, onMount, task } from "nanostores"

export const $taxonomy = atom<Taxonmomy>([])

onMount($taxonomy, () => {
  task(async () => {
    
    $taxonomy.set(
      await fetch("/api/en/taxonomy.json").then((response) => {
        return response.json()
      }),
    )
  })
})
  3