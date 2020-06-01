interface INode<T> {
  data: T,
  priority: number
}

class PriorityQueue<T>{
  private readonly LOWEST_PRIORITY = 1;
  private readonly HIGHEST_PRIORITY = 10;
  private readonly DEFAULT_PRIORITY = this.LOWEST_PRIORITY;
  private data: INode<T>[];
  constructor(initValue: any[] = []) {
    this.data = (Array.isArray(initValue) ? initValue : [initValue]).map(item => item && { data: item.data || item, priority: item.priority || this.DEFAULT_PRIORITY });
  }
  enqueue(item: T, priority = this.LOWEST_PRIORITY) {
    priority = (priority - this.LOWEST_PRIORITY) * (priority - this.HIGHEST_PRIORITY) <= 0 ? priority : this.DEFAULT_PRIORITY;
    this.data.push({ data: item, priority })
  }
  dequeue(): T | undefined {
    if (this.data.length === 0) return;
    let priority = this.data[0].priority;
    const i = this.data.reduce((target, item, index) => {
      return item && item.priority > priority ? index : target;
    }, 0)
    return this.data.splice(i, 1).pop().data
  }
  empty(): boolean {
    return this.data.length === 0;
  }
  toString(seperator) {
    let str = '';
    let i = 0;
    while (i < this.data.length) str += this.data[i++].data + (this.data.length - i === 0 ? '' : seperator);
    return str;
  }
}

export default PriorityQueue;