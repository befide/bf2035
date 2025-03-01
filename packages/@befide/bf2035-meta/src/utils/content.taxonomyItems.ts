import type { TaxonomyItem } from '@/content.config.taxonomyItems';
import { getCollection } from 'astro:content';

import { getRoots } from './content.tree';

export const allTaxonomyItems = await (getCollection(
	'taxonomyItems', () => true
));

export const allDomainTaxonomyItems = await (getCollection(
	'taxonomyItems', (entry) => entry.data.isAcceleratorResearchSpecific
));

export const allGeneralTaxonomyItems =  await (getCollection(
	'taxonomyItems', (entry) => !entry.data.isAcceleratorResearchSpecific
));

export const allTaxonomyRoots = (items: TaxonomyItem[]) => {
	return getRoots<TaxonomyItem>(items);
};
