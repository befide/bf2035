import { type CollectionEntry, getCollection, getEntry } from "astro:content"

import { getLocalizedValue } from "../content"
import type { OrganizationSchema } from "./organizations.config"
import { getOrganizationTree } from "./organizations"
import { sum } from "d3-array"

export type OrganizationDto = Pick<
  OrganizationSchema,
  "uniquePeopleCountRecursiveSum"
> & {
  id: string
  parent__id: string | null
  instanceOfs__term: string[]
  label__fullName: string
  label__short: string
  location__country: string
  location__city: string
  theses_count: number
  facilities_count: number
  userFacilities_count: number
  weeklySemesterHours_count: number
  people_count: number
}

export class Organization {
  _data: OrganizationSchema

  constructor(data: OrganizationSchema) {
    this._data = data
  }

  async getOrganizationTree() {
    return await getOrganizationTree(this._data.id)
  }

  async getTheses() {
    return await getCollection(
      "theses",
      ({ data }) => data.university__organizationsId === this._data.id
    )
  }

  async getFacilities() {
    return await getCollection(
      "facilities",
      ({ data }) => data.host__organizationsId === this._data.id
    )
  }
  async getUserFacilities() {
    return (await this.getFacilities()).filter(
      ({ data }) => data.isUserFacility
    )
  }
  async getTeachingEvents() {
    return await getCollection(
      "courses",
      ({ data }) => data.university__organizationsId === this._data.id
    )
  }

  async getDto(locale: string): Promise<OrganizationDto> {
    const i18n = await getEntry("i18n", locale)

    const instanceOfs__term = (
      (await Promise.all(
        this._data.instanceOfs__taxonomyId.map(
          async (d) => await getEntry("taxonomyItems", d)
        )
      )) as CollectionEntry<"taxonomyItems">[]
    )
      .filter((taxon: CollectionEntry<"taxonomyItems">) => !!taxon)
      .map((taxon: CollectionEntry<"taxonomyItems">) =>
        getLocalizedValue(taxon, "data.term", locale)
      )

    const theses_count = (await this.getTheses()).length
    const facilities_count = (await this.getFacilities()).length
    const userFacilities_count = (await this.getUserFacilities()).length
    const teachingEvents = (await this.getTeachingEvents()).map((d) => d.data)
    const weeklySemesterHours_count = sum(
      teachingEvents.map((d) => d.weeklySemesterHours)
    )

    return {
      id: this._data.id,
      instanceOfs__term,
      theses_count,
      facilities_count,
      userFacilities_count,
      weeklySemesterHours_count,
      parent__id: this._data.parent__id,
      label__short: getLocalizedValue(this._data, "label.short", locale),
      label__fullName: getLocalizedValue(this._data, "label.fullName", locale),
      location__country: i18n?.data[
        "country.name." + this._data.location?.country?.code
      ] as string,
      location__city: this._data.location?.city as string,
      people_count: await this.getOrganizationTree().then(
        (d) => d.data.uniquePeopleCountRecursiveSum?.total
      ),
    }
  }
}
