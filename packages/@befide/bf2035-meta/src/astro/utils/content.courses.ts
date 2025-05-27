import { getCollection } from "astro:content";
import { ascending } from "d3-array";

export const getCourses = async (universityId?: string) =>
  (
    await getCollection(
      "courses",
      (entry) =>
        universityId === undefined ||
        entry.data.offeredByUniversity?.id === universityId,
    )
  ).sort((a, b) => ascending(a.id, b.id));
