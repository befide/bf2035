const __dirname = import.meta.dirname;
import fs from 'node:fs';
import path from 'node:path';
const DATA_PATH = path.join(__dirname, 'data');

import { csv2json } from 'csv42';

import { defineCollection, reference } from 'astro:content';
import { z } from 'zod';

import { useTranslations } from './i18n/utils';
const deTranslation = useTranslations('de');
const enTranslation = useTranslations('en');

import { BefideOrganizationMetaStatus } from './content.formal-organization';
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

export const WorkingGroupZodSchema = z.object({
  id: z.string(),
  meta: z.object({
    status: BefideOrganizationMetaStatus.optional(),
    reviewedBy: z.string().nullable().default(''),
    changelog: z.string().nullable().default(''),
    parentId: z.string().optional().nullable(),
    localId: z.string()
  }),
  partOf: reference('formalOrganization'),
  label: z.object({
    shortForm: NullableLocalizedString,
    longForm: NullableLocalizedString
  }),
  description: NullableLocalizedString,
  links: z.object({
    homepage: NullableLocalizedString
  }),
  peopleCount: z.object({
    uniqueProfessors: peopleCount,
    uniqueSeniorResearchers: peopleCount,
    uniquePostDocs: peopleCount,
    uniquePhdStudents: peopleCount,
    uniqueMasterStudents: peopleCount,
    uniqueBachelorStudents: peopleCount
  })
});

export const defineWorkingGroupsCollection = defineCollection({
  loader: () => {
    const input = fs
      .readFileSync(
        path.join(DATA_PATH, 'befide.organizations.working-groups.csv')
      )
      .toString();
    const data = csv2json(input, {
      nested: true
    });
    data.forEach((d: any) => {});
    return data;
  },
  schema: WorkingGroupZodSchema
});

export type WorkingGroup = z.infer<typeof WorkingGroupZodSchema>;
