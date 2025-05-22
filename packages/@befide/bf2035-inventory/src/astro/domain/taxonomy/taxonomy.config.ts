import { defineCollection, reference, z } from "astro:content";
import { file } from "astro/loaders";
import path from "node:path";
import { csv2json } from "csv42";
import {
  LocalizedString,
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

const TaxonomyItemZodSchema = z.object({
  id: z.string(),
  parent_id: z.string().nullable(),
  // parent: reference("taxonomyItems").nullable(),
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
