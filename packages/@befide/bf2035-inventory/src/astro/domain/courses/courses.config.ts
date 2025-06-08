import path from "node:path"
import { csv2json } from "csv42"
import { file } from "astro/loaders"
import { defineCollection } from "astro:content"
import { z } from "astro:content"
import {
  DomainObjectZodSchema,
  NullableLocalizedString,
  ReviewSchema,
  ZodStringArrayFromString,
} from "@/content/config.common"

const INPUT_FILE_PATH = path.join(
  import.meta.dirname,
  "..",
  "..",
  "..",
  "data",
  "grist",
  "courses.csv"
)

export const CourseZodSchema = DomainObjectZodSchema.extend({
  title: NullableLocalizedString,
  teachingEvent_taxonId: z.string(),
  university_organizationId: z.string(),
  semesters: ZodStringArrayFromString,
  studyLevel_taxonIds: ZodStringArrayFromString,
  partOfProgrammesOfStudy: ZodStringArrayFromString,
  languages: ZodStringArrayFromString,
  objectives: NullableLocalizedString,
  contents: NullableLocalizedString,
  weeklySemesterHours: z.number(),
  links: z.object({
    homepage: NullableLocalizedString,
  }),
  review: ReviewSchema,
})

export const defineCoursesCollection = defineCollection({
  loader: file(INPUT_FILE_PATH, {
    parser: (input) => {
      const data = csv2json<CourseSchema>(input, {
        nested: true,
      })

      return data
    },
  }),
  schema: CourseZodSchema,
})

export type CourseSchema = z.infer<typeof CourseZodSchema>
