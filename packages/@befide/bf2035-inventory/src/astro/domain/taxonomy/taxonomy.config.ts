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

export const TaxonomyItemSchema = z.object({
  id: z.string(),
  parentId: z.string().nullable(),
  parent: reference("taxonomyItems").nullable(),
  taxonomyURI: z.string(),
  term: LocalizedString,
  definition: NullableLocalizedString,
  synonyms: NullableLocalizedString,
  review: ReviewSchema,
});

export type TaxonomyItem = z.infer<typeof TaxonomyItemSchema>;

export const defineTaxonomyItemsCollection = defineCollection({
  loader: file(INPUT_FILE_PATH, {
    parser: (input) => {
      const data = csv2json<TaxonomyItem>(input, {
        nested: true,
      })

      data.forEach(d => {

        d.parent =  d.parentId
      })
      return data
    
    
    }
  }),
  schema: TaxonomyItemSchema,
});
