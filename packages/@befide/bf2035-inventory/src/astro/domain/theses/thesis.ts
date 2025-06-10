import { getEntry } from "astro:content"
import { getValueTranslation } from ".."
import { getLocalizedValue, getReferencesLocalizedValue } from "../content"
import type { ThesisSchema } from "./theses.config.api"

export type Theses = Thesis[]

export type ThesisDto = Pick<
  ThesisSchema,
  "id" | "title" | "year" | "fulltextLink" | "author" | "language"
> & {
  university__label_short: string
  organizations__label_short: string[]
  facilities__label_short: string[]
  degree: string
}

export interface Author {
  familyName: string
  givenName: string
  gender: string
}

export class Thesis {
  _data: ThesisSchema
  constructor(data: ThesisSchema) {
    this._data = data
  }

  async getDto(locale: string): Promise<ThesisDto> {
    const university__label_short =
      (this._data.university__organizationsId &&
        getLocalizedValue(
          await getEntry(
            "organizations",
            this._data.university__organizationsId
          ),
          "data.label.short",
          locale
        )) ||
      getValueTranslation(this._data.publisher, locale)

    const organizations__label_short = await getReferencesLocalizedValue(
      "organizations",
      this._data.organizations__organizationsId,
      "data.label.short",
      locale
    )

    const facilities__label_short = await getReferencesLocalizedValue(
      "facilities",
      this._data.facilities__facilityId,
      "data.label",
      locale
    )

    return {
      id: this._data.id,
      title: this._data.title,
      author: {
        familyName: this._data.author.familyName,
        givenName: this._data.author.givenName,
        gender:
          this._data.author.gender &&
          getValueTranslation(this._data.author.gender, locale),
      },
      language: this._data.language,
      year: this._data.year,
      university__label_short,
      organizations__label_short,
      facilities__label_short,
      degree:
        this._data.thesisType.indexOf("Ing.") > -1
          ? "Dr.-Ing."
          : "Dr. rer. nat.",
    }
  }
}
