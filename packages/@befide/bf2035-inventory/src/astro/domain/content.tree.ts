import type { NestedDomainObjectSchema } from "@/content/config.common"

export interface TreeNode<Datum> {
  id: string
  parent_id: string | null
  depth: number
  childIndex: number | null

  data: Datum
  children: TreeNode<Datum>[]
}

export function getRoots<
  Datum extends NestedDomainObjectSchema
>(items: Array<Datum>) {
  const roots: TreeNode<Datum>[] = []

  const flatTreeNodes: TreeNode<Datum>[] = items.map((item) => ({
    id: item.id,
    parent_id: item.parent_id,
    // item.hasParent === null ? item.hasParent : item.hasParent?.id || null,
    data: item,
    childIndex: null,
    children: [],
    depth: 0
  }))

  const flatTreeNodeMap: {
    [key: string]: TreeNode<Datum>
  } = {}

  flatTreeNodes.forEach((node) => {
    flatTreeNodeMap[node.id] = { ...node, children: [] }
  })

  flatTreeNodes.forEach((item) => {
    if (item.parent_id === null) {
      if (flatTreeNodeMap[item.id] !== undefined) {
        roots.push(flatTreeNodeMap[item.id]!)
      }
    } else {
      const parent = flatTreeNodeMap[item.parent_id]
      if (parent) {
        flatTreeNodeMap[item.id]!.depth = parent.depth + 1
        flatTreeNodeMap[item.id]!.childIndex = parent.children.length
        parent.children.push(flatTreeNodeMap[item.id]!)
      }
    }
  })

  return roots
}

export function flattenTreeNode<Datum>(
  node: TreeNode<Datum>
): TreeNode<Datum>[] {
  return node.children.length > 0
    ? [node, ...node.children.flatMap(flattenTreeNode)]
    : [node]
}

export function flattenTreeNodes<Datum>(nodes: TreeNode<Datum>[]) {
  return nodes.flatMap(flattenTreeNode)
}
