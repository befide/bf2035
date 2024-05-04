import { getCollection, type CollectionEntry } from "astro:content"
import { type HierarchyNode, stratify } from "d3-hierarchy"

const sortByPath = (
  s1: CollectionEntry<"sections">,
  s2: CollectionEntry<"sections">,
) => getPath(s1).localeCompare(getPath(s2))

export const getPath = (section: CollectionEntry<"sections">) => {
  if (!section?.slug) return

  return (getPathParts(section).join("/") + "/").replaceAll("//", "/")
}

const normalizeSlug = (slug = "") => {
  return (
    "/" +
    slug.replaceAll("--00--", "--").replaceAll("--", "/").replace("index", "")
  )
}

const getPathParts = (section: CollectionEntry<"sections">) => {
  return normalizeSlug(section.slug)
    .split("/")
    .filter((p, i) => i === 1 || /^[0-9]*$/.test(p))
}

export const getParentPath = (section: CollectionEntry<"sections">) => {
  return getPathParts(section).slice(0, -1).join()
}

export async function getSections() {
  const sections = await getCollection("sections")
  sections.sort(sortByPath)
  return sections
}

export async function getPrevNext(currentPath = "") {
  const sections = await getSections()

  const currentSectionIndex = sections.findIndex(
    (section) => getPath(section) === currentPath,
  )

  let prevSectionIndex = currentSectionIndex - 1

  while (prevSectionIndex >= 0 && sections[prevSectionIndex].data.virtual)
    prevSectionIndex--
  if (prevSectionIndex === -1) prevSectionIndex = sections.length - 1

  let nextSectionIndex = currentSectionIndex + 1
  while (
    nextSectionIndex < sections.length &&
    sections[nextSectionIndex].data.virtual
  )
    nextSectionIndex++
  if (nextSectionIndex === sections.length - 1) nextSectionIndex = 0

  return {
    prev: sections[prevSectionIndex],
    current: sections[currentSectionIndex],
    next: sections[nextSectionIndex],
  }
}

export type SectionTreeNode = HierarchyNode<CollectionEntry<"sections">>

export async function getSectionsTreeRoot(): Promise<SectionTreeNode> {
  const sections = await getSections()

  const root = stratify<CollectionEntry<"sections">>().path((d) => getPath(d))(
    sections,
  )

  return root
}
