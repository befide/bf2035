import { computed, task } from "nanostores"
import crossfilter from "crossfilter2"
import { $locale } from "@nanostore/locale"

export const $taxonomy = computed($locale, (locale) =>
  task(async () => {
    return await fetch("/" + locale + "/api/taxonomy.json").then((response) => {
      return response.json()
    })
  })
)

export const $taxonomyIndex = computed($taxonomy, (taxonomy) =>
  task(async () => {
    debugger;
    return crossfilter((await taxonomy) || [])
  })
)
