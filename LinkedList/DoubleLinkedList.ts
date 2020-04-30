class DoubleLinkedNode<T>{
  data: T;
  next: DoubleLinkedNode<T>;
  previous: DoubleLinkedNode<T>;
  key: string;
  constructor(data: T) {
    this.data = data;
  }
}
const HEAD = Symbol('DoubleLinkedList#HEAD');
export default class DoubleLinkedList<T>  {
  private head: DoubleLinkedNode<any>;
  private end: DoubleLinkedNode<T>;
  public length: number;
  constructor() {
    this.head = new DoubleLinkedNode(HEAD);
    this.end = null;
    this.length = 0;
  }

  /**
   * 在列表最末尾添加一个元素
   * @param item 要添加的新节点
   */
  append(item: T) {
    const e = new DoubleLinkedNode(item);
    if (this.empty()) {
      this.head.next = e;
      e.previous = this.head;
    } else {
      const end = this.end;
      end.next = e;
      e.previous = end;
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
    const e = new DoubleLinkedNode(item);
    e.next = oldNext;
    e.previous = this.head;
    oldNext.previous = e;
    this.head.next = e;
    this.length++;
  }

  /**
   * 在目标节点前面插入新的节点
   * @param target 目标节点
   * @param item 要插入的新节点
   */
  insertBefore(target: T, item: T): boolean {
    const targetNode = this.find(target);
    if (!targetNode) return false;
    const oldPrev = targetNode.previous;
    const e = new DoubleLinkedNode(item);
    e.next = targetNode;
    e.previous = oldPrev;
    oldPrev.next = e;
    targetNode.previous = e;
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
    const e = new DoubleLinkedNode(item);
    if (!targetNode.next) {
      targetNode.next = e;
      e.previous = targetNode;
      e.next = null;
      this.end = e;
    } else {
      const oldNext = targetNode.next;
      oldNext.previous = e;
      targetNode.next = e;
      e.previous = targetNode;
      e.next = oldNext;
    }
    this.length++;
    return true;
  }

  /**
   * 删除指定节点
   * @param item 
   */
  remove(item: T): boolean {
    const targetNode = this.find(item);
    if (!targetNode) return false;
    const prevNode = targetNode.previous;
    if (!targetNode.next) {
      prevNode.next = null;
      targetNode.previous = null;
      this.end = prevNode;
    } else {
      prevNode.next = targetNode.next;
      targetNode.next.previous = prevNode;
    }
    this.length--;
    return true;
  }

  /**
   * 查找指定节点
   * @param item 
   */
  find(item: T): DoubleLinkedNode<T> {
    let current = this.head;
    while (!!current) {
      if (current.data === item) return current;
      current = current.next;
    }
    return null as DoubleLinkedNode<T>;
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

  display() {
    let current = this.head.next;
    while (!!current) {
      console.log(current.data)
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
