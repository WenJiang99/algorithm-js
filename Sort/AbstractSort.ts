export default abstract class AbstractSort<T> {
  abstract sort(
    param: {
      key?: string,
      ascend?: boolean
    }
  ): T[];
}
