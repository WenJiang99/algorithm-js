import AbstractTree from "./AbstractTree";
import BinaryTreeNode from "./BinaryTreeNode";

export default abstract class AbstractSearchTree<T> extends AbstractTree<T>{
  abstract search(data: T): BinaryTreeNode<T> | null;
  abstract min(): T;
  abstract max(): T;
}
