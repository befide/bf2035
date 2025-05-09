import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";

import { defineReviewStatusesCollection } from "./content/config.reviewStatuses";
import { defineOrganizationCollection } from "./content/config.organizations";
import { defineTaxonomyItemsCollection } from "./content/config.taxonomyItems";
import { defineFacilityCollection } from "./content/config.facilities";
import { defineCoursesCollection } from "./content/config.courses";
import { defineThesesCollection } from "./content/config.theses";
import { defineReferencesCollection } from "./content/config.references";

// const docs = defineCollection({ loader: docsLoader(), schema: docsSchema() });

export const collections = {
  reviewStatuses: defineReviewStatusesCollection,
  taxonomyItems: defineTaxonomyItemsCollection,
  organizations: defineOrganizationCollection,
  facilities: defineFacilityCollection,
  courses: defineCoursesCollection,
  theses: defineThesesCollection,
  references: defineReferencesCollection
};
