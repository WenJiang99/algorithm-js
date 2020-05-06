import { IHash } from "./AbstractHash";

interface IOptions {
  flag?: number
}
export default class ASCIIHash implements IHash {
  private flag: number = 137;
  hash(key: string, options?: IOptions): number {
    const flag = options && options.flag;
    let hash: number = 0;
    for (let i = 0; i < key.length; i++)hash += key.charCodeAt(i);
    return hash % (flag || this.flag);
  }

}
