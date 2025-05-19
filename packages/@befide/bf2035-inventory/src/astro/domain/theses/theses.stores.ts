export type Theses = Thesis[]

export interface Thesis {
  title: string
  author: Author
  language: string
  year: number
  university: string
  organizations: string[]
  facilities: string[]
  degree: string
}

export interface Author {
  familyName: string
  givenName: string
  gender: string
}

import crossfilter from "crossfilter2"
import { computed, task } from "nanostores"
import { $locale } from "@nanostore/locale"

export const $theses = computed($locale, (locale) =>
  task(async () => {
    return await fetch("/" + locale + "/api/theses.json").then((response) => {
      return response.json()
    })
  }),
)

export const $thesesIndex = computed($theses, (theses) =>
  task(async () => {
    return crossfilter(theses || [])
  }),
)
