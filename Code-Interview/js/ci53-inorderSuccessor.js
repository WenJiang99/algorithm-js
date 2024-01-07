/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @return {TreeNode}
 */
var inorderSuccessor = function (root, p) {
  if (!root || !p) return null;
  let current = root, prev = null;
  while (current) {
    if (p.val < current.val) {
      prev = current;
      current = current.left
    } else current = current.right;
  }
  return prev;
};