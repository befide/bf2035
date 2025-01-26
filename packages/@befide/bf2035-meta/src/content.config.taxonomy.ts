import { defineCollection, reference, z } from 'astro:content';

import { csv2json } from 'csv42';
import {
  readInputFile,
  LocalizedString,
  NullableLocalizedString
} from './content.config.common';

const TaxonomySchema = z.object({
  id: z.string(),
  isA: reference('taxonomy').optional().nullable(),
  isAcceleratorResearchSpecific: z.boolean(),
  meta: z.object({
    status: reference('reviewStatuses').optional(),
    reviewedBy: z.string().nullable().default(''),
    changelog: z.string().nullable().default('')
  }),
  term: z.object({
    full: LocalizedString,
    short: NullableLocalizedString
  }),
  definition: NullableLocalizedString
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
