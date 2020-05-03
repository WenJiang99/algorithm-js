export default class Dictionary<T>{
  private data: {
    [k: string]: T
  };
  constructor() {
    this.data = {}
  }
  init(data: T[]) {

  }

  length(): number {
    let count = 0;
    for (const k in this.data) count++;
    return count;
  }

  has(key: string): boolean {
    return key in this.data;
  }

  set(key: string, value: T) {
    this.data[key] = value;
  }

  get(key: string): T {
    return this.data[key];
  }

  keys(): string[] {
    return Object.keys(this.data);
  }

  values(): T[] {
    let target: T[] = [];
    for (const k in this.data) target.push(this.data[k]);
    return target;

  }

  remove(key: string): boolean {
    if (this.has(key)) {
      delete this.data[key];
      return true;
    }
    return false;
  }

  clear() {
    for (const k in this.data) {
      delete this.data[k];
    }
  }

  // TODO: 通过`type`的值动态指定 `compareFn`中参数的数据类型
  sort(type: 'key' | 'value' = 'key', compareFn?: (a: string, b: string) => number) {
    let target: T[] = [];
    for (const k of Object.keys(this.data).sort(compareFn)) target.push(this.data[k]);
    return target;
  }

  join(indicator: string = `==>`, seperator: string = '\n') {
    let str = ''
    let first = true;
    for (const key in Object.keys(this.data)) {
      str += ((first ? '' : seperator) + `${key} ${indicator} ${this.data[key]}`)
      first = false;
    }
    return str;
  }

  showAll(indicator: string = '', seperator: string = '') {
    console.log(this.join(indicator, seperator))
  }

}
