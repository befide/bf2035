import { computed, task } from "nanostores"
import { $organizations } from "./organizations"
import crossfilter from "crossfilter2"

export const $organizationsIndex = computed($organizations, (organizations) =>
  task(async () => {
    return crossfilter((await organizations) || [])
  }),
)
