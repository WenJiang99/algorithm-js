import AbstractSort from "../AbstractSort";
import { mockArray } from "./mock";
import { deepClone } from "./copy";
import { getValue } from "./key";

function check<T>(
  data: T[],
  {
    key,
    ascend = true
  }: {
    key?: string
    ascend?: boolean
  }
): boolean {
  let i = -1;
  let sorted = true;
  while (++i < data.length - 1) {
    const [current, next] = [getValue(data[i], key), getValue(data[i + 1], key)]
    if (ascend) {
      if (current > next) {
        sorted = false;
        break;
      }
    } else {
      if (current < next) {
        sorted = false;
        break;
      }
    }
  }
  return sorted;
}

export function test<T>(
  Ctor: { new(T): AbstractSort<T> },
  {
    ascend,
    size = 10,
    min,
    max,
    isInt
  }: {
    ascend?: boolean
    size?: number,
    min?: number,
    max?: number,
    isInt?: boolean
  }
): any {
  const log = console.log;
  const numberSample = mockArray({ length: size, min, max, isInt });
  const objSample = deepClone(numberSample.map(num => ({ data: { value: num } })))
  const numberSorter = new Ctor(numberSample);
  const sortedNum = numberSorter.sort({ ascend });
  log(`[=====[number sample]=====]`)
  log(`raw data: `, numberSample)
  log(`sorted data: `, sortedNum)
  log(`sorted ${ascend ? 'ascending' : 'desceding'} correctly ? ${check(sortedNum, { ascend })}`)

  const objSorter = new Ctor(objSample);
  const key = 'data.value'
  const sortedObj = objSorter.sort({ ascend, key });
  log(`[=====[object sample]=====]`)
  log(`raw data: `, objSample)
  log(`sorted data: `, sortedObj)
  log(`sorted ${ascend ? 'ascending' : 'desceding'} correctly ? ${check(sortedObj, { ascend, key })}`)
}
