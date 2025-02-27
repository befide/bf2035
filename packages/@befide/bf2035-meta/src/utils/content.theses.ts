import { getCollection, type CollectionEntry } from 'astro:content';

export const allTheses = (await getCollection('theses')) as CollectionEntry<'theses'>[];

export const allThesesForUniversity = (universityId: string) =>
	allTheses.filter((entry) => entry.data.universityRef.id === universityId);
