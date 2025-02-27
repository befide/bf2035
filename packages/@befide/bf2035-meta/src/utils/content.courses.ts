import { getCollection, type CollectionEntry } from 'astro:content';

export const getCourses = async (universityId?: string) =>
	(await getCollection('courses')).filter(
		(d) => universityId === undefined || d.data.offeredByUniversity?.id === universityId
	);
