import { getEntry } from "astro:content"

import { getLocalizedValue } from "../content"
import type { CourseSchema } from "@/astro/domain"
import { getValueTranslation } from ".."

export type Courses = Course[]

export type CourseDto = Pick<CourseSchema, "id" | "weeklySemesterHours"> & {
  title: string
  teachingEvent__term: string
  university__label_short: string
  languages: string[]
  semesters: string[]
  link: string
  studyLevel__terms: string[]
}

export class Course {
  _data: CourseSchema

  constructor(data: CourseSchema) {
    this._data = data
  }

  async getDto(locale: string): Promise<CourseDto> {
    const university__label_short =
      this._data.university_organizationId &&
      getLocalizedValue(
        await getEntry("organizations", this._data.university_organizationId),
        "data.label.short",
        locale
      )
    const teachingEvent__term =
      this._data.teachingEvent_taxonId &&
      getLocalizedValue(
        await getEntry("taxonomyItems", this._data.teachingEvent_taxonId),
        "data.term",
        locale
      )

    const studyLevel__terms = await Promise.all(
      this._data.studyLevel_taxonIds.map(
        async (d: string) => await getEntry("taxonomyItems", d)
      )
    )
    // .filter((item: CollectionEntry<"taxonomyItems">) => !!item)
    // .map((taxon: CollectionEntry<"taxonomyItems">) =>
    //   getLocalizedValue(taxon, "data.term", locale)
    // )

    return {
      id: this._data.id,
      weeklySemesterHours: this._data.weeklySemesterHours,
      title: getLocalizedValue(this._data, "title", locale),
      teachingEvent__term,
      languages: this._data.languages.map((d) =>
        getValueTranslation(d, locale)
      ),
      studyLevel__terms: studyLevel__terms,
      link: (getLocalizedValue(this._data, "links.homepage", locale) ||
        this._data.links.homepage.de) as string,
      university__label_short,
      semesters: this._data.semesters.map((d) =>
        getValueTranslation(d, locale)
      ),
    }
  }
}
