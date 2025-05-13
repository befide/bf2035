import { computed, task } from "nanostores"
import { $facilities } from "./facilities"
import crossfilter from "crossfilter2"

export const $facilitiesIndex = computed($facilities, (facilities) =>
  task(async () => {
    return crossfilter((await facilities) || [])
  }),
)
