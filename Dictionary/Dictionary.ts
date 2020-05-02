export default class Dictionary<T>{
  private data: {
    [k:string]:T
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

  add(key: string, value: T) {
    this.data[key] = value;
  }

  find(key: string): T {
    return this.data[key];
  }

  remove(key: string) {
    delete this.data[key];
  }

  clear() {
    for (const k in this.data) {
      delete this.data[k];
    }
  }

  sort(type: 'key' | 'value' = 'key', compareFn: (a: string, b: string) => number = () => 1) {
    let target: T[] = [];
    for (const k in Object.keys(this.data).sort(compareFn)) target.push(this.data[k]);
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
