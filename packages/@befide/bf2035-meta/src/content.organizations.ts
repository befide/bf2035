const __dirname = import.meta.dirname;
import fs from 'node:fs';
import path from 'node:path';
const DATA_PATH = path.join(__dirname, 'data', 'grist');
const INPUT_FILE = path.join(DATA_PATH, 'organizations.csv');

import { csv2json } from 'csv42';

import { defineCollection, reference } from 'astro:content';
import { z } from 'zod';

import { useTranslations } from './i18n/utils';
const LocalizedString = z.object({ de: z.string(), en: z.string() });
const NullableLocalizedString = z
  .object({
    de: z.string().nullable().optional(),
    en: z.string().nullable().optional()
  })
  .optional()
  .nullable();

const deTranslation = useTranslations('de');
const enTranslation = useTranslations('en');

export const ReviewStatus = z.enum(['01: in preparation', '02: in prereview']);

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

export const BefideOrganizationMetaOrganizationalLevel = z.enum([
  '00 Community',
  '01 formal-organisation',
  '02 intermediate level',
  '03 working group cluster',
  '04 intermediate level',
  '05 working group',
  'other'
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
    'root',
    'consortium'
  ])
  .optional();

export const OrganizationSchema = z.object({
  id: z.string(),
  isInstanceOf: reference('taxonomy').optional().nullable(),
  isDirectPartOf: reference('organizations').optional().nullable(),
  hasTopLevelOrganization: reference('organizations').optional().nullable(),
  meta: z.object({
    reviewStatus: ReviewStatus.optional(),
    reviewedBy: z.string().optional().nullable(),
    reviewLog: z.string().nullable().default(''),
    organizationalLevel: BefideOrganizationMetaOrganizationalLevel.optional(),
    befideOrganizationCategoryArray: z
      .array(BefideOrganizationMetaBefideOrganizationCategories)
      .optional(),
    befideOrganizationCategories: z.string().optional()
  }),
  isPartOfCommunity: z.boolean(),
  label: z.object({
    fullName: LocalizedString,
    short: NullableLocalizedString
    // acronym: NullableLocalizedString
  }),
  description: NullableLocalizedString,
  links: z.object({
    homepage: NullableLocalizedString,
    rorId: z.string().optional().nullable()
  }),
  location: z
    .object({
      country: z
        .object({
          code: z.string().optional().nullable(),
          name: NullableLocalizedString
        })
        .optional()
        .nullable(),

      city: z.string().optional().nullable(),
      lat: z.number().optional().nullable(),
      lng: z.number().optional().nullable()
    })
    .optional()
    .nullable(),
  peopleCount: z.object({
    uniqueProfessor: peopleCount,
    uniqueSeniorResearcher: peopleCount,
    uniquePostDoc: peopleCount,
    uniquePhdStudent: peopleCount,
    uniqueMasterStudent: peopleCount,
    uniqueBachelorStudent: peopleCount
  }),
  peopleCountSum: z.object({
    total: z.number().optional().nullable(),
    uniqueProfessor: z.number().optional().nullable(),
    uniqueSeniorResearcher: z.number().optional().nullable(),
    uniquePostDoc: z.number().optional().nullable(),
    uniquePhdStudent: z.number().optional().nullable(),
    uniqueMasterStudent: z.number().optional().nullable(),
    uniqueBachelorStudent: z.number().optional().nullable(),
    female: z.number().optional().nullable(),
    male: z.number().optional().nullable(),
    nonbinary: z.number().optional().nullable(),
    physicist: z.number().optional().nullable(),
    engineer: z.number().optional().nullable(),
    other: z.number().optional().nullable()
  })
});

export const defineOrganizationCollection = defineCollection({
  loader: () => {
    const input = fs.readFileSync(INPUT_FILE).toString();
    const data = csv2json(input, {
      nested: true
    });
    // const communityTopLevelOrganizations = data.filter(
    //   (d) =>
    //     (d.meta.isA === '/organization/research-institution' ||
    //       d.meta.isA === '/organization/university') &&
    //     d.isPartOfCommunity
    // );

    // console.log(communityTopLevelOrganizations.map((d) => ({ id: d.id })));

    data.forEach((d: any) => {
      if (d.meta.befideOrganizationCategories) {
        d.meta.befideOrganizationCategoryArray =
          d.meta.befideOrganizationCategories?.split(/\s?,\s?/);
      }
      if (d.location.country.code) {
        d.location.country.name = {
          de: deTranslation('country.name.' + d.location.country.code),
          en: enTranslation('country.name.' + d.location.country.code)
        };
      }
    });

    return data;
  },
  schema: OrganizationSchema
});

export type Organization = z.infer<typeof OrganizationSchema>;
