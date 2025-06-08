import {
  type CollectionEntry,
  type CollectionKey,
  getEntry,
} from "astro:content"

export function getValue(obj: any, path: string) {
  const pathParts = path.split(".")
  for (let i = 0; i < pathParts.length; i++) {
    if (pathParts[i]! in obj) obj = obj[pathParts[i]!]
    else return
  }
  return obj
}

export function getLocalizedValue(obj: any, path: string, locale = "en") {
  if (!obj) {
    return obj as string
  }

  const pathParts = (path + "." + locale).split(".")
  for (let i = 0; i < pathParts.length; i++) {
    if (pathParts[i]! in obj) obj = obj[pathParts[i]!]
    else return obj as string
  }
  return obj as string
}

export async function getReferences(collection: CollectionKey, ids: string[]) {
  return (
    await Promise.all(
      ids.map(async (id: string) => await getEntry(collection, id))
    )
  ).filter((item: unknown) => !!item)
}

export async function getReferencesLocalizedValue(
  collection: CollectionKey,
  ids: string[],
  path: string,
  locale = "en"
) {
  return (await getReferences(collection, ids)).map(
    (referencedObject: CollectionEntry<collection>) =>
      getLocalizedValue(referencedObject, path, locale)
  )
}
