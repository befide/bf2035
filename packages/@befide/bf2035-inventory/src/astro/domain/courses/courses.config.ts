import path from "node:path"
import { csv2json } from "csv42"
import { file, glob } from "astro/loaders"
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
  teachingEvent__taxonomyId: z.string(),
  university__organizationsId: z.string(),
  semesters: z.array(z.string()),
  studyLevels__taxonomyId: z.array(z.string()),
  partOfProgrammesOfStudy: z.array(z.string()),
  languages: z.array(z.string()),
  objectives: NullableLocalizedString,
  contents: NullableLocalizedString,
  weeklySemesterHours: z.number(),
  links: z.object({
    homepage: NullableLocalizedString,
  }),
  review: ReviewSchema,
})

export const defineCoursesCollection = defineCollection({
  loader: glob({
    pattern: "**/*.(md|mdx)",
    base: "./src/content/domain/courses",
  }),
  schema: CourseZodSchema,
})

export type CourseSchema = z.infer<typeof CourseZodSchema>
