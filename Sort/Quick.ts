import AbstractSort, { ISortParam } from "./AbstractSort";
import BaseSort from "./BaseSort";
import { deepClone } from "./utils/copy";
import { getValue } from "./utils/key";
import { test } from "./utils/validate";

class QuickSort<T> extends BaseSort<T> implements AbstractSort<T> {
  protected data: T[]
  constructor(data: T[]) {
    super();
    this.data = data;
  }
  sort(param: ISortParam): T[] {
    const data = deepClone(this.data)
    return this.quickSort(data, 0, data.length - 1, param)
  }

  quickSort(data: T[], left: number, right: number, params: ISortParam): T[] {
    let index;
    if (data.length > 1) {
      index = this.partition(data, left, right, params)
      if (index > left + 1) {
        this.quickSort(data, left, index - 1, params)
      }
      if (index < right) {
        this.quickSort(data, index, right, params)
      }
    }
    return data
  }

  partition(data: T[], left: number, right: number, { key, ascend }: ISortParam): number {
    const pivot = this.getPivot(data, left, right)
    const pivotValue = getValue(pivot, key)
    let i = left, j = right;
    while (i <= j) {
      if (ascend) {
        while (getValue(data[i], key) < pivotValue) i++;
        while (getValue(data[j], key) > pivotValue) j--;
      } else {
        while (getValue(data[i], key) > pivotValue) i++;
        while (getValue(data[j], key) < pivotValue) j--;
      }
      if (i <= j) {
        this.swap(data, i, j)
        i++;
        j--;
      }
    }
    return i;
  }

  getPivot(data: T[], left: number, right: number): T {
    const index = Math.floor((left + right) / 2)
    return data[index]
  }

}

test(QuickSort, { size: 100, isInt: true, max: 10000, ascend: false })