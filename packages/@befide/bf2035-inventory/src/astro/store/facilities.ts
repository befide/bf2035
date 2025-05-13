
import { computed, task } from "nanostores"
import { $locale } from "./locale"

export const $facilities = computed($locale, (locale) =>
  task(async () => {
    return await fetch("/api/" + locale + "/facilities.json").then((response) => {
      return response.json()
    })
  }),
)
