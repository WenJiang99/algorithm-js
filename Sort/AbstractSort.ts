export interface ISortParam {
  key?: string,
  ascend?: boolean
}
export default abstract class AbstractSort<T> {
  abstract sort(param: ISortParam): T[];
}
