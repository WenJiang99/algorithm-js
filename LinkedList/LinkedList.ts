import ListNode from "./ListNode";

const HEAD = Symbol('LinkedList#head');
// const HEAD = 'LinkedList#head'
export default class LinkedList<T> {
  private head: ListNode<any>;
  private end: ListNode<T>
  constructor() {
    this.head = new ListNode(HEAD);
    this.end = null;
  }

  /**
   * 在列表最末尾添加一个元素
   * @param item 要添加的新节点
   */
  append(item: T) {
    const e = new ListNode(item);
    if (!this.end) {
      this.head.next = e;
    } else {
      const end = this.end;
      end.next = e;
    }
    e.next = null;
    this.end = e;
  }

  /**
   * 链表头部插入一个新节点
   * @param item 新添加的节点
   */
  unshift(item: T) {
    const oldNext = this.head.next;
    const e = new ListNode(item);
    e.next = oldNext;
    this.head.next = e;
  }

  /**
   * 在目标节点前面插入新的节点
   * @param target 目标节点
   * @param item 要插入的新节点
   */
  insertBefore(target: T, item: T): boolean {
    const nodeBeforeTarget = this.findPrevNode(target);
    if (!nodeBeforeTarget) return false;
    const oldNext = nodeBeforeTarget.next;
    const newNode = new ListNode(item);
    newNode.next = oldNext;
    nodeBeforeTarget.next = newNode;
    return true;
  }

  /**
   * 在指定节点后面插入新节点
   * @param target 目标节点
   * @param item 新增节点
   */
  insertAfter(target: T, item: T): boolean {
    const targetNode = this.find(target);
    if (!targetNode) return false;
    const e = new ListNode(item);
    const oldNext = targetNode.next;
    e.next = oldNext;
    targetNode.next = e;
    if (targetNode === this.end) this.end = e;
    return true;
  }

  /**
   * 删除指定节点
   * @param item 
   */
  remove(item: T): boolean {
    if (this.empty()) return false;
    const nodeBeforeItem = this.findPrevNode(item);
    // 要删除的节点不存在
    if (!nodeBeforeItem) return false;
    // 删除的节点是链表最后一个节点
    if (!nodeBeforeItem.next.next) {
      nodeBeforeItem.next = null;
      this.end = nodeBeforeItem;
    } else {
      nodeBeforeItem.next = nodeBeforeItem.next.next;
    }
    return true;
  }

  /**
   * 查找指定节点
   * @param item 
   */
  find(item: T): ListNode<T> {
    let current = this.head;
    while (!!current.next) {
      if (current.data === item) return current;
      current = current.next;
    }
    return null as ListNode<T>;
  }

  /**
   * 查找指定节点的前驱结点
   * @param item 
   */
  findPrevNode(item: T): ListNode<T> {
    let current = this.head;
    while (!!current.next) {
      if (current.next.data === item) return current;
      current = current.next;
    }
    return null as ListNode<T>;
  }

  /**
   * 链表是否为空
   */
  empty(): boolean {
    return this.end == null;
  }

  getLast() {
    return this.end;
  }
  getFirst() {
    return this.head.next;
  }
  display() {
    let current = this.head.next;
    while (!!current) {
      console.log(current.data);
      current = current.next;
    }
  }

  *[Symbol.iterator]() {
    let current = this.head;
    while (!!current.next) {
      yield current.data;
      current = current.next;
    }
  }
}
