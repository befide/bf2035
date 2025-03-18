import path from 'node:path'
import { csv2json } from 'csv42'
import { file } from 'astro/loaders'
import { defineCollection, reference } from 'astro:content'
import { z } from 'astro:content'
import { NullableLocalizedString, ReviewSchema } from './content.config.common'

const INPUT_FILE_PATH = path.join(
  import.meta.dirname,
  'data',
  'grist',
  'courses.csv'
)

export const CourseSchema = z.object({
  id: z.string(),
  isInstanceOfTeachingEvent: reference('taxonomyItems'),
  addressesProgrammeOfStudyLevels: z
    .array(reference('taxonomyItems'))
    .default([])
    .nullable(),
  offeredByUniversity: reference('organizations'),
  label: z.object({
    fullName: NullableLocalizedString,
  }),
  semester: z.string().nullable(),
  language: z.string().nullable(),
  objectives: NullableLocalizedString,
  contents: NullableLocalizedString,
  sws: z.number().nullable(),
  links: z.object({
    homepage: NullableLocalizedString,
  }),
  review: ReviewSchema,
})

export const defineCoursesCollection = defineCollection({
  loader: file(INPUT_FILE_PATH, {
    parser: (input) => {
      let data = csv2json<Course>(input, {
        nested: true,
      })
      data.forEach((d: any) => {
        if (d.addressesProgrammeOfStudyLevels) {
          d.addressesProgrammeOfStudyLevels =
            d.addressesProgrammeOfStudyLevels.split(/\s?,\s?/)
        }
      })
      return data
    },
  }),
  schema: CourseSchema,
})

export type Course = z.infer<typeof CourseSchema>
