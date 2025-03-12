import {getCollection} from "astro:content"

export const getCourses = async (universityId?: string) =>
    await getCollection ("courses",
        (entry) =>
            universityId === undefined || entry.data.offeredByUniversity?.id === universityId
    )
