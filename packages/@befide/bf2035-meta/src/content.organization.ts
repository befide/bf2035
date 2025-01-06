const __dirname = import.meta.dirname;
import fs from 'node:fs';
import path from 'node:path';
const DATA_PATH = path.join(__dirname, 'data');

import { csvLoader } from '@ascorbic/csv-loader';

import { AstroError } from 'astro/errors';
import { defineCollection } from 'astro:content';
import { z } from 'zod';

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
  '05 work group'
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

// export const BefideOrganizationSchema = z.object({
//   id: z.string(),
//   'label.long-form.de': z.string().optional(),
//   isPartOfCommunity: z.boolean().optional(),
//   'label.longForm.en': z.string().optional(),
//   'label.shortForm.de': z.string().optional(),
//   'description.de': z.string().optional(),
//   head: z.array(z.string()).optional(),
//   headLiteral: z.string().optional(),
//   'links.homepage.de': z.string().optional(),
//   'peopleCount.uniqueProfessors': z.number().int().positive().optional(),
//   'peopleCount.uniqueSeniorResearchers': z.number().int().positive().optional(),
//   'peopleCount.uniquePostDocs': z.number().int().positive().optional(),
//   'peopleCount.uniquePhdStudents': z.number().int().positive().optional(),
//   'peopleCount.uniqueWorkingStudents_MSC': z
//     .number()
//     .int()
//     .positive()
//     .optional(),
//   'peopleCount.uniqueWorkingStudents_BSC': z
//     .number()
//     .int()
//     .positive()
//     .optional(),
//   'location.city': z.string().optional(),
//   'location.country': z.string().optional(),
//   'location.lat': z.number().positive().optional(),
//   'location.lng': z.number().positive().optional(),
//   'meta.status': BefideOrganizationMetaStatus.optional(),
//   'meta.reviewedBy': z.array(z.string()).optional(),
//   'meta.parent': z.array(z.string()).optional(),
//   'meta.parentId': z.string().optional(),
//   'meta.localId': z.string().optional(),
//   'meta.organizationalLevel':
//     BefideOrganizationMetaOrganizationalLevel.optional(),
//   'meta.befideOrganizationCategories': z
//     .array(BefideOrganizationMetaBefideOrganizationCategories)
//     .optional(),
//   'links.homepage.en': z.string().optional(),
//   professorships: z.array(z.string()).optional(),
//   people: z.array(z.string()).optional(),
//   programsOfStudy: z.array(z.string()).optional(),
//   'links.rorId': z.string().optional(),
//   'befide:professorship': z.array(z.string()).optional(),
//   'meta.id': z.string().optional(),
//   'meta.changelog': z.string().optional()
// });
// export type BefideOrganization = z.infer<typeof BefideOrganizationSchema>;

export const BefideFormalOrganizationSchema = z.object({
  id: z.string(),
  'label.longForm.de': z.string().optional(),
  isPartOfCommunity: z.string().optional(),
  'label.longForm.en': z.string().optional(),
  'label.shortForm.de': z.string().optional(),
  'description.de': z.string().optional(),
  head: z.array(z.string()).optional(),
  headLiteral: z.string().optional(),
  'links.homepage.de': z.string().optional(),
  'location.city': z.string().optional(),
  'location.country': z.string().optional(),
  'location.lat': z.number().positive().optional(),
  'location.lng': z.number().positive().optional(),
  'meta.status': BefideOrganizationMetaStatus.optional(),
  'meta.reviewedBy': z.string().optional(),
  'meta.parent': z.array(z.string()).optional(),
  'meta.parentId': z.string().optional(),
  'meta.localId': z.string().optional(),
  'meta.organizationalLevel':
    BefideOrganizationMetaOrganizationalLevel.optional(),
  'meta.befideOrganizationCategories': z
    .array(BefideOrganizationMetaBefideOrganizationCategories)
    .optional(),
  'links.homepage.en': z.string().optional(),
  professorships: z.array(z.string()).optional(),
  people: z.array(z.string()).optional(),
  programsOfStudy: z.array(z.string()).optional(),
  'links.rorId': z.string().optional(),
  'befide:professorship': z.array(z.string()).optional(),
  'meta.id': z.string().optional(),
  'meta.changelog': z.string().optional()
});

export const defineFormalOrganizationCollection = defineCollection({
  loader: csvLoader({
    fileName: path.join(
      DATA_PATH,
      'befide_organization-befide.formal-organisations.csv'
    ),
    idField: 'id',

    parserOptions: {
      complete: function (results, file) {
        console.log('Parsing complete:', results, file);
      },
      dynamicTyping: {
        'location.lat': true,
        'location.lng': true
      },
      transform: function (value: any, column: string) {
        if (column === 'meta.befideOrganizationCategories')
          return value.split(',');
        return value;
      }
    }
  }),
  schema: BefideFormalOrganizationSchema
});

export type BefideFormalOrganization = z.infer<
  typeof BefideFormalOrganizationSchema
>;
