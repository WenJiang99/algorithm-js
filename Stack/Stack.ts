class Stack<T> {
  private data: T[];
  private top: number;
  constructor(initValue: T[] = []) {
    this.data = Array.isArray(initValue) ? initValue : Array.from(initValue);
    this.top = initValue.length;
  }
  push(item: T) {
    this.data[this.top++] = item;
  }
  pop(): T {
    return this.data[--this.top];
  }
  peek(): T {
    return this.data[this.top - 1];
  }
  length(): number {
    return this.top;
  }
  clear() {
    this.top = 0;
    this.data = [];
  }
  isEmpty(): boolean {
    return this.top === 0;
  }
  join(seperator): string {
    let str = ''
    while (this.top) {
      str += this.pop() + (this.top == 1 ? '' : seperator)
    }
    return str;
  }
}

export default Stack;
