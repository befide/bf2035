import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection } from 'astro:content';

import { defineReviewStatusesCollection } from './content.config.reviewStatuses';
import { defineOrganizationCollection } from './content.config.organizations';
import { defineTaxonomyItemsCollection } from './content.config.taxonomy';
import { defineFacilityCollection } from './content.config.facilities';
import { defineCoursesCollection } from './content.config.courses';
import { defineThesesCollection } from './content.config.theses';

const docs = defineCollection({ loader: docsLoader(), schema: docsSchema() });

export const collections = {
	docs,
	reviewStatuses: defineReviewStatusesCollection,
	taxonomyItems: defineTaxonomyItemsCollection,
	organizations: defineOrganizationCollection,
	facilities: defineFacilityCollection,
	courses: defineCoursesCollection,
	theses: defineThesesCollection,
};
