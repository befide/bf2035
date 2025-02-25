import type { TreeNode } from 'primevue/treenode';

export const getParentPath = (path: string) => {
  if (path === '/') return null;

  return (
    (path.split('/').length === 2 ? '/' : '') +
    path.split('/').slice(0, -1).join('/')
  );
};

export const rollupContentCollectionTree = (
  tree: TreeNode | TreeNode[],
  i = 0,
  d = 0
) => {
  const walk = true;

  if (walk) {
    if (Array.isArray(tree)) {
      tree.forEach((v, i) => {
        rollupContentCollectionTree(v, i, d + 1);
        if (v.data) v.data.childrenCount = 0;
        v.children?.forEach(
          (child) => (v.data.childrenCount += child.data.childrenCount)
        );
      });
    } else {
      tree.children?.forEach((child, i) => {
        rollupContentCollectionTree(child, i, d + 1);
        child.data.childrenCount = child.children?.length;
      });
    }
  }
};
export function buildContentCollectionTree(
  items: any,
  parentId = ''
): TreeNode[] {
  const tree: TreeNode[] = [];

  for (const item of items) {
    if (getParentPath(item.id) === parentId) {
      const treeItem: TreeNode = {
        key: item.id,
        data: item.data,
        children: buildContentCollectionTree(items, item.id)
      };

      tree.push(treeItem);
    }
  }
  return tree;
}

export const buildRolledUpContentCollectionTree = (items: any) => {
  const tree: TreeNode[] = buildContentCollectionTree(items);
  rollupContentCollectionTree(tree);
  return tree;
};
