const __dirname = import.meta.dirname;
import fs from 'node:fs';
import path from 'node:path';
const DATA_PATH = path.join(__dirname, 'data');

import { csv2json } from 'csv42';

import { defineCollection, reference } from 'astro:content';
import { z } from 'zod';

import { useTranslations } from './i18n/utils';
const LocalizedString = z.object({ de: z.string(), en: z.string() });
const NullableLocalizedString = z.object({
  de: z.string().nullable().optional(),
  en: z.string().nullable().optional()
});

const deTranslation = useTranslations('de');
const enTranslation = useTranslations('en');

export const ReviewStatus = z.enum(['01: in preparation', '02: in prereview']);

export const BefideOrganizationMetaOrganizationalLevel = z.enum([
  '00 Community',
  '01 formal-organisation',
  '02 intermediate level',
  '03 work group cluster',
  '04 intermediate level',
  '05 working group'
]);

export const BefideOrganizationMetaBefideOrganizationCategories = z
  .enum([
    'fraunhofer',
    'hgf',
    'international',
    'mpg',
    'national',
    'university',
    'committee',
    'funder',
    ''
  ])
  .optional();

export const FormalOrganizationSchema = z.object({
  id: z.string(),
  meta: z.object({
    type: reference('taxonomy').optional().nullable(),
    reviewStatus: ReviewStatus.optional(),
    reviewedBy: z.string().optional().nullable(),
    reviewLog: z.string().nullable().default(''),
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
    fullName: LocalizedString,
    abbreviatedName: LocalizedString,
    acronym: NullableLocalizedString
  }),
  description: NullableLocalizedString,
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
        path.join(DATA_PATH, 'organization.formal-organizations.csv')
      )
      .toString();
    const data = csv2json(input, {
      nested: true
    });
    data.forEach((d: any) => {
      d.meta.befideOrganizationCategoryArray =
        d.meta.befideOrganizationCategories?.split(',');

      d.location.country.name = {
        de: deTranslation('country.name.' + d.location.country.code),
        en: enTranslation('country.name.' + d.location.country.code)
      };
    });

    return data;
  },
  schema: FormalOrganizationSchema
});

export type FormalOrganization = z.infer<typeof FormalOrganizationSchema>;
