import { getCollection, type CollectionEntry } from 'astro:content';

import type { TreeNode } from './content.facilities';

export const getOrganizations = async (topLevelOrganizationId?: string) =>
  (await getCollection('organizations'))
    .filter(
      (d) =>
        topLevelOrganizationId === undefined ||
        d.data.hasTopLevelOrganization?.id === topLevelOrganizationId ||
        d.id === topLevelOrganizationId ||
        d.id === ':'
    )
    .sort((a, b) => a.id.localeCompare(b.id));

export const getCommunityOrganizations = async () => {
  return (await getOrganizations()).filter((d) => d.data.isPartOfCommunity);
};

export const getCommunityTopLevelOrganizations = async () => {
  return (await getOrganizations()).filter(
    (d) => !d.data.hasTopLevelOrganization
  );
};

export const getOrganizationRoots = (
  organizations: CollectionEntry<'organizations'>[]
) => {
  const treeNodes: TreeNode<CollectionEntry<'organizations'>>[] = [];

  const roots: TreeNode<CollectionEntry<'organizations'>>[] = [];

  const flatTreeNodes: TreeNode<CollectionEntry<'organizations'>>[] =
    organizations.map((organization) => ({
      id: organization.id,
      depth: 0,
      parentId: organization.data.isDirectPartOf?.id,
      data: organization,
      children: []
    }));

  const flatTreeNodeMap: {
    [key: string]: TreeNode<CollectionEntry<'organizations'>>;
  } = {};

  flatTreeNodes.forEach((node) => {
    flatTreeNodeMap[node.id] = { ...node, children: [] };
  });

  flatTreeNodes.forEach((item) => {
    if (!item.parentId) {
      item.depth = 0;
      roots.push({ ...flatTreeNodeMap[item.id] });
    } else {
      const parent = flatTreeNodeMap[item.parentId];
      if (parent) {
        flatTreeNodeMap[item.id].depth = parent.depth + 1;
        parent.children.push(flatTreeNodeMap[item.id]);
      }
    }
  });

  return roots;
};
