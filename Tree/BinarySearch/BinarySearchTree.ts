import AbstractSearchTree from "../AbstractSearchTree";
import BinaryTreeNode from "./BinaryTreeNode";
import { TreeNodeCallBack } from "./interface";

export default class BinarySearchTree<T> implements AbstractSearchTree<T>{
  protected root: BinaryTreeNode<T> = null as any;
  protected readonly LEFT: number = -1;
  protected readonly RIGHT: number = 1;
  protected readonly NONE: number = 0;

  /**
   * 获取到一个新节点插入到一个目标节点的左节点还是右节点
   * @param target 目标节点
   * @param element 要插入的节点
   */
  protected getInsertPosition(target: BinaryTreeNode<T>, element: BinaryTreeNode<T>): number {
    if (!element || !target) return this.NONE;
    if (element.data < target.data) return this.LEFT;
    return this.RIGHT;

  }

  /**
   * 插入一个节点到一棵树上
   * @param root 树的根节点
   * @param element 要插入的节点
   */
  protected insertToTree(root: BinaryTreeNode<T>, element: BinaryTreeNode<T>): BinaryTreeNode<T> {
    // 树是空的
    if (!root) root = element;
    else {
      if (this.getInsertPosition(root, element) === this.LEFT) {
        if (!root.left) {
          root.left = element;
        } else {
          root.left = this.insertToTree(root.left, element);
        }
      }
      else {
        if (!root.right) {
          root.right = element;
        } else {
          root.right = this.insertToTree(root.right, element)
        }
      }
    }
    return root;
  }

  /**
   * 获取一棵树的最小的节点
   * @param root 树的根节点
   */
  private getMinimumOfTree(root: BinaryTreeNode<T>): BinaryTreeNode<T> | null {
    if (!root) return null;
    let current = root;
    while (current.left) current = current.left;
    return current;
  }

  /**
   * 获取一棵树的最大的节点
   * @param root 
   */
  private getMaximumOfTree(root: BinaryTreeNode<T>): BinaryTreeNode<T> | null {
    if (!root) return null;
    let current = root;
    while (current.right) current = current.right;
    return current;
  }

  private getParent(entry: BinaryTreeNode<T>, elemnt: BinaryTreeNode<T>): BinaryTreeNode<T> | null {
    if (!entry || !elemnt || elemnt === entry) return null;
    let current = entry;
    while (current) {
      if (current.left === elemnt || current.right === elemnt) return current;
      if (current.data < elemnt.data) current = current.right;
      else current = current.left;
    }
    return null;
  }

  /**
   * 中序递归遍历, 左节点 --> 父节点 --> 右节点
   * @param element 
   * @param cb 
   */
  private inOrderTraverseElement(element: BinaryTreeNode<T>, cb: TreeNodeCallBack<T>): void {
    if (element !== null && element !== undefined) {
      this.inOrderTraverseElement(element.left, cb);
      cb && cb(element);
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
      cb && cb(element);
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
      cb && cb(element);
    }
  }

  /**
   * 获取某个节点的直接子节点的个数
   * @param element 
   */
  private childCountOfElement(element: BinaryTreeNode<T>): number {
    if (!element || (!element.left && !element.right)) return 0;
    else if (element.left && element.right) return 2;
    return 1;
  }


  /**
   * 删除一个叶子节点
   * @param parent 要删除的节点的父节点
   * @param leaf 要删除的叶子节点
   */
  private removeLeaf(parent: BinaryTreeNode<T>, leaf: BinaryTreeNode<T>) {
    if (!leaf) return;
    // 要删除的叶子节点是树的根节点
    if (!parent) {
      this.root = null as any;
      return;
    }
    if (parent.left === leaf) {
      parent.left = null as any;
    } else if (parent.right === leaf) {
      parent.right = null as any;
    }
  }

