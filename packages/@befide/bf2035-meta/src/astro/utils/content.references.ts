import { getCollection } from "astro:content"
import { ascending } from "d3-array"

export const allReferences = async () =>
  (await getCollection("references")).sort((a, b) =>
    ascending(a.data.citationKey, b.data.citationKey)
  )

export const thesesForeAPI = async () => {
  const references = await allReferences()

  return references.map((thesis) => {
    return {
      itemType: thesis.data.itemType,
      title: thesis.data.title,
      year: thesis.data.year,
      organizationIds: thesis.data.organizationRefs.map((d) => d?.id),
      facilityIds: thesis.data.facilityRefs.map((d) => d?.id),
    }
  })
}
