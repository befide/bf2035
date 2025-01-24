import { getCollection, type CollectionEntry } from 'astro:content';
import { stratify } from 'd3-hierarchy';

export const getFacilities = async (hostId?: string) =>
  (await getCollection('facilities'))
    .filter((d) => hostId === undefined || d.data.hasHost?.id === hostId)
    .sort((a, b) => a.id.localeCompare(b.id));

export interface TreeNode<Datum> {
  id: string;
  parentId: string | null;
  children: TreeNode<Datum>[];
  data: Datum;
}

export const getFacilityRoots = (
  facilities: CollectionEntry<'facilities'>[]
) => {
  const treeNodes: TreeNode<CollectionEntry<'facilities'>>[] = [];

  const roots: TreeNode<CollectionEntry<'facilities'>>[] = [];

  const flatTreeNodes: TreeNode<CollectionEntry<'facilities'>>[] =
    facilities.map((facility) => ({
      id: facility.id,
      parentId: facility.data.isDirectPartOf?.id || null,
      data: facility,
      children: []
    }));

  const flatTreeNodeMap: {
    [key: string]: TreeNode<CollectionEntry<'facilities'>>;
  } = {};

  flatTreeNodes.forEach((node) => {
    flatTreeNodeMap[node.id] = { ...node, children: [] };
  });

  flatTreeNodes.forEach((item) => {
    if (item.parentId === null) {
      roots.push(flatTreeNodeMap[item.id]);
    } else {
      const parent = flatTreeNodeMap[item.parentId];
      if (parent) {
        parent.children.push(flatTreeNodeMap[item.id]);
      }
    }
  });

  return roots;
};
