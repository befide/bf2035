import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection, z } from 'astro:content';

import { defineOrganizationCollection } from './content.organizations';
import { defineTaxonomyCollection } from './content.taxonomy';
import { defineFacilityCollection } from './content.facilities';
import { defineCoursesCollection } from './content.courses';
import { defineThesesCollection } from './content.theses';

const docs = defineCollection({ loader: docsLoader(), schema: docsSchema() });

export const LocalizedString = z.object({ de: z.string(), en: z.string() });

export const collections = {
  docs,
  taxonomy: defineTaxonomyCollection,
  organizations: defineOrganizationCollection,
  facilities: defineFacilityCollection,
  courses: defineCoursesCollection,
  theses: defineThesesCollection
};
