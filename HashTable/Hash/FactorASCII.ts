import { IHash } from "./AbstractHash";

interface IOptions {
  flag?: number,
  factor?: number
}
export class FactorASCIIHash implements IHash<IOptions> {
  private ASCII_FACTOR: number = 37;
  private flag: number = 137;
  hash(key: string, options?: IOptions): number {
    const flag = options && options.flag;
    const factor = options && options.factor;
    let hash: number = 0;
    for (let i = 0; i < key.length; i++)hash += (hash * (factor || this.ASCII_FACTOR) + key.charCodeAt(i));
    hash = hash % (flag || this.flag);
    return ~~hash;
  }
}
