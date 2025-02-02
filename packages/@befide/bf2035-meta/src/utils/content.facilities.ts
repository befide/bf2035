import type { Facility } from '@/content.config.facilities';
import { getCollection, type CollectionEntry } from 'astro:content';
import { stratify } from 'd3-hierarchy';
import { getRoots } from './content.tree';

export const getFacilities = async (hostId?: string) =>
  (await getCollection('facilities'))
    .filter((d) => hostId === undefined || d.data.hasHost?.id === hostId)
    .sort((a, b) => a.id.localeCompare(b.id))
    .map((d) => d.data);

export const getFacilityRoots = (items: Facility[]) => {
  return getRoots<Facility>(items);
};
