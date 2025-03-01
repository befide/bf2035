const INPUT_FILE = 'taxonomy-items.csv';

import { defineCollection, reference, z } from 'astro:content';

import { csv2json } from 'csv42';
import {
	LocalizedString,
	NullableLocalizedString,
	readInputFile,
	ReviewSchema,
} from './content.config.common';

const TaxonomyItemSchema = z.object({
	id: z.string(),
	hasParent: reference('taxonomyItems').optional().nullable(),
	isAcceleratorResearchSpecific: z.boolean(),
	term: LocalizedString,
	synonyms: NullableLocalizedString,
	definition: NullableLocalizedString,
	review: ReviewSchema,
});

export const defineTaxonomyItemsCollection = defineCollection({
	loader: async () => {
		const input = readInputFile(INPUT_FILE).toString();
		const data = csv2json<TaxonomyItem>(input, {
			nested: true,
		});
		return data;
	},
	schema: TaxonomyItemSchema,
});

export type TaxonomyItem = z.infer<typeof TaxonomyItemSchema>;
