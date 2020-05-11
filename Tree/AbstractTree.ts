import { TreeNodeCallBack } from "./BinarySearch/interface";

export default abstract class AbstractTree<T> {
  abstract insert(data: T): void;
  abstract remove(data: T): boolean;
  abstract has(data: T): boolean;
  abstract preOrderTraverse(cb?: TreeNodeCallBack<T>): void;
  abstract postOrderTraverse(cb?: TreeNodeCallBack<T>): void;
  abstract inOrderTraverse(cb?: TreeNodeCallBack<T>): void;
}
