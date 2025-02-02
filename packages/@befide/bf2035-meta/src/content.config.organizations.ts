const INPUT_FILENAME = 'organizations.csv';

import { csv2json } from 'csv42';

import { defineCollection, reference, z } from 'astro:content';

import { useTranslations } from './i18n/utils';
import {
  LocalizedString,
  NullableLocalizedString,
  readInputFile,
  ReviewSchema
} from './content.config.common';

const deTranslation = useTranslations('de');
const enTranslation = useTranslations('en');

export const genders = ['female', 'male', 'nonbinary'];
export const careerLevels = [
  'professor',
  'seniorResearcher',
  'postDoc',
  'phdStudent',
  'masterStudent',
  'bachelorStudent'
];
export const disciplinaryProfessions = ['physicist', 'engineer', 'other'];
export const peopleCountDiscriminators = [
  ...careerLevels,
  ...disciplinaryProfessions,
  ...genders
];

const peopleCountGender = z.object({
  male: z.number().optional().nullable(),
  female: z.number().optional().nullable(),
  other: z.number().optional().nullable()
});
const peopleCountDiscipline = z.object({
  physicist: peopleCountGender,
  engineer: peopleCountGender,
  other: peopleCountGender
});
const peopleCountAcademicCareerLevel = z.object({
  professor: peopleCountDiscipline,
  seniorResearcher: peopleCountDiscipline,
  postDoc: peopleCountDiscipline,
  phdStudent: peopleCountDiscipline,
  masterStudent: peopleCountDiscipline,
  bachelorStudent: peopleCountDiscipline
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
  hasParent: reference('organizations').optional().nullable(),
  hasTopLevelOrganization: reference('organizations').optional().nullable(),
  befideOrganizationCategories: z.preprocess(
    (input) => (typeof input === 'string' ? input.split(/\s?,\s?/) : input),
    z.array(BefideOrganizationMetaBefideOrganizationCategories).optional()
  ),

  isPartOfCommunity: z.boolean(),
  label: z.object({
    fullName: LocalizedString,
    short: NullableLocalizedString
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
          code: z.string().optional().nullable()
        })
        .optional()
        .nullable(),

      city: z.string().optional().nullable(),
      lat: z.number().optional().nullable(),
      lng: z.number().optional().nullable()
    })
    .optional()
    .nullable(),
  uniquePeopleCount: peopleCountAcademicCareerLevel,
  uniquePeopleCountSum: z.object({
    total: z.preprocess((v) => v || 0, z.number()),
    ...peopleCountDiscriminators.reduce((obj: any, value) => {
      obj[value] = z.preprocess((v) => v || 0, z.number());
      return obj;
    }, {})
  }),
  uniquePeopleCountRecursiveSum: z
    .object(
      peopleCountDiscriminators.reduce((obj: any, value) => {
        obj[value] = z.number().optional().nullable();
        return obj;
      }, {})
    )
    .optional(),
  review: ReviewSchema
});

export const defineOrganizationCollection = defineCollection({
  loader: () => {
    const input = readInputFile(INPUT_FILENAME).toString();
    const data = csv2json<Organization>(input, {
      nested: true
    });

    return data;
  },
  schema: OrganizationSchema
});

export type Organization = z.infer<typeof OrganizationSchema>;
