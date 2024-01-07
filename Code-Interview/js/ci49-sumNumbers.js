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
var sumNumbers = function (root) {
  if (!root) return 0;
  return add(root, 0);
};

function add(current, sum) {
  if (!current) return 0;
  sum = sum * 10 + current.val;
  if (!current.left && !current.right) return sum;
  let left = add(current.left, sum);
  let right = add(current.right, sum);
  return left + right;
}