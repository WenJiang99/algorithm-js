import AbstractSort from "../AbstractSort";
import { mockArray } from "./mock";
import { deepClone } from "./copy";

export function test<T>(
  Ctor: { new(T): AbstractSort<T> },
  {
    ascend
  }: {
    ascend?: boolean
  }
): any {
  const log = console.log;
  const numberSample = mockArray({ length: 10 });
  const objSample = deepClone(numberSample.map(num => ({ data: { value: num } })))
  const numberSorter = new Ctor(numberSample);
  log(`[=====[number sample]=====]`)
  log(`raw data: `, numberSample)
  log(`sorted data: `, numberSorter.sort({ ascend }))
  const objSorter = new Ctor(objSample);
  log(`[=====[object sample]=====]`)
  log(`raw data: `, objSample)
  log(`sorted data: `, objSorter.sort({ ascend, key: 'data.value' }))
}
