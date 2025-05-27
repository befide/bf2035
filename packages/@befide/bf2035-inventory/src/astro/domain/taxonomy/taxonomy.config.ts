import { defineCollection, reference, z } from "astro:content";
import { file } from "astro/loaders";
import path from "node:path";
import { csv2json } from "csv42";
import {
  LocalizedString,
  NestedDomainObjectZodSchema,
  NullableLocalizedString,
  ReviewSchema,
} from "../../../content/config.common";

const INPUT_FILE_PATH = path.join(
  import.meta.dirname,
  "..",
  "..",
  "..",
  "data",
  "grist",
  "taxonomy-items.csv",
);

const TaxonomyItemZodSchema = NestedDomainObjectZodSchema.extend({
  taxonomyURI: z.string(),
  term: LocalizedString,
  definition: NullableLocalizedString,
  synonyms: NullableLocalizedString,
  review: ReviewSchema
})

export type TaxonomyItemSchema = z.infer<typeof TaxonomyItemZodSchema>

export const defineTaxonomyItemsCollection = defineCollection({
  loader: file(INPUT_FILE_PATH, {
    parser: (input) => {
      const data = csv2json<TaxonomyItemSchema>(input, {
        nested: true
      })

      return data
    }
  }),
  schema: TaxonomyItemZodSchema
})
