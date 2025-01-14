"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildRolledUpContentCollectionTree = exports.buildContentCollectionTree = exports.rollupContentCollectionTree = exports.getParentPath = void 0;
var getParentPath = function (path) {
    if (path === '/')
        return null;
    return ((path.split('/').length === 2 ? '/' : '') +
        path.split('/').slice(0, -1).join('/'));
};
exports.getParentPath = getParentPath;
var rollupContentCollectionTree = function (tree, i, d) {
    var _a;
    if (i === void 0) { i = 0; }
    if (d === void 0) { d = 0; }
    var walk = true;
    if (walk) {
        if (Array.isArray(tree)) {
            tree.forEach(function (v, i) {
                var _a;
                (0, exports.rollupContentCollectionTree)(v, i, d + 1);
                if (v.data)
                    v.data.childrenCount = 0;
                (_a = v.children) === null || _a === void 0 ? void 0 : _a.forEach(function (child) { return (v.data.childrenCount += child.data.childrenCount); });
            });
        }
        else {
            (_a = tree.children) === null || _a === void 0 ? void 0 : _a.forEach(function (child, i) {
                var _a;
                (0, exports.rollupContentCollectionTree)(child, i, d + 1);
                child.data.childrenCount = (_a = child.children) === null || _a === void 0 ? void 0 : _a.length;
            });
        }
    }
};
exports.rollupContentCollectionTree = rollupContentCollectionTree;
function buildContentCollectionTree(items, parentId) {
    if (parentId === void 0) { parentId = ''; }
    var tree = [];
    for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
        var item = items_1[_i];
        if ((0, exports.getParentPath)(item.id) === parentId) {
            var treeItem = {
                key: item.id,
                data: item.data,
                children: buildContentCollectionTree(items, item.id)
            };
            tree.push(treeItem);
        }
    }
    return tree;
}
exports.buildContentCollectionTree = buildContentCollectionTree;
var buildRolledUpContentCollectionTree = function (items) {
    var tree = buildContentCollectionTree(items);
    (0, exports.rollupContentCollectionTree)(tree);
    return tree;
};
exports.buildRolledUpContentCollectionTree = buildRolledUpContentCollectionTree;
