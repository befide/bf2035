import { getCollection } from "astro:content"

const tag2String = (tag: { scope?: string; value: string }) =>
  (tag.scope ? tag.scope + "---" : "") + tag.value

export async function getReferences(tag: string) {
  const references = await getCollection("references")

  return tag ? references.filter((r) => r.data.tags?.includes(tag)) : references
}
