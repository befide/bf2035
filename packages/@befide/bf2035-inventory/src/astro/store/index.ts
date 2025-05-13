import { $coursesIndex } from "./coursesIndex"
import { $communityIndex } from "./communityIndex"
import { $taxonomyIndex } from "./taxonomyIndex"
import { $thesesIndex } from "./thesesIndex"

export const getCollectionIndex = (collection: string | undefined) => {
  if (!collection) return null
  if (collection === "taxonomy") return $taxonomyIndex
  if (collection === "community") return $communityIndex
  if (collection === "theses") return $thesesIndex
  if (collection === "courses") return $coursesIndex
  return null
}
