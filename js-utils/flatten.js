function flatten(arr, deep = Infinity) {
  if (!Array.isArray(arr)) return arr;
  function pushTo(arr, result, deep) {
    deep = typeof deep === 'number' ? deep : Infinity;
    for (let i = 0; i < arr.length; i++) {
      const item = arr[i];
      if (deep > 0 && Array.isArray(item)) {
        pushTo(item, result, deep - 1);
      } else {
        result.push(item);
      }
    }
  }
  const result = [];
  pushTo(arr, result, deep);
  return result;
}

console.log('deep: infinity', flatten([1, 2, [1, [2, 3, [4, 5, [6]]]]]))
console.log('deep: 3', flatten([1, 2, [1, [2, 3, [4, 5, [6]]]]], 3));