import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"
function removeDupsAndLowerCase(array: string[]) {
  if (!array.length) return array
  const lowercaseItems = array.map((str) => str.toLowerCase())
  const distinctItems = new Set(lowercaseItems)
  return Array.from(distinctItems)
}
// import { i18nLoader } from "@astrojs/starlight/loaders"
// import { i18nSchema } from "@astrojs/starlight/schema"

// Define docs collection
const docs = defineCollection({
  loader: glob({ base: "./src/content/docs", pattern: "**/*.{md,mdx}" }),
  schema: () =>
    z.object({
      title: z.string().max(60),
      description: z.string().max(160).optional(),
      publishDate: z.coerce.date().optional(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]).transform(removeDupsAndLowerCase),
      draft: z.boolean().default(false),
      // Special fields
      order: z.number().default(999),
    }),
})

// import { type CourseSchema } from "@domain/courses/courses.config"
// import { type FacilitySchema } from "@domain/facilities/facilities.config"
// import { type OrganizationSchema } from "@domain/organizations/organizations.config"
// import { type TaxonomyItemSchema } from "@domain/taxonomy/taxonomy.config"
// import { type ThesisSchema } from "@domain/theses/theses.config.api"
// import { glob } from "astro/loaders"
// import { defineReferencesCollection } from "./content/config.references"
// import { autoSidebarLoader } from "starlight-auto-sidebar/loader"
// import { autoSidebarSchema } from "starlight-auto-sidebar/schema"

// export type DomainObject =
//   | CourseSchema
//   | OrganizationSchema
//   | TaxonomyItemSchema
//   | FacilitySchema
//   | ThesisSchema

export const collections = {
  // docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  // autoSidebar: defineCollection({
  //   loader: autoSidebarLoader(),
  //   schema: autoSidebarSchema(),
  // }),
  // i18n: defineCollection({
  //   loader: i18nLoader(),
  //   schema: i18nSchema({
  //     extend: z.object({
  //       "dc-explorer.filter.number-of-items": z.string(),
  //       "dc-explorer.filters": z.string(),
  //       "dc-explorer.items": z.string(),
  //       "dc-explorer.actions.reset-all": z.string(),
  //       "dc-explorer.actions.reset": z.string(),
  //       "dc-explorer.tiles.title.categories": z.string(),
  //       "dc-explorer.tiles.title.category": z.string(),
  //       "dc-explorer.tiles.title.count": z.string(),
  //       "dc-explorer.tiles.title.countries": z.string(),
  //       "dc-explorer.tiles.title.country": z.string(),
  //       "dc-explorer.tiles.title.degree": z.string(),
  //       "dc-explorer.tiles.title.degrees": z.string(),
  //       "dc-explorer.tiles.title.facilities": z.string(),
  //       "dc-explorer.tiles.title.facility": z.string(),
  //       "dc-explorer.tiles.title.gender": z.string(),
  //       "dc-explorer.tiles.title.genders": z.string(),
  //       "dc-explorer.tiles.title.items": z.string(),
  //       "dc-explorer.tiles.title.language": z.string(),
  //       "dc-explorer.tiles.title.languages": z.string(),
  //       "dc-explorer.tiles.title.primaryBeamParticles": z.string(),
  //       "dc-explorer.tiles.title.secondaryBeamParticles": z.string(),
  //       "dc-explorer.tiles.title.semesters": z.string(),
  //       "dc-explorer.tiles.title.study-level": z.string(),
  //       "dc-explorer.tiles.title.study-levels": z.string(),
  //       "dc-explorer.tiles.title.programmes-of-study": z.string(),
  //       "dc-explorer.tiles.title.teaching-event": z.string(),
  //       "dc-explorer.tiles.title.teaching-events": z.string(),
  //       "dc-explorer.tiles.title.universities": z.string(),
  //       "dc-explorer.tiles.title.university": z.string(),
  //       "dc-explorer.tiles.title.weeklySemesterHours": z.string(),
  //       "dc-explorer.tiles.title.year": z.string(),
  //       "dc-explorer.tiles.title.with_userFacilities": z.string(),
  //       "dc-explorer.tiles.title.with_facilities": z.string(),
  //       "dc-explorer.tiles.title.with_theses": z.string(),
  //       "dc-explorer.tiles.title.with_teachingEvents": z.string(),
  //     }),
  //   }),
  // }),

  docs,
  // reviewStatuses: defineReviewStatusesCollection,
  // taxonomyItems: defineTaxonomyItemsCollection,
  // organizations: defineOrganizationCollection,
  // facilities: defineFacilityCollection,
  // courses: defineCoursesCollection,
  // theses: defineThesesCollection,
  // references: defineReferencesCollection,
}
