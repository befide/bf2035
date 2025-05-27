import { getCollection, getEntry } from "astro:content"

import { getLocalizedValue } from "../content"
import type { OrganizationSchema } from "./organizations.config"

export type OrganizationDto = {
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

  async getTheses() {
    return await getCollection(
      "theses",
      ({ data }) => data.university_organizationsId === this._data.id
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
    return {
      id: this._data.id,
      instanceOfs__term,
      theses_count,
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
