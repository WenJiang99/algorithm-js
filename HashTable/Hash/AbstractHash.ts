interface IBaseHash {
  flag?: number;
}
export abstract class IHash<T extends IBaseHash = IBaseHash> {
  abstract hash: (key: string, options?: T) => number;
}
