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
 * @return {number}
 */
var maxPathSum = function (root) {
  let maxSum = -Infinity;
  function core(current) {
    if (!current) return 0;
    const left = Math.max(core(current.left), 0);
    const right = Math.max(core(current.right), 0);
    // 经过 root , left->root, left->root->right, root->right 这四种情况的最大值
    // 也就是以current为跟的情况的最大的路径和
    maxSum = Math.max(maxSum, current.val + left + right);
    // 返回值是包含了root的情况的最大值，用来给父节点判断左右子树的最大值
    const ret = current.val + Math.max(left, right);
    return ret;
  }
  core(root);
  return maxSum;
};
