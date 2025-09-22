import { getCollection } from "astro:content"
import { descending, ascending } from "d3-array"

export const allTheses = async () =>
  (await getCollection("theses"))
    .sort((a, b) =>
      ascending(a.data.author.familyName, b.data.author.familyName)
    )
    .sort((a, b) => descending(a.data.year, b.data.year))

export const thesesForeAPI = async () => {
  const theses = await allTheses()

  return theses.map((thesis) => {
    return {
      title: thesis.data.title,
      author: thesis.data.author,
      language: thesis.data.language,
      year: thesis.data.year,
      universityId: thesis.data.universityRef?.id,
      organizationIds: thesis.data.organizationRefs.map((d) => d?.id),
      facilityIds: thesis.data.facilityRefs.map((d) => d?.id),
      degree:
        thesis.data.thesisType.indexOf("Ing.") > -1
          ? "Dr.-Ing."
          : "Dr. rer. nat.",
    }
  })
}

export const allThesesForUniversity = async (universityId: string) =>
  (
    await getCollection(
      "theses",
      (entry) =>
        entry.data.organizationRefs.map((o) => o?.id).indexOf(universityId) > -1
    )
  )
    .sort((a, b) =>
      ascending(a.data.author.familyName, b.data.author.familyName)
    )
    .sort((a, b) => descending(a.data.year, b.data.year))
