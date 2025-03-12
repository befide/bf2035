import type { Facility } from '@/content.config.facilities';
import type { Organization } from '@/content.config.organizations';
import type { TaxonomyItem } from '@/content.config.taxonomyItems';

export interface TreeNode<Datum> {
	id: string;
	parentId: string | null;
	depth: number;
	childIndex: number | null;
	data: Datum;
	children: TreeNode<Datum>[];
}

export function getRoots<Datum extends Facility | TaxonomyItem | Organization>(
	items: Array<Datum>
) {
	const roots: TreeNode<Datum>[] = [];

	const flatTreeNodes: TreeNode<Datum>[] = items.map((item) => ({
		id: item.id,
		parentId: (item.hasParent === null || typeof item.hasParent === "string") ? item.hasParent : item.hasParent?.id || null,
		data: item,
		childIndex: null,
		children: [],
		depth: 0,
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

export function flattenTreeNode<Datum>(node: TreeNode<Datum>): TreeNode<Datum>[] {
	return node.children.length > 0 ? [node, ...node.children.flatMap(flattenTreeNode)] : [node];
}

export function flattenTreeNodes<Datum>(nodes: TreeNode<Datum>[]) {
	return nodes.flatMap(flattenTreeNode);
}
