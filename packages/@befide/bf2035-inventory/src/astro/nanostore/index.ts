import { $coursesIndex } from "@domain/courses/courses.stores"
import { $taxonomyIndex } from "@domain/taxonomy/taxonomy.stores"
import { $thesesIndex } from "@domain/theses/theses.stores"
import { $facilitiesIndex } from "@domain/facilities/facilities.stores"
import { $communityIndex } from "@domain/organizations/community.stores"
import { $organizationsIndex } from "@domain/organizations/organizations.stores"

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
