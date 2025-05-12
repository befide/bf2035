import { getCollection, getEntries, getEntry } from "astro:content"
import { ascending } from "d3-array"

export const getCourses = async (universityId?: string) =>
  (
    await getCollection(
      "courses",
      (entry) => universityId === undefined || entry.data.offeredByUniversity?.id === universityId,
    )
  ).sort((a, b) => ascending(a.id, b.id))

export const allCourses = async () => await getCollection("courses")

export const coursesForeAPI = async (locale: "en" | "de") => {
  const courses = await allCourses()

  return await Promise.all(
    courses.map(async (course) => {
      const university =
        course.data.offeredByUniversity && (await getEntry(course.data.offeredByUniversity)).data.label.short[locale]
      const addressesProgrammeOfStudyLevels =
        course.data.addressesProgrammeOfStudyLevels &&
        (await getEntries(course.data.addressesProgrammeOfStudyLevels)).map(d => d.data.term)
      const instanceOfTeachingEvent =
        course.data.isInstanceOfTeachingEvent &&
        (await getEntry(course.data.isInstanceOfTeachingEvent)).data.term[locale]
       

      return {
        title: course.data.label.fullName[locale],
        language: course.data.language,
        semester: course.data.semester,
        link: course.data.links.homepage[locale] || course.data.links.homepage.de,
        sws: course.data.sws,
        instanceOfTeachingEvent,
        addressesProgrammeOfStudyLevels: addressesProgrammeOfStudyLevels?.map((d) => d[locale]),

        university,
      }
    }),
  )
}