  /**
   * 删除一个带有一个子节点的节点
   * @param parent 要删除的节点的父节点
   * @param element 要删除的节点
   */
  private removeElementWithOneChild(parent: BinaryTreeNode<T>, element: BinaryTreeNode<T>) {
    if (!element) return;
    // 要删除的叶子节点是树的根节点
    if (!parent) {
      this.root = null as any;
      return;
    }
    const child = element.left || element.right;
    if (parent.left === element) {
      parent.left = child;
    } else if (parent.right === element) {
      parent.right = child;
    }
  }

  /**
   * 删除一个带有左右两个子节点的节点
   * @param parent 要删除的节点的父节点
   * @param element 要删除的节点
   */
  private removeElementWithTwoChildren(parent: BinaryTreeNode<T>, element: BinaryTreeNode<T>) {
    if (!element) return;
    // 找到要删除的节点的右子树中的最小值补到删除的节点位置上
    const newElement = this.getMinimumOfTree(element.right);

    // 删除的节点是树的根节点
    if (!parent) {
      this.root = newElement;
    }
    else {
      parent.right = newElement;
    }
    // 右子树上最小值被提到了要删除的节点element的位置，原本位置上的最小值删掉
    this.removeElement(element, newElement.data);
    newElement.left = element.left;
    newElement.right = element.right;
    element.left = null;
    element.right = null;
  }

  /**
   * 在一棵树中删除一个节点
   * @param root 树的根节点，可以是子树
   * @param target 要删除的节点的键值
   */
  private removeElement(root: BinaryTreeNode<T>, target: T) {
    if (!root) return;
    let current = root;
    let parent = null;
    while (current) {
      if (current.data < target) {
        parent = current;
        current = current.right
      }
      else if (current.data > target) {
        parent = current;
        current = current.left
      }
      else {
        switch (this.childCountOfElement(current)) {
          case 0: return this.removeLeaf(parent, current);
          case 1: return this.removeElementWithOneChild(parent, current);
          case 2: return this.removeElementWithTwoChildren(parent, current);
        }
      }
    }
  }

  /**
   * 插入一个键到树中
   * @param data 
   */
  insert(data: T): void {
    const e = new BinaryTreeNode(data);
    if (!this.root) this.root = e;
    else this.insertToTree(this.root, e);
  }

  /**
   * 在树中删除一个指定的节点(键值)
   * @param data 
   */
  remove(data: T): boolean {
    this.removeElement(this.root, data);
    return true;
  }

  /**
   * 判断一棵树上是否包含有某个指定节点（键值）
   * @param data 
   */
  has(data: T): boolean {
    let _has = false;
    this.inOrderTraverse(item => {
      if (item.data === data) _has = true;
    })
    return _has;
  }

  /**
   * 在树上查找某个键值所在的节点
   * @param data 
   */
  search(data: T): BinaryTreeNode<T> | null {
    if (!this.root) return null;
    let current = this.root;
    while (current) {
      if (current.data === data) return current;
      else if (current.data < data) current = current.right;
      else current = current.left;
    }
    return null;
  }

  /**
   * 树的最小键值节点
   */
  min(): T {
    return this.getMinimumOfTree(this.root).data;
  }

  /**
   * 最大键值节点
   */
  max(): T {
    return this.getMaximumOfTree(this.root).data;
  }

  /**
   * 前序遍历
   * @param cb 遍历每个节点执行的回调函数
   */
  preOrderTraverse(cb?: TreeNodeCallBack<T>): void {
    cb = cb || (item => console.log(item && item.data));
    this.preOrderTraverseElement(this.root, cb);
  }

  /**
   * 后序遍历
   * @param cb 遍历每个节点执行的回调函数
   */
  postOrderTraverse(cb?: TreeNodeCallBack<T>): void {
    cb = cb || (item => console.log(item && item.data));
    this.postOrderTraverseElement(this.root, cb);
  }

  /**
   * 中序遍历
   * @param cb 遍历每个节点执行的回调函数
   */
  inOrderTraverse(cb?: TreeNodeCallBack<T>): void {
    cb = cb || (item => console.log(item && item.data));
    this.inOrderTraverseElement(this.root, cb);
  }

  getRoot(): BinaryTreeNode<T> | null {
    return this.root;
  }
}
