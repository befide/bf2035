import type {Facility} from "@/content.config.facilities"
import {getCollection} from "astro:content"

import {getRoots} from "./content.tree"


export const getFacilities = async (options: {
  hostId?: string;
  isUserFacility?: boolean;
  lifeCycleCategory?: number;
}) => (
    await getCollection ("facilities",
        ({data}) => {
          console.log (options.lifeCycleCategory)
          return (options.hostId === undefined || data.hasHost?.id === options.hostId) &&
              (options.isUserFacility === undefined ||
                  data.isUserFacility === options.isUserFacility) &&
              (options.lifeCycleCategory === undefined ||
                  !data.lifeCycle?.currentStatus || data.lifeCycle?.currentStatus?.id.indexOf ("/" + options.lifeCycleCategory) > -1)
        })
)

export const getFacilityRoots = (items: Facility[]) => {
  return getRoots<Facility> (items)
}
