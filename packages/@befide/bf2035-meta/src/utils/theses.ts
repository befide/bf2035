import { getCollection, type CollectionEntry } from 'astro:content';

export const getTheses = async (universityId: string | undefined) =>
  (await getCollection('theses'))
    .filter(
      (d) =>
        universityId === undefined || d.data.universityRef?.id === universityId
    )
    .sort((a, b) => -a.data.year + b.data.year);
