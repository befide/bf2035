import { defineCollection, z } from "astro:content"

import { docsLoader, i18nLoader } from "@astrojs/starlight/loaders"
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema"

import { defineReviewStatusesCollection } from "./content/config.reviewStatuses"
import { defineOrganizationCollection } from "./astro/domain/organizations/organizations.config"
import { defineTaxonomyItemsCollection } from "./astro/domain/taxonomy/taxonomy.config"
import { defineFacilityCollection } from "./astro/domain/facilities/facilities.config"
import { defineCoursesCollection } from "./astro/domain/courses/courses.config"
import { defineThesesCollection } from "./astro/domain/theses/theses.config"
import { defineReferencesCollection } from "./content/config.references"

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  i18n: defineCollection({
    loader: i18nLoader(),
    schema: i18nSchema({
      extend: z.object({
        "dc-explorer.filter.number-of-items": z.string(),
        "dc-explorer.filters": z.string(),
        "dc-explorer.items": z.string(),
        "dc-explorer.tiles.title.categories": z.string(),
        "dc-explorer.tiles.title.category": z.string(),
        "dc-explorer.tiles.title.count": z.string(),
        "dc-explorer.tiles.title.countries": z.string(),
        "dc-explorer.tiles.title.country": z.string(),
        "dc-explorer.tiles.title.degree": z.string(),
        "dc-explorer.tiles.title.degrees": z.string(),
        "dc-explorer.tiles.title.facilities": z.string(),
        "dc-explorer.tiles.title.facility": z.string(),
        "dc-explorer.tiles.title.gender": z.string(),
        "dc-explorer.tiles.title.genders": z.string(),
        "dc-explorer.tiles.title.items": z.string(),
        "dc-explorer.tiles.title.language": z.string(),
        "dc-explorer.tiles.title.languages": z.string(),
        "dc-explorer.tiles.title.semesters": z.string(),
        "dc-explorer.tiles.title.study-level": z.string(),
        "dc-explorer.tiles.title.study-levels": z.string(),
        "dc-explorer.tiles.title.weeklySemesterHours": z.string(),
        "dc-explorer.tiles.title.teaching-event": z.string(),
        "dc-explorer.tiles.title.teaching-events": z.string(),
        "dc-explorer.tiles.title.universities": z.string(),
        "dc-explorer.tiles.title.university": z.string()
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
