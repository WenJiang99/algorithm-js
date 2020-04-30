class ListNode<T> {
  data: T
  next: ListNode<T>
  constructor(data: T) {
    this.data = data;
  }
}

const HEAD = Symbol('CirclarLinkedList#HEAD');
export default class CirclarLinkedList<T> {
  private head: ListNode<any>
  private end: ListNode<T>
  public length: number;

  constructor() {
    this.head = new ListNode(HEAD);
    this.end = null;
    this.length = 0;
  }

  init(data: Iterable<T>) {

  }

  append(item: T) {
    const e = new ListNode(item);
    if (this.length === 0) {
      this.head.next = e;
    } else {
      const end = this.end;
      end.next = e;
    }
    e.next = this.head.next;
    this.end = e;
    this.length++;

  }

  unshift(item: T) {
    const oldNext = this.head.next;
    const e = new ListNode(item);
    e.next = oldNext;
    this.head.next = e;
    if (!this.end) {
      this.end = e;
    } else {
      this.end.next = e;
    }
    this.length++;

  }

  insertAfter(target: T, item: T): boolean {
    const targetNode = this.find(target);
    if (!targetNode) return false;
    const e = new ListNode(item);
    e.next = targetNode.next;
    targetNode.next = e;
    if (targetNode === this.end) {
      e.next = this.head.next;
      this.end = e;
    }
    this.length++;
    return true;

  }

  insertBefore(target: T, item: T): boolean {
    const nodeBeforeTarget = this.findPrevNode(target);
    if (!nodeBeforeTarget) return false;
    const e = new ListNode(item);
    e.next = nodeBeforeTarget.next;
    nodeBeforeTarget.next = e;
    this.length++;
  }

  remove(item: T): boolean {
    const nodeBeforeTarget = this.findPrevNode(item);
    if (!nodeBeforeTarget) return false;
    if (nodeBeforeTarget.next.next === this.head.next) {
      if (this.length === 1) {
        this.head.next = null;
        this.end = null;
      } else {
        nodeBeforeTarget.next = this.head.next;
        this.end = nodeBeforeTarget;
      }
    } else {
      nodeBeforeTarget.next = nodeBeforeTarget.next.next;
    }
    this.length--;
    return true;
  }

  find(item: T): ListNode<T> {
    let current = this.head.next;
    while (!!current) {
      if (current.data === item) return current;
      current = current.next;
      // 链表循环完毕，避免重复循环陷入死循环
      if (current === this.head.next) break;
    }
    return null;

  }

  findPrevNode(item: T): ListNode<T> {
    let current = this.head;
    while (current.next) {
      if (current.next.data === item) return current;
      current = current.next;
      if (current.next=== this.head.next) break;
    }
    return null;

  }

  getLast(): ListNode<T> {
    return this.end;
  }
  getFirst(): ListNode<T> {
    return this.head.next;
  }

  getHead(){
    return this.head;
  }
  empty(): boolean {
    return this.length === 0;
  }

}
