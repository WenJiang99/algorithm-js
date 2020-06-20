# 排序算法

## 冒泡排序

### 算法核心
**冒泡排序**算法中，`data`数组存储待排序的数据，如果数组中含有`n`个元素，需要进行`n`次循环遍历来确定排序后的数组上的`n`个位置上的元素，遍历一次确定一个位置。
每次遍历确定某个位置时候，从数组最开头开始遍历，对于升序排序，则把找出的最大的元素放到最后面，如果是降序排序，则把找出的最小的元素放到最后面。

因此一个完整冒泡排序需要两个循环，外层循环需要执行`n`次，用于确定排序后的数组的`n`个位置上的对应元素，内层循环用于找出本次循环的最小或最大的元素。

### 代码实现

```ts
import AbstractSort from "./AbstractSort";
import BaseSort from "./BaseSort";
import { mockArray } from "./utils/mock";
import { deepClone } from "./utils/copy";

class BubbleSort<T> extends BaseSort<T> implements AbstractSort<T> {
  protected data: T[]
  constructor(data: T[]) {
    super();
    this.data = data;
  }
  sort(ascend: boolean = false): T[] {
    const data = deepClone(this.data);
    return ascend ? this.ascendingSort(data) : this.descendingSort(data)
  }

  descendingSort(data: T[]): T[] {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j] < data[j + 1]) {
          [data[j + 1], data[j]] = [data[j], data[j + 1]]
        }
      }
    }
    return data
  }

  ascendingSort(data: T[]): T[] {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data.length - i - 1; j++) {
        if (data[j] > data[j + 1]) {
          [data[j + 1], data[j]] = [data[j], data[j + 1]]
        }
      }
    }
    return data
  }
}
```