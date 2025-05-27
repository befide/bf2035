import type {
  
  FacilitySchema
} from "@/astro/domain/facilities/facilities.config"
import { getCollection, getEntry } from "astro:content"

import { flattenTreeNodes, getRoots } from "../content.tree"
import { ascending } from "d3"
import { getLocalizedValue } from "../content"

export const getFacilities = async (options: {
  hostId?: string
  isUserFacility?: boolean
  lifeCycleCategory?: number
}) =>
  await getCollection("facilities", ({ data }) => {
    return (
      (options.hostId === undefined || data.host_id === options.hostId) &&
      (options.isUserFacility === undefined ||
        data.isUserFacility === options.isUserFacility) &&
      (options.lifeCycleCategory === undefined ||
        !data.lifeCycle?.currentStatusTaxon_id ||
        data.lifeCycle?.currentStatusTaxon_id.indexOf(
          "/" + options.lifeCycleCategory
        ) > -1)
    )
  })

export const getFacilityRoots = (items: FacilitySchema[]) => {
  return getRoots<FacilitySchema>(items)
}

export const facilitiesForAPI = async (locale: string) => {
  const facilities = (await getFacilities({})).map((d) => d.data)

  const expandedFacilities = await Promise.all(
    facilities.map(async (facility) => ({
      ...facility,
      // isInstanceOf_id: facility.isInstanceOf_id,
      host_label:
        facility.host_id &&
        getLocalizedValue(
          await getEntry("organizations", facility.host_id),
          "data.label.short",
          locale
        ),
      instanceOf_label:
        facility.instanceOfTaxon_id &&
        getLocalizedValue(
          await getEntry("taxonomyItems", facility.instanceOfTaxon_id),
          "data.term",
          locale
        ),
      currentStatus_label:
        facility.lifeCycle.currentStatusTaxon_id &&
        getLocalizedValue(
          await getEntry(
            "taxonomyItems",
            facility.lifeCycle.currentStatusTaxon_id
          ),
          "data.term",
          locale
        ),
      lifeCycle: {
        ...facility.lifeCycle
      }
    }))
  )

  const roots = getFacilityRoots(expandedFacilities)

  const list = flattenTreeNodes(roots)
    .toSorted((a, b) => ascending(a.id, b.id))
    .map((item) => ({
      id: item.id,
      depth: item.depth,
      height: item.children.length,
      parent_id: item.data.parent_id,
      predecessor_id: item.data.predecessor_id,

      label: getLocalizedValue(item, "data.label", locale),
      tagLine: getLocalizedValue(item, "data.tagLine", locale),
      currentStatus_label: item.data.currentStatus_label,
      operation_startYear: item.data.lifeCycle.operation?.startYear,
      operation_endYear: item.data.lifeCycle.operation?.endYear,
      instanceOf_label: item.data.instanceOf_label,
      isUserFacility: item.data.isUserFacility,
      isBMBF_FIS: item.data.isBMBF_FIS,

      ...item.data.parameters
    }))

  return list
}
