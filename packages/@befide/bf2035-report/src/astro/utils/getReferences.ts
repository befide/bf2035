import { getCollection } from "astro:content"

export async function getReferences(tag: string) {
  const references = await getCollection("references")
  return tag
    ? references.filter((r) => r.data.tags.indexOf(tag) > -1)
    : references
}
