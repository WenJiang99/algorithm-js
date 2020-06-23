import AbstractSort, { ISortParam } from "./AbstractSort";
import BaseSort from "./BaseSort";
import { deepClone } from "./utils/copy";
import { getValue } from "./utils/key";
import { test } from "./utils/validate";

class MergeSort<T> extends BaseSort<T> implements AbstractSort<T> {
  protected data: T[]
  constructor(data: T[]) {
    super();
    this.data = data;
  }
  sort({ key, ascend }: ISortParam): T[] {
    const data = deepClone(this.data);
    return this.mergeSort(data, { key, ascend })
  }

  mergeSort(data: T[], params: ISortParam): T[] {
    if (data.length === 1) return data;
    const bound = Math.floor(data.length / 2)
    const [left, right] = [data.slice(0, bound), data.slice(bound)]
    return this.merge(this.mergeSort(left, params), this.mergeSort(right, params), params)
  }

  merge(left: T[], right: T[], { key, ascend }: ISortParam): T[] {
    const result = []
    let i = 0, j = 0;
    while (i < left.length && j < right.length) {
      const [vleft, vright] = [getValue(left[i], key), getValue(right[j], key)]
      if (vleft > vright) {
        ascend ? result.push(right[j++]) : result.push(left[i++])
      } else {
        ascend ? result.push(left[i++]) : result.push(right[j++])
      }
    }
    while (i < left.length) {
      result.push(left[i++])
    }
    while (j < left.length) {
      result.push(right[j++])
    }
    return result;
  }
}

test(MergeSort, { ascend: false })