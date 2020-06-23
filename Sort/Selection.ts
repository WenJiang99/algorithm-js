import AbstractSort, { ISortParam } from "./AbstractSort";
import BaseSort from "./BaseSort";
import { deepClone } from "./utils/copy";
import { getValue } from "./utils/key";
import { test } from "./utils/validate";

class SelectionSort<T> extends BaseSort<T> implements AbstractSort<T> {
  protected data: T[]
  constructor(data: T[]) {
    super();
    this.data = data;
  }
  sort({ key, ascend }: ISortParam): T[] {
    const data = deepClone(this.data)
    return ascend ? this.ascendingSort(data, key) : this.descendingSort(data, key)
  }
  ascendingSort(data: T[], key?: string) {
    let i = -1;
    while (++i < data.length) {
      let minIndex = i;
      let j = minIndex;
      while (++j < data.length) {
        const [v1, v2] = key
          ? [getValue(data[minIndex], key), getValue(data[j], key)]
          : [data[minIndex], data[j]]
        if (v1 > v2) {
          this.swap(data, minIndex, j)
        }
      }
    }
    return data;
  }

  descendingSort(data: T[], key?: string) {
    let i = -1;
    while (++i < data.length) {
      let minIndex = data.length - 1 - i;
      let j = minIndex;
      while (--j >= 0) {
        const [v1, v2] = key
          ? [getValue(data[minIndex], key), getValue(data[j], key)]
          : [data[minIndex], data[j]]
        if (v1 > v2) {
          this.swap(data, minIndex, j)
        }
      }
    }
    return data;
  }
}

test(SelectionSort, { ascend: false })
