const __dirname = import.meta.dirname;
import fs from 'node:fs';
import path from 'node:path';
const DATA_PATH = path.join(__dirname, 'data');

import { csv2json } from 'csv42';

import { defineCollection } from 'astro:content';
import { z } from 'zod';

import { useTranslations } from './i18n/utils';
const LocalizedString = z.object({ de: z.string(), en: z.string() });
const deTranslation = useTranslations('de');
const enTranslation = useTranslations('en');

export const BefideOrganizationMetaStatus = z.enum([
  '01 in preparation',
  '02 ready for review',
  '03 in review',
  '04 reviewed',
  '05 approved'
]);

export const BefideOrganizationMetaOrganizationalLevel = z.enum([
  '00 Community',
  '01 formal-organisation',
  '02 intermediate level',
  '03 work group cluster',
  '04 intermediate level',
  '05 working group'
]);

export const BefideOrganizationMetaBefideOrganizationCategories = z.enum([
  'fraunhofer',
  'hgf',
  'international',
  'mpg',
  'national',
  'university',
  'committee'
]);

export const FormalOrganizationZodSchema = z.object({
  id: z.string(),
  meta: z.object({
    status: BefideOrganizationMetaStatus.optional(),
    reviewedBy: z.null(),
    changelog: z.string().nullable().default(''),
    parentId: z.string().optional().nullable(),
    localId: z.string(),
    organizationalLevel: BefideOrganizationMetaOrganizationalLevel.optional(),
    befideOrganizationCategoryArray: z
      .array(BefideOrganizationMetaBefideOrganizationCategories)
      .optional(),
    befideOrganizationCategories: z.string().optional()
  }),
  isPartOfCommunity: z.boolean(),
  label: z.object({
    shortForm: LocalizedString,
    longForm: LocalizedString
  }),
  description: z.object({ de: z.null() }),
  links: z.object({
    homepage: z.object({ de: z.string(), en: z.string() }),
    rorId: z.string()
  }),
  location: z.object({
    country: z.object({
      code: z.string(),
      name: LocalizedString
    }),

    city: z.string(),
    lat: z.number(),
    lng: z.number()
  })
});

export const defineFormalOrganizationCollection = defineCollection({
  loader: () => {
    const input = fs
      .readFileSync(
        path.join(DATA_PATH, 'befide.organizations.formal-organizations.csv')
      )
      .toString();
    const data = csv2json(input, {
      nested: true
    });
    data.forEach((d: any) => {
      d.meta.befideOrganizationCategoryArray =
        d.meta.befideOrganizationCategories.split(',');

      d.location.country.name = {
        de: deTranslation('country.name.' + d.location.country.code),
        en: enTranslation('country.name.' + d.location.country.code)
      };
    });

    return data;
  },
  schema: FormalOrganizationZodSchema
});

export type FormalOrganizationSchema = z.infer<
  typeof FormalOrganizationZodSchema
>;
