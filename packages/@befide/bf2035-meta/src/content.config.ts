import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection, z } from 'astro:content';

import { defineFormalOrganizationCollection } from './content.formal-organization';
import { defineWorkingGroupsCollection } from './content.working-groups';
import { defineTaxonomyCollection } from './content.taxonomy';
import { defineFacilityCollection } from './content.facility';

const docs = defineCollection({ loader: docsLoader(), schema: docsSchema() });

export const LocalizedString = z.object({ de: z.string(), en: z.string() });

export const collections = {
  docs,
  taxonomy: defineTaxonomyCollection,
  formalOrganizations: defineFormalOrganizationCollection,
  workingGroups: defineWorkingGroupsCollection,

  facilities: defineFacilityCollection

  // courses,
  // programOfStudies,
  // facilities
};
