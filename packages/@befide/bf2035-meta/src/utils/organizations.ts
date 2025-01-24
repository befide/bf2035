import { getCollection, type CollectionEntry } from 'astro:content';

import type { TreeNode } from './facilities';

export const getOrganizations = async (
  topLevelOrganizationId: string | undefined
) =>
  (await getCollection('organizations'))
    .filter(
      (d) =>
        topLevelOrganizationId === undefined ||
        d.data.hasTopLevelOrganization?.id === topLevelOrganizationId ||
        d.id === topLevelOrganizationId
    )
    .sort((a, b) => a.id.localeCompare(b.id));

export const getOrganizationRoots = (
  organizations: CollectionEntry<'organizations'>[]
) => {
  const treeNodes: TreeNode<CollectionEntry<'organizations'>>[] = [];

  const roots: TreeNode<CollectionEntry<'organizations'>>[] = [];

  const flatTreeNodes: TreeNode<CollectionEntry<'organizations'>>[] =
    organizations.map((organization) => ({
      id: organization.id,
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
