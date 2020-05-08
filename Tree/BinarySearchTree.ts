import AbstractSearchTree from "./AbstractSearchTree";
import BinaryTreeNode from "./BinaryTreeNode";
import { TreeNodeCallBack } from "./interface";

export default class BinarySearchTree<T> implements AbstractSearchTree<T>{
  root: BinaryTreeNode<T> = null;
  private readonly LEFT: number = -1;
  private readonly RIGHT: number = 1;
  private readonly NONE: number = 0;

  private getInsertPosition(target: BinaryTreeNode<T>, element: BinaryTreeNode<T>): number {
    if (!element || !target) return this.NONE;
    if (element.data < target.data) return this.LEFT;
    else if (element.data > target.data) return this.RIGHT;

  }

  private insertToLeft(target: BinaryTreeNode<T>, element: BinaryTreeNode<T>) {
    if (!target.left) {
      target.left = element;
    }
    else {
      return this.insertTo(target.left, element)
    }
  }

  private insertToRight(target: BinaryTreeNode<T>, element: BinaryTreeNode<T>) {
    if (!target.right) {
      target.right = element;
    }
    else {
      return this.insertTo(target.right, element)
    }
  }

  private insertTo(target: BinaryTreeNode<T>, element: BinaryTreeNode<T>): void {
    if (!target) target = element;
    else {
      if (this.getInsertPosition(target, element) === this.LEFT) return this.insertToLeft(target, element);
      else return this.insertToRight(target, element);
    }
  }

  /**
   * 中序递归遍历, 左节点 --> 父节点 --> 右节点
   * @param element 
   * @param cb 
   */
  private inOrderTraverseElement(element: BinaryTreeNode<T>, cb: TreeNodeCallBack<T>): void {
    if (element !== null && element !== undefined) {
      this.inOrderTraverseElement(element.left, cb);
      cb(element);
      this.inOrderTraverseElement(element.right, cb);
    }
  }

  /**
   * 前序遍历，父节点 --> 左节点 --> 右节点
   * @param element 
   * @param cb 
   */
  private preOrderTraverseElement(element: BinaryTreeNode<T>, cb: TreeNodeCallBack<T>): void {
    if (element !== null && element !== undefined) {
      cb(element);
      this.preOrderTraverseElement(element.left, cb);
      this.preOrderTraverseElement(element.right, cb);
    }
  }

  /**
   * 后序遍历，左节点 --> 右节点 --> 父节点
   * @param element 
   * @param cb 
   */
  private postOrderTraverseElement(element: BinaryTreeNode<T>, cb: TreeNodeCallBack<T>): void {
    if (element !== null && element !== undefined) {
      this.postOrderTraverseElement(element.left, cb);
      this.postOrderTraverseElement(element.right, cb);
      cb(element);
    }
  }

  insert(data: T): void {
    const e = new BinaryTreeNode(data);
    if (!this.root) this.root = e;
    else this.insertTo(this.root, e);
  }

  remove(data: T): boolean {
    throw new Error("Method not implemented.");
  }

  has(data: T): boolean {
    let _has = false;
    this.inOrderTraverse(item => {
      if (item.data === data) _has = true;
    })
    return _has;
  }

  search(data: T): BinaryTreeNode<T> {
    if (!this.root) return null;
    let current = this.root;
    while (current) {
      if (current.data === data) return current;
      else if (current.data < data) current = current.right;
      else current = current.left;
    }
    return null;
  }

  min(): T {
    if (!this.root) return null;
    let current = this.root;
    while (current.left) current = current.left;
    return current.data;
  }

  max(): T {
    if (!this.root) return null;
    let current = this.root;
    while (current.right) current = current.right;
    return current.data;
  }

  preOrderTraverse(cb?: TreeNodeCallBack<T>): void {
    cb = cb || (item => console.log(item && item.data));
    this.preOrderTraverseElement(this.root, cb);
  }

  postOrderTraverse(cb?: TreeNodeCallBack<T>): void {
    cb = cb || (item => console.log(item && item.data));
    this.postOrderTraverseElement(this.root, cb);
  }

  inOrderTraverse(cb?: TreeNodeCallBack<T>): void {
    cb = cb || (item => console.log(item && item.data));
    this.inOrderTraverseElement(this.root, cb);
  }
}
