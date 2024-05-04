import { getCollection } from "astro:content"

const tag2String = (tag: { scope?: string; value: string }) =>
  (tag.scope ? tag.scope + "---" : "") + tag.value

export async function getReferences(tag: { scope?: string; value: string }) {
  const references = await getCollection("references")

  return tag
    ? references.filter((reference) =>
        reference.data.tags?.map(tag2String).includes(tag2String(tag)),
      )
    : references
}
