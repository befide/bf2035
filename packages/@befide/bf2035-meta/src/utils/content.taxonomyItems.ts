import type { TaxonomyItem } from '@/content.config.taxonomyItems';
import { getCollection } from 'astro:content';

import { getRoots } from './content.tree';

export const allTaxonomyItems = async () => await (getCollection(
	'taxonomyItems', () => true
));

export const allDomainTaxonomyItems =  (await (getCollection(
	'taxonomyItems', (entry) => entry.data.isAcceleratorResearchSpecific
))).map(({data}) => data);

export const allGeneralTaxonomyItems =  (await (getCollection(
	'taxonomyItems', (entry) => !entry.data.isAcceleratorResearchSpecific
))).map(({data}) => data);


export const getTaxonomyItemRoots = (items: TaxonomyItem[]) => {
	return getRoots<TaxonomyItem>(items);
};
