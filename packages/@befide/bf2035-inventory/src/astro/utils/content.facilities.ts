import type { Facility } from "@/content/config.facilities"
import { getCollection, getEntry } from "astro:content"

import { flattenTreeNodes, getRoots } from "./content.tree"
import { ascending } from "d3"

export const getFacilities = async (options: {
  hostId?: string
  isUserFacility?: boolean
  lifeCycleCategory?: number
}) =>
  await getCollection("facilities", ({ data }) => {
    return (
      (options.hostId === undefined || data.hasHost?.id === options.hostId) &&
      (options.isUserFacility === undefined || data.isUserFacility === options.isUserFacility) &&
      (options.lifeCycleCategory === undefined ||
        !data.lifeCycle?.currentStatus ||
        data.lifeCycle?.currentStatus?.id.indexOf("/" + options.lifeCycleCategory) > -1)
    )
  })

export const getFacilityRoots = (items: Facility[]) => {
  return getRoots<Facility>(items)
}

export const facilitiesForAPI = async (locale: string) => {
  const facilities = (await getFacilities({})).map((d) => d.data)

  const expandedFacilities = await Promise.all(
    facilities.map(async (facility) => ({
      ...facility,
      instanceOf: facility.isInstanceOf
        ? (await getEntry(facility.isInstanceOf)).data.term[locale]
        : undefined,
      lifeCycle: facility.lifeCycle?.currentStatus
        ? (await getEntry(facility.lifeCycle.currentStatus)).data.term[locale]
        : undefined,
    })),
  )

  const roots = getFacilityRoots(expandedFacilities)

  const list = flattenTreeNodes(roots)
    .toSorted((a, b) => ascending(a.id, b.id))
    .map((item) => ({
      id: item.id,

      depth: item.depth,
      height: item.children.length,
      parentId: item.parentId,

      label: item.data.label.short[locale],
     
      lifeCycle: item.data.lifeCycle,
      isBmbfFis: item.data.isBmbfFis,
      hasHost: item.data.hasHost,
      isUserFacility: item.data.isUserFacility,

      instanceOf: item.data.instanceOf,
      
      primaryBeamParticles: item.data.primaryBeamParticles,
      secondaryBeamParticles: item.data.secondaryBeamParticles,
    }))

  return list
}
