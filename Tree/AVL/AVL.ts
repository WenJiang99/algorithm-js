import AbstractAVL from './AbstractAVL';
import BinaryTreeNode from '../BinarySearch/BinaryTreeNode';
import { TreeNodeCallBack } from '../BinarySearch/interface';
import BinarySearchTree from '../BinarySearch/BinarySearchTree';

type IBalancePosition = 'left' | 'right';
export default class AVL<T> extends BinarySearchTree<T> implements AbstractAVL<T>{

  /**
   * 获取一棵树的高度
   * @param root 树（子树）的根节点，为`null`时返回 -1
   */
  private height(root: BinaryTreeNode<T>): number {
    if (!root) return -1;
    return Math.max(this.height(root.left), this.height(root.right)) + 1;
  }

  /**
   *  向左的单旋右子树。目标节点右子树高度比左子树高度高（超过1），高出部分在目标节点的右节点(R)的右子树(R)
   * @param target 要平衡的子树的根节点
   * @returns 返回平衡后的子树的根节点
   */
  private RR(target: BinaryTreeNode<T>): BinaryTreeNode<T> {
    const newRoot = target.right;
    target.right = newRoot.left;
    newRoot.left = target;
    return newRoot;
  }

  /**
   * 向右的单旋左子树。目标节点左子树高度比右子树高度高（超过1），且高出的部分在目标节点的左节点(L)的左侧子树(L)
   * @param target 要平衡的子树的根节点
   * @returns 返回平衡后的子树的根节点
   */
  private LL(target: BinaryTreeNode<T>): BinaryTreeNode<T> {
    const newRoot = target.left;
    target.left = newRoot.right;
    newRoot.right = target;
    return newRoot;
  }

  /**
   * 向右双旋目标节点的左子树。目标节点左子树高度高于右子树，且高出部分在目标节点左节点(L)的右子树(R)上
   * @param target 
   */
  private LR(target: BinaryTreeNode<T>): BinaryTreeNode<T> {
    target.left = this.RR(target.left);
    const e = this.LL(target);
    return e;
  }

  /**
   * 向左双旋目标节点的右子树。目标节点右子树高度高出左子树超过1，高出部分在目标节点右节点(R)的左子树(L)
   * @param target 
   */
  private RL(target: BinaryTreeNode<T>): BinaryTreeNode<T> {
    target.right = this.LL(target.right);
    const e = this.RR(target);
    return e;
  }

  /**
   * 平衡子树，如果需要平衡，说明新插入的节点插入到了目标节点的子节点而不是目标节点上
   * @param target 要平衡的节点
   */
  private balance(target: BinaryTreeNode<T>, element: BinaryTreeNode<T>, position?: IBalancePosition): BinaryTreeNode<T> {
    if (this.height(target.left) - this.height(target.right) > 1) {
      if (element.data < target.left.data) { //LL
        console.log('LL ==> \n', target)
        return this.LL(target)
      } else { // LR
        console.log('LR ==> \n', target)
        return this.LR(target)
      }
    } else if (this.height(target.right) - this.height(target.left) > 1) {
      if (element.data > target.right.data) { //RR
        console.log('RR ==> \n', target)
        return this.RR(target)
      } else { // RL
        console.log('RL ==> \n', target)
        return this.RL(target)
      }
    }
    return target;
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
          this.insertToTree(root.left, element);
        }
        root.left = this.balance(root.left, element)
      }
      else {
        if (!root.right) {
          root.right = element;
        } else {
          this.insertToTree(root.right, element)
        }
        root.right = this.balance(root.right, element)
      }
    }
    return root;
    // return this.balance(root, element);
  }

  /**
   * 插入一个键到树中
   * @param data 
   */
  insert(data: T): void {
    console.log(`================== ${data} =======================`)
    const e = new BinaryTreeNode(data);
    if (!this.root) this.root = e;
    else this.insertToTree(this.root, e);
    this.root = this.balance(this.root, e);

    console.log(`${data} ==> `, this.root)
  }


  search(data: T): BinaryTreeNode<T> {
    return super.search(data);
  }

  min(): T {
    return super.min();
  }

  max(): T {
    return super.max();
  }

  remove(data: T): boolean {
    return super.remove(data);
  }

  has(data: T): boolean {
    return super.has(data);
  }

  preOrderTraverse(cb?: TreeNodeCallBack<T>): void {
    return super.preOrderTraverse(cb);
  }

  postOrderTraverse(cb?: TreeNodeCallBack<T>): void {
    return super.postOrderTraverse(cb);
  }

  inOrderTraverse(cb?: TreeNodeCallBack<T>): void {
    super.inOrderTraverse(cb);
  }

}
