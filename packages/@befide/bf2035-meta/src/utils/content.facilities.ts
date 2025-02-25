import type { Facility } from '@/content.config.facilities'
import { getCollection } from 'astro:content'

import { getRoots } from './content.tree'

export const getFacilities = async (options: {
  hostId?: string
  isUserFacility?: boolean
  lifeCycleCategory?: number
}) =>
  (await getCollection('facilities'))
    .filter(
      (d) =>
        (options.hostId === undefined ||
          d.data.hasHost?.id === options.hostId) &&
        (options.isUserFacility === undefined ||
          d.data.isUserFacility === options.isUserFacility) &&
        (options.lifeCycleCategory === undefined ||
          d.data.lifeCycle!.id.indexOf('/' + options.lifeCycleCategory) > -1)
    )

    .map((d) => d.data)
    .sort((a, b) => a.label.fullName.en.localeCompare(b.label.fullName.en))

export const getFacilityRoots = (items: Facility[]) => {
  return getRoots<Facility>(items)
}
