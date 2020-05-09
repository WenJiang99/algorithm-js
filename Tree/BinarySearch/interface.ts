import BinaryTreeNode from "./BinaryTreeNode";

export interface TreeNodeCallBack<T> {
  (element: BinaryTreeNode<T>): any;
}