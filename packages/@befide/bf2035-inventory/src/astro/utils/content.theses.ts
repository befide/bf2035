import { getCollection, getEntry } from "astro:content"
import { descending, ascending } from "d3-array"

const translations: Record<string, Record<string, string>> = {
  ":male": {
    en: "male",
    de: "männlich",
  },
  ":female": {
    en: "female",
    de: "weiblich",
  },
  en: {
    en: "English",
    de: "Englisch",
  },
  de: {
    en: "German",
    de: "Deutsch",
  },
}
const translate = (key: string, locale: string) => {
  return translations[key] ? translations[key][locale] : key
}

export const allTheses = async () =>
  (await getCollection("theses"))
    .sort((a, b) => ascending(a.data.author.familyName, b.data.author.familyName))
    .sort((a, b) => descending(a.data.year, b.data.year))

export const thesesForeAPI = async (locale: "en" | "de") => {
  const theses = await allTheses()

  return await Promise.all(
    theses.map(async (thesis) => {
      const university =
        thesis.data.universityRef && (await getEntry(thesis.data.universityRef)).data
      const organizations = (
        await Promise.all(thesis.data.organizationRefs.map(async (d) => await getEntry(d)))
      ).map((d) => d.data)
      const facilities = (
        await Promise.all(thesis.data.facilityRefs.map(async (d) => await getEntry(d)))
      )
        .filter((d) => !!d)
        .map((d) => d.data)

      return {
        reference: thesis.data.citationKey,
        title: thesis.data.title,
        author: {
          familyName: thesis.data.author.familyName,
          givenName: thesis.data.author.givenName,
          gender: translate(thesis.data.author.gender, locale),
        },
        language: translate(thesis.data.language, locale),
        year: thesis.data.year,
        university: university?.label.short[locale],
        organizations: organizations?.map((d) => d.label.short[locale]),
        facilities: facilities?.map((d) => d.label.short[locale]),

        degree: thesis.data.thesisType.indexOf("Ing.") > -1 ? "Dr.-Ing." : "Dr. rer. nat.",
      }
    }),
  )
}

export const allThesesForUniversity = async (universityId: string) =>
  (
    await getCollection(
      "theses",
      (entry) => entry.data.organizationRefs.map((o) => o?.id).indexOf(universityId) > -1,
    )
  )
    .sort((a, b) => ascending(a.data.author.familyName, b.data.author.familyName))
    .sort((a, b) => descending(a.data.year, b.data.year))
