export type Organizations = Organization[]

export interface Organization {
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
import { $locale } from "./locale"
import crossfilter from "crossfilter2"

export const $organizations = computed($locale, (locale) =>
  task(async () => {
    return await fetch("/api/" + locale + "/organizations.json").then((response) => {
      return response.json()
    })
  }),
)

export const $organizationsIndex = computed($organizations, (organizations) =>
  task(async () => {
    return crossfilter((await organizations) || [])
  }),
)
