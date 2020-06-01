const HEAD = Symbol('LinkedList#head');
// const HEAD = 'LinkedList#head'
class ListNode<T> {
  next: ListNode<T>
  data: T
  key: string;
  constructor(data: T, key = '') {
    this.data = data;
    this.key = key;
  }
}

export default class LinkedList<T> {
  private head: ListNode<any>;
  private end: ListNode<T>
  public length: number;
  constructor() {
    this.head = new ListNode(HEAD);
    this.end = null;
    this.length = 0;
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
    this.length++;
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
    this.length++;
  }

  /**
   * 在目标节点前面插入新的节点
   * @param target 目标节点
   * @param item 要插入的新节点
   */
  insertBefore(target: T, item: T): boolean {
    const nodeBeforeTarget = this.findPrevNode(target);
    if (!nodeBeforeTarget) return false;
    const newNode = new ListNode(item);
    newNode.next = nodeBeforeTarget.next;
    nodeBeforeTarget.next = newNode;
    this.length++;
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
    e.next = targetNode.next;
    targetNode.next = e;
    this.length++;
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
    // 要删除的节点不存在或是head节点
    if (!nodeBeforeItem) return false;
    // 删除的节点是链表最后一个节点
    if (!nodeBeforeItem.next.next) {
      nodeBeforeItem.next = null;
      this.end = nodeBeforeItem;
    } else {
      nodeBeforeItem.next = nodeBeforeItem.next.next;
    }
    this.length--;
    return true;
  }

  /**
   * 查找指定节点
   * @param item 
   */
  find(item: T): ListNode<T> {
    let current = this.head.next;
    while (!!current) {
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
    // 这个地方从 head 开始循环，否则链表第一个节点就没有前驱节点
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
    return this.length === 0;
  }

  getLast() {
    return this.end;
  }

  getFirst() {
    return this.head.next;
  }

  getHead() {
    return this.head;
  }

  display() {
    let current = this.head.next;
    while (!!current) {
      console.log(current.data);
      current = current.next;
    }
  }

  [Symbol.iterator]() {
    let current = this.head.next;
    let seed = 1;
    const iterator = {
      next
    };
    function next() {
      console.log(`next ==> `, seed++)
      let old = current;
      if (!old) {
        return {
          value: undefined,
          done: true
        }
      }
      current = old.next;
      return {
        value: old.data,
        done: false
      }
    }

    return iterator;
  }

}
