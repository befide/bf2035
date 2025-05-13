import { computed, task } from "nanostores"
import { $taxonomy } from "./taxonomy"
import crossfilter from "crossfilter2"

export const $taxonomyIndex = computed($taxonomy, (taxonomy) =>
  task(async () => {
    return crossfilter((await taxonomy || []))
  }),
)
