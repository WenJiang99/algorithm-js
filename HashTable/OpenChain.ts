import AbstractSolver from "./AbstractHashTable";
import HashSolver from './Hash';

interface IChainItem<T> {
  key: string,
  value: T
}
export default class OpenChainHash<T> extends HashSolver implements AbstractSolver<T> {
  private table: IChainItem<T>[][];
  private readonly KEY_NOT_EXISTS: number = -1;
  constructor() {
    super();
    this.table = new Array();
  }

  private openChain(hash: number) {
    if (this.table[hash]) return;
    this.table[hash] = new Array<IChainItem<T>>();
  }

  private find(hash: number, key: string): number {
    if (!this.table[hash]) return this.KEY_NOT_EXISTS;
    for (let i = 0; i < this.table[hash].length; i++) {
      if (!this.table[hash][i]) continue;
      if (this.table[hash][i].key === key) {
        return i;
      }
    }
    return this.KEY_NOT_EXISTS;
  }

  put(key: string, value: T) {
    const hash = this.hash(key);
    this.openChain(hash);
    let index = 0;
    while (this.table[hash][index]) index++;
    this.table[hash][index] = { key, value };
  }

  get(key: string): T {
    const hash = this.hash(key);
    const index = this.find(hash, key);
    if (index === this.KEY_NOT_EXISTS) return;
    return this.table[hash][index].value;
  }

  remove(key: string): boolean {
    const hash = this.hash(key);
    const index = this.find(hash, key);
    if (index === this.KEY_NOT_EXISTS) return false;
    this.table[hash][index] = undefined;
    return true;
  }

  has(key: string): boolean {
    const hash = this.hash(key);
    return this.find(hash, key) !== this.KEY_NOT_EXISTS;
  }

  hasES6(key: string): boolean {
    const hash = this.hash(key);
    return this.table[hash].some(item => item.key === key);
  }

  length(): number {
    let total: number = 0;
    for (let i = 0; i < this.table.length; i++) {
      if (!this.table[i]) continue;
      for (let j = 0; j < this.table[i].length; j++) total++;
    }
    return total;
  }

  showAll() {
    for (let i = 0; i < this.table.length; i++) {
      if (!this.table[i]) continue;
      for (let j = 0; j < this.table[i].length; j++) {
        if (this.table[i][j]) console.log(`${this.table[i][j].key} ==> ${this.table[i][j].value}`)
      }
    }
  }

}
