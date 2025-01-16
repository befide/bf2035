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

import {
  ReviewStatus as MetaStatus,
  ReviewStatus
} from './content.formal-organization';
const LocalizedString = z.object({
  de: z.string(),
  en: z.string()
});

const NullableLocalizedString = z.object({
  de: z.string().nullable().optional(),
  en: z.string().nullable().optional()
});

export const FacilitySchema = z.object({
  id: z.string(),
  meta: z.object({
    reviewStatus: ReviewStatus.optional(),
    reviewedBy: z.string().optional().nullable(),
    reviewLog: z.string().nullable().default('')
  }),
  label: z.object({
    fullName: LocalizedString,
    short: NullableLocalizedString
  }),
  definition: NullableLocalizedString,
  isPartOf: z.string().optional().nullable(), //reference('facilities').optional().nullable(),
  isSuccessorOf: z.string().optional().nullable(), //reference('facilities').optional().nullable(),
  acceleratorType: z.string().optional().nullable(),
  facilityType: z.string().optional().nullable(),
  facilityTypeParticles: z.string().optional().nullable(),
  lifeCycle: z.string().optional().nullable(),
  t0: z.number().optional().nullable(),
  t1: z.number().optional().nullable(),
  hasHost: z.string().optional().nullable(), //reference('formalOrganisations').optional().nullable(),
  isBmbfFis: z.string().optional().nullable(),
  primaryApplications: z.string().optional().nullable(),
  secondaryApplications: z.string().optional().nullable(),
  link: z.object({
    homepage: NullableLocalizedString
  })
});

export const defineFacilityCollection = defineCollection({
  loader: async () => {
    const input = fs
      .readFileSync(path.join(DATA_PATH, 'facilities.csv'))
      .toString();
    const data = csv2json(input, {
      nested: true
    });
    data.forEach((d: any) => {});
    return data;
  },
  schema: FacilitySchema
});

export type Facility = z.infer<typeof FacilitySchema>;
