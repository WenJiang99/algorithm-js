import BaseSort from "./BaseSort";
import AbstractSort, { ISortParam } from "./AbstractSort";
import { deepClone } from "./utils/copy";
import { getValue } from "./utils/key";
import { test } from "./utils/validate";

class InsertSort<T> extends BaseSort<T> implements AbstractSort<T> {
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
      let j = i;
      const current = getValue(data[i], key)
      while (--j >= 0) {
        const prev = getValue(data[j], key)
        if (current > prev) {
          this.insert(data, j + 1, i)
          break
        }
        // 当前元素就是最小的元素
        if (j == 0) {
          this.insert(data, 0, i)
        }
      }
    }
    return data;
  }

  descendingSort(data: T[], key?: string) {
    let i = -1;
    while (++i < data.length) {
      let j = i;
      const current = getValue(data[i], key)
      while (--j >= 0) {
        const prev = getValue(data[j], key)
        if (current < prev) {
          this.insert(data, j + 1, i)
          break
        }
        // 当前元素就是最大的元素
        if (j === 0) {
          this.insert(data, 0, i)
        }
      }
    }
    return data;
  }

  insert(data: T[], targetIndex: number, currentIndex: number) {
    let i = currentIndex;
    const value = data[currentIndex];
    while (--i >= targetIndex) {
      data[i + 1] = data[i]
    }
    data[targetIndex] = value;
  }

}

test(InsertSort, { ascend: true })