import { computed, task } from "nanostores"
import { $locale } from "./locale"
import crossfilter from "crossfilter2"

export const $facilities = computed($locale, (locale) =>
  task(async () => {
    return await fetch("/api/" + locale + "/facilities.json").then((response) => {
      return response.json()
    })
  }),
)

export const $facilitiesIndex = computed($facilities, (facilities) =>
  task(async () => {
    return crossfilter((await facilities) || [])
  }),
)
