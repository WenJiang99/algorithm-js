export function test<T>(cb: (data: T) => any, data: T): any {
  const res = cb(data)
  console.log(res)
}
