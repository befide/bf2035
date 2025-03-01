import { getCollection, type CollectionEntry } from 'astro:content';

export const getCourses = async (universityId?: string) =>
	(await getCollection('courses'), 
		(entry: CollectionEntry<"courses">)  => 
			universityId === undefined || entry.data.offeredByUniversity?.id === universityId
	);
