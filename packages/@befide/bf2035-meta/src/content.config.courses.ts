const INPUT_FILE = 'courses.csv';
import { csv2json } from 'csv42';
import { defineCollection, reference } from 'astro:content';
import { z } from 'zod';
import {
  NullableLocalizedString,
  readInputFile,
  ReviewSchema
} from './content.config.common';

export const CourseSchema = z.object({
  id: z.string(),
  isInstanceOfTeachingEvent: reference('taxonomy').optional(),
  addressesProgrammeOfStudyLevels: z
    .array(reference('taxonomy'))
    .optional()
    .nullable(),
  offeredByUniversity: reference('organizations').optional(),
  label: z.object({
    fullName: NullableLocalizedString
  }),
  semester: z.string().nullable(),
  language: z.string().nullable(),
  objectives: NullableLocalizedString,
  contents: NullableLocalizedString,
  sws: z.number().nullable(),
  links: z.object({
    homepage: NullableLocalizedString
  }),
  review: ReviewSchema
});

export const defineCoursesCollection = defineCollection({
  loader: () => {
    const input = readInputFile(INPUT_FILE).toString();
    const data = csv2json<Course>(input, {
      nested: true
    });
    data.forEach((d: any) => {
      if (d.addressesProgrammeOfStudyLevels) {
        d.addressesProgrammeOfStudyLevels =
          d.addressesProgrammeOfStudyLevels.split(/\s?,\s?/);
      }
    });
    return data;
  },
  schema: CourseSchema
});

export type Course = z.infer<typeof CourseSchema>;
