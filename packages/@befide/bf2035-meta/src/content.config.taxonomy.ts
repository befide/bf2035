import { defineCollection, reference, z } from 'astro:content';

import { csv2json } from 'csv42';
import {
  readInputFile,
  LocalizedString,
  NullableLocalizedString,
  ReviewSchema
} from './content.config.common';

const TaxonomySchema = z.object({
  id: z.string(),
  hasParent: reference('taxonomy').optional().nullable(),
  isAcceleratorResearchSpecific: z.boolean(),
  term: z.object({
    full: LocalizedString,
    short: NullableLocalizedString
  }),
  definition: NullableLocalizedString,
  review: ReviewSchema
});

export const defineTaxonomyCollection = defineCollection({
  loader: async () => {
    const input = readInputFile('taxonomy.csv').toString();
    const data = csv2json<Taxonomy>(input, {
      nested: true
    });
    return data as Taxonomy[];
  },
  schema: TaxonomySchema
});

export type Taxonomy = z.infer<typeof TaxonomySchema>;
