import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection, z } from 'astro:content';

import { defineReviewStatusesCollection } from './content.config.reviewStatuses';
import { defineOrganizationCollection } from './content.config.organizations';
import { defineTaxonomyCollection } from './content.config.taxonomy';
import { defineFacilityCollection } from './content.config.facilities';
import { defineCoursesCollection } from './content.config.courses';
import { defineThesesCollection } from './content.config.theses';

const docs = defineCollection({ loader: docsLoader(), schema: docsSchema() });

export const collections = {
  docs,
  reviewStatuses: defineReviewStatusesCollection,
  taxonomy: defineTaxonomyCollection,
  organizations: defineOrganizationCollection,
  facilities: defineFacilityCollection,
  courses: defineCoursesCollection,
  theses: defineThesesCollection
};
