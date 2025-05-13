import { computed } from "nanostores"
import { $taxonomy } from "./taxonomy"
import crossfilter from "crossfilter2"

export const $taxonomyIndex = computed($taxonomy, (taxonomy) => {

  return crossfilter(taxonomy)
})
