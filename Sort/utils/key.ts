function isObject(value: any): boolean {
  return Object.prototype.toString.call(value) === '[object Object]'
}

export function getValue(target: { [k: string]: any }, key: string) {
  if (!key || !isObject(target)) {
    return target;
  }
  const keyTree = key.split('.')
  const v = keyTree.reduce((obj, k) => obj && obj[k], target)
  return v;
}
