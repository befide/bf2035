import type { TaxonomyItem } from '@/content.config.taxonomy';
import { getCollection, type CollectionEntry } from 'astro:content';

import { getRoots } from './content.tree';

export const allTaxonomyItems = (await getCollection(
	'taxonomyItems'
)) as CollectionEntry<'taxonomyItems'>[];

export const allDomainTaxonomyItems = allTaxonomyItems.filter(
	(entry) => entry.data.isAcceleratorResearchSpecific
);
export const allGeneralTaxonomyItems = allTaxonomyItems.filter(
	(entry) => !entry.data.isAcceleratorResearchSpecific
);

export const allTaxonomyRoots = (items: TaxonomyItem[]) => {
	return getRoots<TaxonomyItem>(items);
};
