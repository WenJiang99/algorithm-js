
import AbstractSort, { ISortParam } from "./AbstractSort";
import BaseSort from "./BaseSort";
import { deepClone } from "./utils/copy";
import { getValue } from "./utils/key";
import { test } from "./utils/validate";

class HeapSort<T> extends BaseSort<T> implements AbstractSort<T> {
  protected data: T[]
  constructor(data: T[]) {
    super();
    this.data = data;
  }
  sort({ key, ascend }: ISortParam): T[] {
    const data = deepClone(this.data)
    let heapSize = data.length;
    this.buildHeap(data, { key })

    while (heapSize > 1) {
      heapSize--;
      this.swap(data, 0, heapSize)
      this.heapify(data, heapSize, 0, { key })
    }
    return ascend ? data : data.reverse();
  }

  buildHeap(data: T[], param: ISortParam) {
    for (let i = Math.floor(data.length / 2) - 1; i >= 0; i--) {
      this.heapify(data, data.length, i, param)
    }
  }

  heapify(data: T[], heapSize: number, root: number, { key }: ISortParam) {
    let largest = root;
    const leftChild = 2 * root + 1;
    const rightChild = 2 * root + 2;
    const [vLeft, vRight] = [getValue(data[leftChild], key), getValue(data[rightChild], key)]
    if (vLeft !== undefined && leftChild < heapSize && vLeft > getValue(data[largest], key)) {
      largest = leftChild;
    }
    if (vRight !== undefined && rightChild < heapSize && vRight > getValue(data[largest], key)) {
      largest = rightChild;
    }
    if (largest !== root) {
      this.swap(data, largest, root)
      // 根节点和子节点发生了交换的话，交换的子节点需要重新修正成一个堆
      this.heapify(data, heapSize, largest, { key })
    }
  }

}

test(HeapSort, { size: 100, isInt: true, max: 10000, ascend: false })