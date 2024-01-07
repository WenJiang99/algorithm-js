/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} tree
 * @return {TreeNode}
 */
var convertBST = function (tree) {
  let sum = 0;
  function inorder(root) {
    if (!root) return;
    inorder(root.right);
    sum += root.val;
    root.val = sum;
    inorder(root.left);
  }
  inorder(tree);
  return tree;
};