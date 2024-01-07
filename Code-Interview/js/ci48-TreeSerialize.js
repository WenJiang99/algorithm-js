
function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
const DELIMITER = ',', EMPTY = '#';
var serialize = function (root) {
  if (!root) return EMPTY;
  let result = '';
  result += root.val;
  result += (DELIMITER + serialize(root.left));
  result += (DELIMITER + serialize(root.right));
  return result;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  if (data === EMPTY) return null;
  const dataList = data.split(DELIMITER);
  return dfs(dataList);
};

/**
 * 
 * @param {String[]} dataList 
 * @returns 
 */
function dfs(dataList) {
  const item = dataList.shift();
  if (item === EMPTY) return null;
  const val = Number(item);
  const n = new TreeNode(val);
  n.left = dfs(dataList);
  n.right = dfs(dataList);
  return n;
}

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */