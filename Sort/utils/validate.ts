import AbstractSort from "../AbstractSort";
import { mockArray } from "./mock";

export function test<T>(Ctor: { new(T): AbstractSort<T> }, obj: boolean = false, ascend: boolean = true): any {
  const log = console.log;
  const numberSample = mockArray({ length: 10 });
  const objSample = numberSample.map(num => ({ data: { value: num } }))
  const selection = new Ctor(obj ? objSample : numberSample);
  if (obj) {
    log(`raw data: `, objSample)
    log(`sorted data: `, selection.sort({ ascend, key: 'data.value' }))
  } else {
    log(`raw data: `, numberSample)
    log(`sorted data: `, selection.sort({ ascend }))
  }
}
