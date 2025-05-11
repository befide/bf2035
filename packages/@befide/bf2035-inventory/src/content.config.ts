import { defineCollection, z } from "astro:content";

import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';


import { defineReviewStatusesCollection } from "./content/config.reviewStatuses";
import { defineOrganizationCollection } from "./content/config.organizations";
import { defineTaxonomyItemsCollection } from "./content/config.taxonomyItems";
import { defineFacilityCollection } from "./content/config.facilities";
import { defineCoursesCollection } from "./content/config.courses";
import { defineThesesCollection } from "./content/config.theses";
import { defineReferencesCollection } from "./content/config.references";

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema({
      extend: z.object({
        "dc-explorer.filters": z.string(),
        "dc-explorer.filter.number-of-items": z.string(),
        "dc-explorer.items": z.string(),

      }),
    }),
  }),
  reviewStatuses: defineReviewStatusesCollection,
  taxonomyItems: defineTaxonomyItemsCollection,
  organizations: defineOrganizationCollection,
  facilities: defineFacilityCollection,
  courses: defineCoursesCollection,
  theses: defineThesesCollection,
  references: defineReferencesCollection,
}
