import { defineCollection, z } from 'astro:content';

import taxonomyData from 'src/data/taxonomy.json';


export const defineTaxonomyCollection = defineCollection({
  loader: () => {
    return taxonomyData;
  },
  schema: z.object({
    id: z.string(),
    type: z.string(),
    path: z.string().nullable(),
    labelShortFormDe: z.string().nullable().optional(),
    labelLongFormEn: z.string().nullable().optional(),
    labelLongFormDe: z.string().nullable().optional(),
    descriptionDe: z.string().nullable().optional()
  })
});
