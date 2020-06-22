import AbstractSort from "./AbstractSort";
import BaseSort from "./BaseSort";
import { mockArray } from "./utils/mock";
import { deepClone } from "./utils/copy";
import { getValue } from "./utils/key";
import { test } from "./utils/validate";

class BubbleSort<T> extends BaseSort<T> implements AbstractSort<T> {
  protected data: T[]
  constructor(data: T[]) {
    super();
    this.data = data;
  }
  sort(
    {
      key,
      ascend = false
    }: {
      ascend: boolean,
      key?: string
    }
  ): T[] {
    const data = deepClone(this.data);
    return ascend ? this.ascendingSort(data, key) : this.descendingSort(data, key)
  }

  descendingSort(data: T[], key?: string): T[] {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        const v1 = getValue(data[j], key)
        const v2 = getValue(data[j + 1], key)
        if (v1 < v2) {
          [data[j + 1], data[j]] = [data[j], data[j + 1]]
        }
      }
    }
    return data
  }

  ascendingSort(data: T[], key?: string): T[] {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        const v1 = getValue(data[j], key)
        const v2 = getValue(data[j + 1], key)
        if (v1 > v2) {
          [data[j + 1], data[j]] = [data[j], data[j + 1]]
        }
      }
    }
    return data
  }
}

test(BubbleSort, true, false)
