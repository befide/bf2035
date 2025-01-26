import Facilities from '@/components/domain/Facilities.astro';
import type { Facility } from '@/content.config.facilities';
import type { Organization } from '@/content.config.organizations';
import type { Taxonomy } from '@/content.config.taxonomy';
import { getCollection, type CollectionEntry } from 'astro:content';

export interface TreeNode<Datum> {
  id: string;
  parentId: string | null;
  depth: number;
  data: Datum;
  children: TreeNode<Datum>[];
}

function getRoots<Datum extends Facility | Taxonomy | Organization>(
  items: Array<Datum>
) {
  const roots: TreeNode<Datum>[] = [];

  const flatTreeNodes: TreeNode<Datum>[] = items.map((item) => ({
    id: item.id,
    parentId: typeof item === .data.isDirectPartOf?.id || null,
    data: item,
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
}
