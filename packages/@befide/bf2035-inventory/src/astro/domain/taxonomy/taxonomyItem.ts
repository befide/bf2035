import { getCollection } from "astro:content"

import { getLocalizedValue, getValue } from "../content"

import type { TaxonomyItemSchema } from "@utils/taxonomy/taxonomy.config.ts"
import { getTaxonomyItemRoots } from "@utils/taxonomy/taxonomy.ts"
import type { NestableDomainObjectSchema } from "@content/config.common.ts"

export type TaxonomyItemDto = NestableDomainObjectSchema & {
  id: string
  parent__id: string | null
  term: string
  definition: string
  abbreviations: string[]
  synonyms: string[]
  taxonomyURI: string
}

export class TaxonomyItem {
  _data: TaxonomyItemSchema

  constructor(data: TaxonomyItemSchema) {
    this._data = data
  }

  async getTaxonomyItemTree() {
    const children = (await getCollection("taxonomyItems")).map((d) => d.data)

    return getTaxonomyItemRoots(children)
  }

  async getDto(locale: string): Promise<TaxonomyItemDto> {
    return {
      id: this._data.id,
      parent__id: this._data.parent__id,
      term: getLocalizedValue(this._data, "term", locale),
      definition: getLocalizedValue(this._data, "definition", locale),
      synonyms: this._data.synonyms[locale],
      abbreviations: this._data.abbreviations[locale],
      taxonomyURI: getValue(this._data, "taxonomyURI"),
    }
  }
}
