class Queue<T> {

  private data: T[];
  private len: number;
  constructor(initValue: T[] = []) {
    this.data = initValue;
    this.len = this.data.length;
  }
  // 元素入队
  enqueue(item: T) {
    this.data.push(item)
    this.len++;
  }
  // 元素出队
  dequeue(): T {
    this.len--;
    return this.data.shift()
  }
  // 队首元素
  front(): T {
    return this.data[0];
  }
  // 队尾元素
  back(): T {
    return this.data[this.data.length - 1]
  }
  empty(): boolean {
    return this.data.length === 0;
  }
  clear(): void {
    this.data = []
    this.len = 0;
  }
  // toString
  join(seperator: string = '') {
    let str = '';
    let i = 0;
    while (i < this.data.length) str += JSON.stringify(this.data[i++]) + (this.data.length === 1 ? '' : seperator);
    return str;
  }
}

export default Queue;
