export function deepClone<T>(arr: T[]): T[] {
  const result = []
  for (let i = 0; i < arr.length; i++) {
    result.push(arr[i])
  }
  return result;
}
