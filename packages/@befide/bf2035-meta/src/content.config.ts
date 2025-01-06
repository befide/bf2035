import { airtableLoader } from '@ascorbic/airtable-loader';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection, z } from 'astro:content';

import { defineFormalOrganizationCollection } from './content.formal-organization';
import { defineWorkingGroupsCollection } from './content.working-groups';
import { defineTaxonomyCollection } from './content.taxonomy';

const docs = defineCollection({ loader: docsLoader(), schema: docsSchema() });

export const LocalizedString = z.object({ de: z.string(), en: z.string() });

// const organization = defineCollection({

//   loader: () => {
//     return organizationsData;
//   },
//   schema: z.array(
//     z.union([
//       z.object({
//         id: z.string(),
//         isPartOfCommunity: z.boolean(),
//         'meta.reviewedBy': z.string(),

//         'meta.parent': z.string(),
//         'meta.parent-id': z.string(),
//         'meta.localId': z.string(),
//         'label.long-form.de': z.string(),
//         'label.long-form.en': z.string(),
//         'label.short-form': z.string(),
//         'meta.organizationalLevel': z.string(),
//         'meta.befideOrganizationCategories': z.string(),
//         homepage__de: z.string(),
//         homepage__en: z.string(),
//         'ror:id': z.string(),
//         head: z.string(),
//         headLiteral: z.string(),
//         'location.city': z.number(),
//         'location.country': z.string(),
//         'location.lat': z.string(),
//         'location.lng': z.string(),
//         'description.de': z.string(),
//         'peopleCount.uniqueProfessors': z.number(),
//         'peopleCount.uniqueSeniorResearchers': z.number(),
//         'peopleCount.uniquePostDocs': z.number(),
//         'peopleCount.uniquePhdStudents': z.number(),
//         'peopleCount.uniqueWorkingStudents_MSC': z.number(),
//         'peopleCount.uniqueWorkingStudents_BSC': z.number(),
//         professorships: z.string(),
//         people: z.string(),
//         programsOfStudy: z.string(),
//         'meta.status': z.string(),
//         'befide:professorship': z.string(),
//         'meta.id': z.string()
//       }),
//       z.object({
//         id: z.string(),
//         'meta.reviewedBy': z.string(),
//         isPartOfCommunity: z.string(),
//         'meta.parent': z.string(),
//         'meta.parent-id': z.string(),
//         'meta.localId': z.string(),
//         'label.long-form.de': z.string(),
//         'label.long-form.en': z.string(),
//         'label.short-form': z.string(),
//         'meta.organizationalLevel': z.string(),
//         'meta.befideOrganizationCategories': z.string(),
//         homepage__de: z.string(),
//         homepage__en: z.string(),
//         'ror:id': z.string(),
//         head: z.string(),
//         headLiteral: z.string(),
//         'location.city': z.string(),
//         'location.country': z.string(),
//         'location.lat': z.number(),
//         'location.lng': z.number(),
//         'description.de': z.string(),
//         'peopleCount.uniqueProfessors': z.number(),
//         'peopleCount.uniqueSeniorResearchers': z.number(),
//         'peopleCount.uniquePostDocs': z.number(),
//         'peopleCount.uniquePhdStudents': z.number(),
//         'peopleCount.uniqueWorkingStudents_MSC': z.number(),
//         'peopleCount.uniqueWorkingStudents_BSC': z.number(),
//         professorships: z.string(),
//         people: z.string(),
//         programsOfStudy: z.string(),
//         'meta.status': z.string(),
//         'befide:professorship': z.string(),
//         'meta.id': z.string()
//       }),
//       z.object({
//         id: z.string(),
//         'meta.reviewedBy': z.string(),
//         isPartOfCommunity: z.string(),
//         'meta.parent': z.string(),
//         'meta.parent-id': z.string(),
//         'meta.localId': z.string(),
//         'label.long-form.de': z.string(),
//         'label.long-form.en': z.string(),
//         'label.short-form': z.string(),
//         'meta.organizationalLevel': z.string(),
//         'meta.befideOrganizationCategories': z.string(),
//         homepage__de: z.string(),
//         homepage__en: z.string(),
//         'ror:id': z.string(),
//         head: z.string(),
//         headLiteral: z.string(),
//         'location.city': z.string(),
//         'location.country': z.string(),
//         'location.lat': z.string(),
//         'location.lng': z.string(),
//         'description.de': z.string(),
//         'peopleCount.uniqueProfessors': z.number(),
//         'peopleCount.uniqueSeniorResearchers': z.number(),
//         'peopleCount.uniquePostDocs': z.number(),
//         'peopleCount.uniquePhdStudents': z.number(),
//         'peopleCount.uniqueWorkingStudents_MSC': z.number(),
//         'peopleCount.uniqueWorkingStudents_BSC': z.number(),
//         professorships: z.string(),
//         people: z.string(),
//         programsOfStudy: z.string(),
//         'meta.status': z.string(),
//         'befide:professorship': z.string(),
//         'meta.id': z.string()
//       }),
//       z.object({
//         id: z.string(),
//         'meta.reviewedBy': z.string(),
//         isPartOfCommunity: z.string(),
//         'meta.parent': z.string(),
//         'meta.parent-id': z.string(),
//         'meta.localId': z.string(),
//         'label.long-form.de': z.string(),
//         'label.long-form.en': z.string(),
//         'label.short-form': z.string(),
//         'meta.organizationalLevel': z.string(),
//         'meta.befideOrganizationCategories': z.string(),
//         homepage__de: z.string(),
//         homepage__en: z.string(),
//         'ror:id': z.string(),
//         head: z.string(),
//         headLiteral: z.string(),
//         'location.city': z.string(),
//         'location.country': z.string(),
//         'location.lat': z.string(),
//         'location.lng': z.string(),
//         'description.de': z.string(),
//         'peopleCount.uniqueProfessors': z.number(),
//         'peopleCount.uniqueSeniorResearchers': z.number(),
//         'peopleCount.uniquePostDocs': z.number(),
//         'peopleCount.uniquePhdStudents': z.number(),
//         'peopleCount.uniqueWorkingStudents_MSC': z.number(),
//         'peopleCount.uniqueWorkingStudents_BSC': z.string(),
//         professorships: z.string(),
//         people: z.string(),
//         programsOfStudy: z.string(),
//         'meta.status': z.string(),
//         'befide:professorship': z.string(),
//         'meta.id': z.string()
//       }),
//       z.object({
//         id: z.string(),
//         'meta.reviewedBy': z.string(),
//         isPartOfCommunity: z.string(),
//         'meta.parent': z.string(),
//         'meta.parent-id': z.string(),
//         'meta.localId': z.string(),
//         'label.long-form.de': z.string(),
//         'label.long-form.en': z.string(),
//         'label.short-form': z.string(),
//         'meta.organizationalLevel': z.string(),
//         'meta.befideOrganizationCategories': z.string(),
//         homepage__de: z.string(),
//         homepage__en: z.string(),
//         'ror:id': z.string(),
//         head: z.string(),
//         headLiteral: z.string(),
//         'location.city': z.string(),
//         'location.country': z.string(),
//         'location.lat': z.string(),
//         'location.lng': z.string(),
//         'description.de': z.string(),
//         'peopleCount.uniqueProfessors': z.string(),
//         'peopleCount.uniqueSeniorResearchers': z.string(),
//         'peopleCount.uniquePostDocs': z.string(),
//         'peopleCount.uniquePhdStudents': z.string(),
//         'peopleCount.uniqueWorkingStudents_MSC': z.string(),
//         'peopleCount.uniqueWorkingStudents_BSC': z.string(),
//         professorships: z.string(),
//         people: z.string(),
//         programsOfStudy: z.string(),
//         'meta.status': z.string(),
//         'befide:professorship': z.string(),
//         'meta.id': z.string()
//       })
//     ])
//   )
// });
const facilities = defineCollection({
  loader: airtableLoader({
    base: import.meta.env.AIRTABLE_BASE,
    table: 'tblCxJ1XvyWIffbEH'
  })
});
const courses = defineCollection({
  loader: airtableLoader({
    base: import.meta.env.AIRTABLE_BASE,
    table: 'tblK6vTI1t6iDFqTk'
  })
});
const programOfStudies = defineCollection({
  loader: airtableLoader({
    base: import.meta.env.AIRTABLE_BASE,
    table: 'tblY8Dqqw13cDO2Zf'
  })
});

export const collections = {
  docs,
  formalOrganization: defineFormalOrganizationCollection,
  workingGroups: defineWorkingGroupsCollection,
  taxonomy: defineTaxonomyCollection,
  courses,
  programOfStudies,
  facilities
};
