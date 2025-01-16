const __dirname = import.meta.dirname;
import fs from 'node:fs';
import path from 'node:path';
const DATA_PATH = path.join(__dirname, 'data', 'airtable');

import { csv2json } from 'csv42';

import { defineCollection, reference } from 'astro:content';
import { z } from 'zod';

import { useTranslations } from './i18n/utils';
const deTranslation = useTranslations('de');
const enTranslation = useTranslations('en');

import { ReviewStatus } from './content.formal-organization';
const LocalizedString = z.object({
  de: z.string(),
  en: z.string()
});
const NullableLocalizedString = z.object({
  de: z.string().nullable().optional(),
  en: z.string().nullable().optional()
});

const peopleCountGender = z.object({
  male: z.number().optional().nullable(),
  female: z.number().optional().nullable(),
  other: z.number().optional().nullable()
});
const peopleCount = z.object({
  physicist: peopleCountGender,
  engineer: peopleCountGender,
  other: peopleCountGender
});

export const CourseSchema = z.object({
  id: z.string(),
  meta: z.object({
    reviewStatus: ReviewStatus.optional(),
    reviewedBy: z.string().optional().nullable(),
    reviewLog: z.string().nullable().default('')
  }),
  university: reference('formalOrganizations'),
  label: z.object({
    fullName: NullableLocalizedString
  }),
  type: z.string().nullable(),
  semester: z.string().nullable(),
  language: z.string().nullable(),
  objectives: NullableLocalizedString,
  contents: NullableLocalizedString,
  sws: z.number().nullable(),
  links: z.object({
    homepage: NullableLocalizedString
  })
});

export const defineCoursesCollection = defineCollection({
  loader: () => {
    const input = fs
      .readFileSync(path.join(DATA_PATH, 'courses.csv'))
      .toString();
    const data = csv2json(input, {
      nested: true
    });
    data.forEach((d: any) => {});
    return data;
  },
  schema: CourseSchema
});

export type Course = z.infer<typeof CourseSchema>;
