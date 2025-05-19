import { getCollection, getEntries, getEntry } from "astro:content"
import { ascending } from "d3-array"
import { getValueTranslation } from ".."

export const getCourses = async (universityId?: string) =>
  (
    await getCollection(
      "courses",
      (entry) =>
        universityId === undefined ||
        entry.data.offeredByUniversity?.id === universityId
    )
  ).sort((a, b) => ascending(a.id, b.id))

export const allCourses = async () => await getCollection("courses")

export const coursesForeAPI = async (locale = "en") => {
  const courses = await allCourses()

  return await Promise.all(
    courses.map(async (course) => {
      const university =
        course.data.offeredByUniversity &&
        (await getEntry(course.data.offeredByUniversity)).data.label.short[
          locale
        ]
      const addressesProgrammesOfStudyLevels =
        course.data.addressesProgrammesOfStudyLevels &&
        (await getEntries(course.data.addressesProgrammesOfStudyLevels)).map(
          (d) => d.data.term
        )

        console.log(addressesProgrammesOfStudyLevels)
      const instanceOfTeachingEvent =
        course.data.isInstanceOfTeachingEvent &&
        (await getEntry(course.data.isInstanceOfTeachingEvent)).data.term[
          locale
        ]

      return {
        title: course.data.title[locale],
        languages: course.data.languages.map((d) =>
          getValueTranslation(d, locale)
        ),
        semsters: course.data.semesters,
        weeklySemesterHours: course.data.weeklySemesterHours,
        link:
          course.data.links.homepage[locale] || course.data.links.homepage.de,
        instanceOfTeachingEvent,
        addressesProgrammesOfStudyLevels: addressesProgrammesOfStudyLevels?.map(
          (d) => d[locale]
        ),

        university
      }
    })
  )
}
