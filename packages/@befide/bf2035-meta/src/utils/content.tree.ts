import Facilities from '@/components/domain/Facilities.astro';
import type { Facility } from '@/content.config.facilities';
import type { Organization } from '@/content.config.organizations';
import type { Taxonomy } from '@/content.config.taxonomy';
import { getCollection, type CollectionEntry } from 'astro:content';

export interface TreeNode<Datum> {
  id: string;
  parentId: string | null;
  depth: number;
  childIndex: number | null;
  data: Datum;
  children: TreeNode<Datum>[];
}

export function getRoots<Datum extends Facility | Taxonomy | Organization>(
  items: Array<Datum>
) {
  const roots: TreeNode<Datum>[] = [];

  const flatTreeNodes: TreeNode<Datum>[] = items.map((item) => ({
    id: item.id,
    parentId: item.hasParent?.id || null,
    data: item,
    childIndex: null,
    children: [],
    depth: 0
  }));

  const flatTreeNodeMap: {
    [key: string]: TreeNode<Datum>;
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
        flatTreeNodeMap[item.id].depth = parent.depth + 1;
        flatTreeNodeMap[item.id].childIndex = parent.children.length;
        parent.children.push(flatTreeNodeMap[item.id]);
      }
    }
  });

  return roots;
}

export function flattenTreeNode<Datum>(node: TreeNode<Datum>) {
  return node.children.length > 0
    ? ([node, ...node.children.flatMap(flattenTreeNode)] as TreeNode<Datum>[])
    : ([node] as TreeNode<Datum>[]);
}

export function flattenTreeNodes<Datum>(nodes: TreeNode<Datum>[]) {
  return nodes.flatMap(flattenTreeNode);
}
