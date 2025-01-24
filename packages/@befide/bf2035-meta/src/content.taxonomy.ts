import { defineCollection, reference, z } from 'astro:content';
const __dirname = import.meta.dirname;
import fs from 'node:fs';
import path from 'node:path';
const DATA_PATH = path.join(__dirname, 'data', 'grist');
const INPUT_FILE = path.join(DATA_PATH, 'taxonomy.csv');

import { csv2json } from 'csv42';

const LocalizedString = z.object({ de: z.string(), en: z.string() });
const NullableLocalizedString = z.object({
  de: z.string().nullable().optional(),
  en: z.string().nullable().optional()
});

export const MetaStatus = z.enum([
  '01 in preparation',
  '02 ready for review',
  '03 in review',
  '04 reviewed',
  '05 approved'
]);

const taxonomySchema = z.object({
  id: z.string(),
  isA: reference('taxonomy').optional().nullable(),
  isAcceleratorResearchSpecific: z.boolean(),
  meta: z.object({
    status: MetaStatus.optional(),
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
    const input = fs.readFileSync(INPUT_FILE).toString();
    const data = csv2json(input, {
      nested: true
    });
    data.forEach((d: any) => {});
    return data;
  },
  schema: taxonomySchema
});
