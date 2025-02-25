const INPUT_FILE = 'taxonomy.csv'

import { defineCollection, reference, z } from 'astro:content'

import { csv2json } from 'csv42'
import {
  readInputFile,
  LocalizedString,
  NullableLocalizedString,
  ReviewSchema
} from './content.config.common'

const TaxonomySchema = z.object({
  id: z.string(),
  hasParent: reference('taxonomyItems').optional().nullable(),
  isAcceleratorResearchSpecific: z.boolean(),
  term: z.object({
    full: LocalizedString,
    short: NullableLocalizedString
  }),
  definition: NullableLocalizedString,
  review: ReviewSchema
})

export const defineTaxonomyItemsCollection = defineCollection({
  loader: async () => {
    const input = readInputFile(INPUT_FILE).toString()
    const data = csv2json<TaxonomyItem>(input, {
      nested: true
    })
    return data
  },
  schema: TaxonomyItemSchema
})

export type TaxonomyItem = z.infer<typeof TaxonomyItemSchema>
