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
 * @param {number} targetSum
 * @return {number}
 */
var pathSum = function (root, targetSum) {
  const sumToCount = new Map();
  sumToCount.set(0, 1);
  return count(root, targetSum, sumToCount, 0);

};
function count(root, target, sumToCount, sum) {
  if (!root) return 0;
  sum += root.val;
  let result = sumToCount.get(sum - target) || 0;
  const prevPathCount = sumToCount.get(sum) || 0;
  sumToCount.set(sum, prevPathCount + 1);
  result += count(root.left, target, sumToCount, sum);
  result += count(root.right, target, sumToCount, sum);
  sumToCount.set(sum, prevPathCount);
  return result;
}