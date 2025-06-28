import { defineCollection, z } from "astro:content"
import { glob } from "astro/loaders"

import {
  Locales,
  LocalizedString,
  NestableDomainObjectZodSchema,
  NullableLocalizedString,
  ReviewSchema,
} from "@content/config.common.ts"

const TaxonomyItemZodSchema = NestableDomainObjectZodSchema.extend({
  id: z.string(),
  taxonomyURI: z.string(),
  term: LocalizedString,
  definition: NullableLocalizedString,
  abbreviations: z.record(Locales, z.array(z.string())),
  synonyms: z.record(Locales, z.array(z.string())),
  iris: z.array(z.string()),
  review: ReviewSchema,
})

export type TaxonomyItemSchema = z.infer<typeof TaxonomyItemZodSchema>

export const defineTaxonomyItemsCollection = defineCollection({
  loader: glob({
    pattern: "**/*.(md|mdx)",
    base: "./src/content/domain/taxonomy-items",
  }),

  schema: TaxonomyItemZodSchema,
})
