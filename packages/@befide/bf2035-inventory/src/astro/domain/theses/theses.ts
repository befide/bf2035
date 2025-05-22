import { getCollection, getEntry } from "astro:content"
import { descending, ascending } from "d3-array"
import { getValueTranslation } from ".."
import { getLocalizedValue } from "../content"
import { cleanStores } from "nanostores"

export const allTheses = async () =>
  (await getCollection("theses"))
    .sort((a, b) =>
      ascending(a.data.author.familyName, b.data.author.familyName)
    )
    .sort((a, b) => descending(a.data.year, b.data.year))

export const thesesForeAPI = async (locale = "en") => {
  const theses = await allTheses()

  return await Promise.all(
    theses.map(async (thesis) => {
      const university =
        thesis.data.university_organizationsId &&
        (
          await getEntry(
            "organizations",
            thesis.data.university_organizationsId
          )
        )?.data
      const organizations = (
        await Promise.all(
          thesis.data.organizations__organizationsIds.map(
            async (d) => await getEntry("organizations", d)
          )
        )
      )
        .filter((d) => !!d)
        .map((organization) => organization.data)
      const facilities = (
        await Promise.all(
          thesis.data.facilities_facilitiesIds.map(
            async (id: string) => await getEntry("facilities", id)
          )
        )
      )
        .filter((d) => !!d)
        .map((d) => d.data)

      return {
        reference: thesis.data.citationKey,
        title: thesis.data.title,
        author: {
          familyName: thesis.data.author.familyName,
          givenName: thesis.data.author.givenName,
          gender:
            thesis.data.author.gender &&
            getValueTranslation(thesis.data.author.gender, locale)
        },
        language: getValueTranslation(thesis.data.language, locale),
        year: thesis.data.year,
        university_label:
          (university &&
            getLocalizedValue(university, "label.short", locale)) ||
          getValueTranslation(thesis.data.publisher, locale),
        organizations_label: organizations?.map((d) =>
          getLocalizedValue(d, "label.short", locale)
        ),
        facilities_label: facilities?.map((d) =>
          getLocalizedValue(d, "label", locale)
        ),

        degree:
          thesis.data.thesisType.indexOf("Ing.") > -1
            ? "Dr.-Ing."
            : "Dr. rer. nat."
      }
    })
  )
}

export const allThesesForUniversity = async (universityId: string) =>
  (
    await getCollection(
      "theses",
      (entry) => entry.data.university_organizationsId === universityId
    )
  )
    .sort((a, b) =>
      ascending(a.data.author.familyName, b.data.author.familyName)
    )
    .sort((a, b) => descending(a.data.year, b.data.year))
