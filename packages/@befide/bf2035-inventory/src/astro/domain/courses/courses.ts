import { getCollection, getEntry } from "astro:content"
import { ascending } from "d3-array"
import { getValueTranslation } from ".."
import { getLocalizedValue } from "../content"
import { Course, type CourseDto } from "./course"

export const getCourses = async (universityId?: string) =>
  (
    await getCollection(
      "courses",
      (entry) =>
        universityId === undefined ||
        entry.data.university_organizationId === universityId
    )
  ).sort((a, b) => ascending(a.id, b.id))

export const allCourses = async () => await getCollection("courses")

export async function coursesForAPI(locale = "en"): Promise<CourseDto[]> {
  const theses = await allCourses()

  return await Promise.all(
    theses.map(async (course) => await new Course(course.data).getDto(locale))
  )
}

// export async function coursesForAPI(locale = "en"): Promise<CourseDto[]> {
//   const courses = await allCourses()

//   return await Promise.all(
//     courses.map(async (course) => {
//       return {
//         title: getLocalizedValue(course, "data.title", locale),
//         languages: course.data.languages.map((d) =>
//           getValueTranslation(d, locale)
//         ),
//         semesters: course.data.semesters.map((d) =>
//           getValueTranslation(d, locale)
//         ),
//         weeklySemesterHours: course.data.weeklySemesterHours,
//         link: (getLocalizedValue(
//           course,
//           "course.data.links.homepage",
//           locale
//         ) || course.data.links.homepage.de) as string,
//         teachingEventTaxon_label: (course.data.teachingEvent_taxonId &&
//           getLocalizedValue(
//             await getEntry("taxonomyItems", course.data.teachingEvent_taxonId),
//             "data.term",
//             locale
//           )) as string,
//         studyLevelTaxons_label: (await Promise.all(
//           course.data.studyLevel_taxonIds.map(
//             async (taxon) =>
//               taxon &&
//               getLocalizedValue(
//                 await getEntry("taxonomyItems", taxon),
//                 "data.term",
//                 locale
//               )
//           )
//         )) as string[],
//         university_label: (course.data.university_organizationId &&
//           getLocalizedValue(
//             await getEntry(
//               "organizations",
//               course.data.university_organizationId
//             ),
//             "data.label.short",
//             locale
//           )) as string,
//       }
//     })
//   )
// }
