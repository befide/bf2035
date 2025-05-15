import { $coursesIndex } from "./courses"
import { $communityIndex } from "./community"
import { $taxonomyIndex } from "./taxonomy"
import { $thesesIndex } from "./theses"
import { $facilitiesIndex } from "./facilities"
import { $organizationsIndex } from "./organizations"

export const getCollectionIndex = (collection: string | undefined) => {
  if (!collection) return null
  if (collection === "taxonomy") return $taxonomyIndex
  if (collection === "facilities") return $facilitiesIndex
  if (collection === "community") return $communityIndex
  if (collection === "organizations") return $organizationsIndex
  if (collection === "theses") return $thesesIndex
  if (collection === "courses") return $coursesIndex
  return null
}
