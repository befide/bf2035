import { computed, task } from "nanostores"
import { $community } from "./community"
import crossfilter from "crossfilter2"

export const $communityIndex = computed($community, (community) =>
  task(async () => {
    return crossfilter((await community) || [])
  }),
)
