export default class ListNode<T> {
  next: ListNode<T>
  data: T
  key: string;
  constructor(data: T,key = '') {
    this.data = data;
    this.key = key;
  }
}
