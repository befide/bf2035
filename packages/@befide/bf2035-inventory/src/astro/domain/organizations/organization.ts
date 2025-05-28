import { getCollection, getEntry } from "astro:content"

import { getLocalizedValue } from "../content"
import type { OrganizationSchema } from "./organizations.config"
import {
  getOrganizationRoots,
  rollupUniquePeopleCountSum,
} from "./organizations"

export type OrganizationDto = Pick<
  OrganizationSchema,
  "uniquePeopleCountRecursiveSum"
> & {
  id: string
  parent_id: string | null
  instanceOfs__term: string[]
  label__fullName: string
  label__short: string
  location__country: string
  location__city: string
  theses_count: number
  facilities_count: number
}

export class Organization {
  _data: OrganizationSchema

  constructor(data: OrganizationSchema) {
    this._data = data
  }

  async getOrganizationTree() {
    const children = (
      await getCollection(
        "organizations",
        ({ data, id }) =>
          data.topLevel_organizationId === this._data.topLevel_organizationId ||
          id === this._data.id
      )
    ).map((d) => d.data)

    const root = getOrganizationRoots(children)
    rollupUniquePeopleCountSum(root)
  }

  async getTheses() {
    return await getCollection(
      "theses",
      ({ data }) => data.university_organizationsId === this._data.id
    )
  }

  async getFacilities() {
    return await getCollection(
      "facilities",
      ({ data }) => data.host_id === this._data.id
    )
  }

  async getDto(locale: string): Promise<OrganizationDto> {
    const i18n = await getEntry("i18n", locale)

    const instanceOfs__term = (
      await Promise.all(
        this._data.instanceOf_taxonId.map(
          async (d) => await getEntry("taxonomyItems", d)
        )
      )
    )
      .filter((taxon) => !!taxon)
      .map((taxon) => getLocalizedValue(taxon, "data.term", locale))

    const theses_count = (await this.getTheses()).length
    const facilities_count = (await this.getFacilities()).length
    // const facilties =
    return {
      id: this._data.id,
      instanceOfs__term,
      theses_count,
      facilities_count,
      parent_id: this._data.parent_id,
      label__short: getLocalizedValue(this._data, "label.short", locale),
      label__fullName: getLocalizedValue(this._data, "label.fullName", locale),
      location__country: i18n?.data[
        "country.name." + this._data.location?.country?.code
      ] as string,
      location__city: this._data.location.city as string,
    }
  }
}
