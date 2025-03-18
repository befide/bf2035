import { defineCollection, reference, z } from 'astro:content';
import { file } from 'astro/loaders'
import path from "node:path"
import { csv2json } from 'csv42';
import {
	LocalizedString,
	NullableLocalizedString,
	ReviewSchema,
} from './content.config.common';

const INPUT_FILE_PATH = path.join(
	import.meta.dirname,
	'data',
	'grist',
	'taxonomy-items.csv'
)

export const TaxonomyItemSchema = z.object({
	id: z.string(),
	hasParent: reference('taxonomyItems').nullable(),
	isDomainSpecific: z.boolean().default(false),
	term: LocalizedString,
	definition: NullableLocalizedString,
	synonyms: NullableLocalizedString,
	review: ReviewSchema,
});

export type TaxonomyItem = z.infer<typeof TaxonomyItemSchema>;

export const defineTaxonomyItemsCollection = defineCollection({
	loader: file(INPUT_FILE_PATH, {
		parser: (input) => csv2json<TaxonomyItem>(input, {
			nested: true
		})
	}),
		schema: TaxonomyItemSchema,
	});


