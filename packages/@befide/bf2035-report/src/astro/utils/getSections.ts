import { getCollection, type CollectionEntry } from "astro:content"
import { log } from "console"
import { type HierarchyNode, stratify } from "d3-hierarchy"


const sortByPath = (
  s1: CollectionEntry<"sections">,
  s2: CollectionEntry<"sections">,
) => getSlug(s1).localeCompare(getSlug(s2))

export function getSlug(section: CollectionEntry<"sections">) {
  if (!section?.slug) return

  let slug = section.id.replace(/\.mdx?/, "/")

  return slug
}


export function getPath(section: CollectionEntry<"sections">) {

  return "/" + getSlug(section)

}

// const normalizeSlug = (slug = "") => {
//   return (
//     "/" +
//     slug.replaceAll("--00--", "--").replaceAll("--", "/").replace("index", "")
//   )
// }

// const getIdParts = (section: CollectionEntry<"sections">) => {
//   return normalizeSlug(section.id)
//     .split("/")
//     .filter((p, i) => i === 1 || /^[0-9]*$/.test(p))
// }

// export const getParentPath = (section: CollectionEntry<"sections">) => {
//   return getPathParts(section).slice(0, -1).join()
// }

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

  console.log({currentPath, currentSectionIndex});
  

  let prevSectionIndex = currentSectionIndex - 1

  while (prevSectionIndex >= 0 && sections[prevSectionIndex].data.excludeFromTour) {
    prevSectionIndex--
  }
  if (prevSectionIndex === -1) prevSectionIndex = sections.length - 1

  let nextSectionIndex = currentSectionIndex + 1
  while (
    nextSectionIndex < sections.length && sections[nextSectionIndex].data.excludeFromTour
  ) {
    nextSectionIndex++
  }

  log({nextSectionIndex})

  if (nextSectionIndex === sections.length - 1) nextSectionIndex = 0

  return {
    home: sections[0],
    prev: sections[prevSectionIndex],
    current: sections[currentSectionIndex],
    next: sections[nextSectionIndex],
  }
}

export type SectionTreeNode = HierarchyNode<CollectionEntry<"sections">>

export async function getSectionsTreeRoot(): Promise<SectionTreeNode> {

  const sections = await getSections()

  const filteredSections = sections.filter(s => !s.data.excludeFromToc)

  const root = stratify<CollectionEntry<"sections">>().path((d) => getPath(d))(
    filteredSections,
  )

  return root
}
