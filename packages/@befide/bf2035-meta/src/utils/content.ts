export interface TreeNode {
  /**
   * Mandatory unique key of the node.
   */
  key: string;
  /**
   * Label of the node.
   */
  label?: string;
  /**
   * Data represented by the node.
   */
  data?: any;
  /**
   * Type of the node to match a template.
   */
  type?: string;
  /**
   * Icon of the node to display next to content.
   */
  icon?: string;
  /**
   * An array of treenodes as children.
   */
  children?: TreeNode[];
  /**
   * Inline style of the node.
   */
  style?: any;
  /**
   * Style class of the node.
   */
  styleClass?: string;
  /**
   * Whether the node is selectable when selection mode is enabled.
   * @defaultValue null
   */
  selectable?: boolean;
  /**
   * Specifies if the node has children. Used in lazy loading.
   * @defaultValue false
   */
  leaf?: boolean;
  /**
   * Specifies the node loading. Used in Tree and TreeTable.
   */
  loading?: boolean;
  /**
   * Icon to use in expanded state.
   */
  expandedIcon?: string;
  /**
   * Icon to use in collapsed state.
   */
  collapsedIcon?: string;

  /**
   * Optional
   */
  [key: string]: any;
}

export const getParentPath = (path: string) => {
  if (path === "/") return null

  return (path.split ("/").length === 2 ? "/" : "") + path.split ("/").slice (0, -1).join ("/")
}

export const rollupContentCollectionTree = (tree: TreeNode | TreeNode[], i = 0, d = 0) => {
  const walk = true

  if (walk) {
    if (Array.isArray (tree)) {
      tree.forEach ((v) => {
        rollupContentCollectionTree (v, i, d + 1)
        if (v.data) v.data.childrenCount = 0
        v.children?.forEach ((child) => (v.data.childrenCount += child.data.childrenCount))
      })
    } else {
      tree.children?.forEach ((child, i) => {
        rollupContentCollectionTree (child, i, d + 1)
        child.data.childrenCount = child.children?.length
      })
    }
  }
}

export function buildContentCollectionTree (items: any, parentId = ""): TreeNode[] {
  const tree: TreeNode[] = []

  for (const item of items) {
    if (getParentPath (item.id) === parentId) {
      const treeItem: TreeNode = {
        key: item.id,
        data: item.data,
        children: buildContentCollectionTree (items, item.id)
      }

      tree.push (treeItem)
    }
  }
  return tree
}

//
// export const buildRolledUpContentCollectionTree = (items: any) => {
// 	const tree: TreeNode[] = buildContentCollectionTree(items);
// 	rollupContentCollectionTree(tree);
// 	return tree;
// };
