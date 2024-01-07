/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var increasingBST = function (tree) {
  const dummy = new TreeNode(-1);
  let tail = dummy;
  function inorder(root) {
    if (!root) return;
    inorder(root.left);
    tail.right = root;
    root.left = null;
    tail = root;
    inorder(root.right);
  }
  inorder(tree);
  return dummy.right;
};