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

const log = console.log;
const data = mockArray({ length: 10 });
const bubble = new BubbleSort(data);
log(`raw data: `,data)
log(`sorted data: `,bubble.sort(false))