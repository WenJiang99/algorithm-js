
interface ISortCallback<T> {
  (data: T[]): T[];
}

export default class BaseSort<T>{
  swap(source: T[], index1: number, index2: number) {
    [source[index1], source[index2]] = [source[index2], source[index1]]
  }
}
