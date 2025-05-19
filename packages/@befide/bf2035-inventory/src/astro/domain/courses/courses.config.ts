import path from "node:path"
import { csv2json } from "csv42"
import { file } from "astro/loaders"
import { defineCollection, reference } from "astro:content"
import { z } from "astro:content"
import { NullableLocalizedString, ReviewSchema } from "@/content/config.common"
import { ascending } from "d3-array"
import { slash } from "node_modules/astro/dist/core/path"

const INPUT_FILE_PATH = path.join(
  import.meta.dirname,
  "..",
  "..",
  "..",
  "data",
  "grist",
  "courses.csv"
)

export const CourseSchema = z.object({
  id: z.string(),
  isInstanceOfTeachingEvent: reference("taxonomyItems"),
  addressesProgrammesOfStudyLevels: z.preprocess(
    (input) => {
      return typeof input === "string" ? input.split(/\s?,\s?/) : input
    },
    z.array(reference("taxonomyItems")).default([]).nullable()
  ),
  offeredByUniversity: reference("organizations"),
  title: NullableLocalizedString,
  academicYearStart: z.number(),
  semesters: z.preprocess(
    (input) => {
      return (input + "").split(/\s?,\s?/)
      // return typeof input === "string" ? input.split(/\s?,\s?/) : input
    },
    z.array(z.enum(["winter", "summer"]))
  ),
  partOfProgrammesOfStudy: z.preprocess((input) => {
    return (input + "").split(/\s?,\s?/)
    // return !input ? [] : typeof input === "string" ? input.split(/\s?,\s?/) : input
  }, z.array(z.string())),
  languages: z.preprocess(
    (input) => {
      return (input + "").split(/\s?,\s?/)
      // return typeof input === "string" ? input.split(/\s?,\s?/) : input
    },
    z.array(z.enum(["de", "en"]))
  ),
  objectives: NullableLocalizedString,
  contents: NullableLocalizedString,
  weeklySemesterHours: z.number(),
  links: z.object({
    homepage: NullableLocalizedString
  }),
  review: ReviewSchema
})

export const defineCoursesCollection = defineCollection({
  loader: file(INPUT_FILE_PATH, {
    parser: (input) => {
      const data = csv2json<Course>(input, {
        nested: true
      })

      return data.toSorted((a, b) =>
        ascending(a.offeredByUniversity.id, b.offeredByUniversity.id)
      )
    }
  }),
  schema: CourseSchema
})

export type Course = z.infer<typeof CourseSchema>
