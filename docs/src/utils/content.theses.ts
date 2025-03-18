import { getCollection } from 'astro:content'

export const allTheses = async () => await getCollection('theses')

export const allThesesForUniversity = async (universityId: string) =>
  await getCollection(
    'theses',
    (entry) => entry.data.universityRef?.id === universityId
  )
