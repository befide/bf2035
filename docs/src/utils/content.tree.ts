import type { Facility } from '@/content.config.facilities'
import type { Organization } from '@/content.config.organizations'
import type { TaxonomyItem } from '@/content.config.taxonomyItems'

export interface TreeNode<Datum> {
  id: string
  parentId: string | null
  depth: number
  childIndex: number | null

  data: Datum
  children: TreeNode<Datum>[]
}

export function getRoots<Datum extends Facility | TaxonomyItem | Organization>(
  items: Array<Datum>
) {
  const roots: TreeNode<Datum>[] = []

  const flatTreeNodes: TreeNode<Datum>[] = items.map((item) => ({
    id: item.id,
    parentId:
      item.hasParent === null ? item.hasParent : item.hasParent?.id || null,
    data: item,
    childIndex: null,
    children: [],
    depth: 0,
  }))

  const flatTreeNodeMap: {
    [key: string]: TreeNode<Datum>
  } = {}

  flatTreeNodes.forEach((node) => {
    flatTreeNodeMap[node.id] = { ...node, children: [] }
  })

  flatTreeNodes.forEach((item) => {
    if (item.parentId === null) {
      if (flatTreeNodeMap[item.id] !== undefined) {
        roots.push(flatTreeNodeMap[item.id]!)
      }
    } else {
      const parent = flatTreeNodeMap[item.parentId]
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

//
// export const getParentPath = (path: string) => {
//   if (path === '/') return null
//
//   return (
//     (path.split('/').length === 2 ? '/' : '') +
//     path.split('/').slice(0, -1).join('/')
//   )
// }
//
// export const rollupContentCollectionTree = (
//   tree:
//     | TreeNode<Facility | TaxonomyItem | Organization>
//     | TreeNode<Facility | TaxonomyItem | Organization>[],
//   i = 0,
//   d = 0
// ) => {
//   const walk = true
//
//   if (walk) {
//     if (Array.isArray(tree)) {
//       tree.forEach((v) => {
//         rollupContentCollectionTree(v, i, d + 1)
//         if (v.data) v.childrenCount = 0
//         v.children?.forEach(
//           (child) => (v.data.childrenCount += child.data.childrenCount)
//         )
//       })
//     } else {
//       tree.children?.forEach((child, i) => {
//         rollupContentCollectionTree(child, i, d + 1)
//         child.data.childrenCount = child.children?.length
//       })
//     }
//   }
// }
//
// // export function buildContentCollectionTree(
// //   items: any,
// //   parentId = ''
// // ): TreeNode[] {
// //   const tree: TreeNode[] = []
// //
// //   for (const item of items) {
// //     if (getParentPath(item.id) === parentId) {
// //       const treeItem: TreeNode = {
// //         key: item.id,
// //         data: item.data,
// //         children: buildContentCollectionTree(items, item.id),
// //       }
// //
// //       tree.push(treeItem)
// //     }
// //   }
// //   return tree
// // }
