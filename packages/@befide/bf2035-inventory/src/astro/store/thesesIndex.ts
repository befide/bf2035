import { computed } from "nanostores"
import { $theses } from "./theses"
import crossfilter from "crossfilter2"

export const $thesesIndex = computed($theses, (theses) => {
  // console.log(theses)
  return crossfilter(theses)
})
