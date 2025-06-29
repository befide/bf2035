import { getCollection, getEntry } from "astro:content"

import { getLocalizedValue, getTaxonomyReferencesTerm } from "../content"
import type { OrganizationSchema } from "@/astro/domain"

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
  with_theses: boolean
  facilities_count: number
  with_facilities: boolean
  userFacilities_count: number
  with_userFacilities: boolean
  weeklySemesterHours_count: number
  with_teachingEvents: boolean
  people_count: number
}

export class Organization {
  _data: OrganizationSchema

  constructor(data: OrganizationSchema) {
    this._data = data
  }

  async getTheses() {
    return await getCollection(
      "theses",
      ({ data }) => data.degree.grantedBy__organizationsId === this._data.id
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

    const theses_count = (await this.getTheses()).length
    const facilities_count = (await this.getFacilities()).length
    const userFacilities_count = (await this.getUserFacilities()).length
    const teachingEvents = (await this.getTeachingEvents()).map((d) => d.data)
    const weeklySemesterHours_count = sum(
      teachingEvents.map((d) => d.weeklySemesterHours)
    )

    return {
      id: this._data.id,
      instanceOfs__term: await getTaxonomyReferencesTerm(
        this._data.instanceOfs__taxonomyId,
        locale
      ),
      theses_count,
      with_theses: theses_count > 0,
      facilities_count,
      with_facilities: facilities_count > 0,
      userFacilities_count,
      with_userFacilities: userFacilities_count > 0,
      weeklySemesterHours_count,
      with_teachingEvents: weeklySemesterHours_count > 0,
      parent__id: this._data.parent__id,
      label__short: getLocalizedValue(this._data, "label.short", locale),
      label__fullName: getLocalizedValue(this._data, "label.fullName", locale),
      location__country: i18n?.data[
        "country.name." + this._data.location?.country?.code
      ] as string,
      location__city: this._data.location?.city as string,
      people_count: this._data.uniquePeopleCountRecursiveSum?.total || 0,
    }
  }
}
