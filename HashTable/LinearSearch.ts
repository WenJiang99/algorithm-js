import HashSolver from './Hash';
import AbstractSolver from './AbstractHashTable';

interface ITableItem<K, V> {
  key: K,
  value: V
}
export default class LinearSearchHash<T> extends HashSolver implements AbstractSolver<T>{
  private table: ITableItem<string, T>[];
  private readonly KEY_NOT_EXISTS: number = -1;
  constructor() {
    super();
    this.table = new Array<ITableItem<string, T>>();
  }

  private find(hash: number, key: string): number {
    for (let i = hash; i < this.table.length; i++) {
      if (!this.table[i]) continue;
      if (this.table[i].key === key) return i;
    }
    return this.KEY_NOT_EXISTS;
  }

  put(key: string, value: T) {
    const hash = this.hash(key);
    let index = hash;
    while (this.table[index]) index++;
    this.table[index] = { key, value };
  }

  get(key: string): T {
    const hash = this.hash(key);
    let index = this.find(hash, key);
    if (index === this.KEY_NOT_EXISTS) return;
    return this.table[index].value;
  }

  remove(key: string): boolean {
    const hash = this.hash(key);
    const position = this.find(hash, key);
    if (position === this.KEY_NOT_EXISTS) return false;
    this.table[position] = undefined;
    return true;

  }

  has(key: string): boolean {
    const hash = this.hash(key);
    return this.find(hash, key) !== this.KEY_NOT_EXISTS;
  }

  length(): number {
    let total = 0;
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i]) total++;
    }
    return total;
  }

  showAll() {
    for (let i = 0; i < this.table.length; i++) {
      if (this.table[i]) {
        console.log(`${this.table[i].key} ==> ${this.table[i].value}`)
      }
    }
  }


}
