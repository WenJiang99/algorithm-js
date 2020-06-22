# 排序算法

## 冒泡排序

### 算法核心
**冒泡排序**算法中，`data`数组存储待排序的数据，如果数组中含有`n`个元素，需要进行`n`次循环遍历来确定排序后的数组上的`n`个位置上的元素，遍历一次确定一个位置。
每次遍历确定某个位置时候，从数组最开头开始遍历，对于升序排序，则把找出的最大的元素放到最后面，如果是降序排序，则把找出的最小的元素放到最后面。

因此一个完整冒泡排序需要两个循环，外层循环需要执行`n`次，用于确定排序后的数组的`n`个位置上的对应元素，内层循环用于找出本次循环的最小或最大的元素。

![](./images/bubble.png)

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

### 测试
通过统一编写一个测试函数来进行验证：

```ts
// utils/validate.ts

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
```

只需要传入具体的类的构造器即可。

## 选择排序
### 算法核心
选择排序算法和冒泡排序算法有些类似，都是基于*排序后的数组中的位置*的遍历，即第`i`次循环，是要找到在排好序后的数组中，位列第`i`个位置的元素，而不是去看当前元素在整个数组中排第几。
（就是相当于是看当前这张椅子是谁坐的，而不是看某个人要坐哪张椅子）

算法也是通过两次遍历，外层遍历是遍历当前排到了第几个位置，用变量`minIndex`来标记，然后在内层循环中去找到属于这个位置的元素，放到这个位置上。

排序都是从最小的位置开始排，对于**升序排序**，最小的位置就是第一个索引，`minIndex`只需要从第一个位置一直循环变到最后一个位置即可
对于**降序排序**，最小位置则是最后一个索引位置，`minIndex`只需要从最后一个位置循环变到第一个位置即可。

和冒泡排序类似，已经确定了位置的元素就不需要再参与后面的排序了，所以内层循环的开始位置`j`初始值都是`minIndex`，只是在升序排序中，是判断`j++ < length`，在降序排序中，判断`--j >=0`

![](./images/selection.png)

### 代码实现

```ts
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
  swap(source: T[], index1: number, index2: number) {
    [source[index1], source[index2]] = [source[index2], source[index1]]
  }
}

```