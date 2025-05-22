import path from "node:path"
import { csv2json } from "csv42"
import { file } from "astro/loaders"
import { defineCollection } from "astro:content"
import { z } from "astro:content"
import { NullableLocalizedString, ReviewSchema } from "@/content/config.common"

const INPUT_FILE_PATH = path.join(
  import.meta.dirname,
  "..",
  "..",
  "..",
  "data",
  "grist",
  "courses.csv"
)

export const CourseZodSchema = z.object({
  id: z.string(),
  title: NullableLocalizedString,
  teachingEventTaxon_id: z.string(),
  studyLevelTaxons_id: z.preprocess(
    (input) =>
      input ? (input+"")
        .split(/\s?,\s?/)
        .filter((d) => !!d) : [],
    z.array(z.string().optional())
  ),
  university_id: z.string(),
  academicYearStart: z.number(),
  semesters: z.preprocess(
    (input) => (input + "").split(/\s?,\s?/).filter((d) => !!d),
    z.array(z.enum(["winter", "summer"]))
  ),
  partOfProgrammesOfStudy: z.preprocess(
    (input) => (input + "").split(/\s?,\s?/).filter((d) => !!d),
    z.array(z.string())
  ),
  languages: z.preprocess(
    (input) => (input + "").split(/\s?,\s?/).filter((d) => !!d),
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
      const data = csv2json<CourseSchema>(input, {
        nested: true
      })

      return data
      // .toSorted((a, b) =>
      //   ascending(a.offeredByUniversity.id, b.offeredByUniversity.id)
      // )
    }
  }),
  schema: CourseZodSchema
})

export type CourseSchema = z.infer<typeof CourseZodSchema>

export type Course = {
  title: string
  semesters: string[]
  link: string
  university_label: string
  teachingEventTaxon_label: string
  studyLevelTaxons_label: string[]
  weeklySemesterHours: number
}
