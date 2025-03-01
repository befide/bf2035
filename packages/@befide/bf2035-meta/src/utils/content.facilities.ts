import type { Facility } from '@/content.config.facilities';
import { getCollection, type CollectionEntry } from 'astro:content';

import { getRoots } from './content.tree';

export const getFacilities = async (options: {
	hostId?: string;
	isUserFacility?: boolean;
	lifeCycleCategory?: number;
}) =>
	(await getCollection('facilities'), 
			(entry: CollectionEntry<"facilities">) =>
				(options.hostId === undefined || entry.data.hasHost?.id === options.hostId) &&
				(options.isUserFacility === undefined ||
					entry.data.isUserFacility === options.isUserFacility) &&
				(options.lifeCycleCategory === undefined ||
					entry.data.lifeCycle!.id.indexOf('/' + options.lifeCycleCategory) > -1)
		)

export const getFacilityRoots = (items: Facility[]) => {
	return getRoots<Facility>(items);
};
