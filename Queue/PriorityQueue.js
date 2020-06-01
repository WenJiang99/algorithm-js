module.exports = class PriorityQueue {
  _lowestPriority = 1;
  _highestPriority = 10;
  _defaultPriority = this._lowestPriority;
  _data;
  constructor(initValue = []) {
    this._data = (Array.isArray(initValue) ? initValue : [initValue]).map(item => item && { data: item.data || item, priority: item.priority || this._defaultPriority });
  }
  enqueue(item, priority = this._lowestPriority) {
    priority = (priority - this._lowestPriority) * (priority - this._highestPriority) <= 0 ? priority : this._defaultPriority;
    this._data.push({ data: item, priority })
  }
  dequeue() {
    if (this._data.length === 0) return;
    let priority = this._data[0].priority;
    const i = this._data.reduce((target, item, index) => {
      return item && item.priority > priority ? index : target;
    }, 0)
    return this._data.splice(i, 1).pop().data
  }
  empty() {
    return this._data.length === 0;
  }
  toString(seperator) {
    let str = '';
    let i = 0;
    while (i < this._data.length) str += this._data[i++].data + (this._data.length - i === 0 ? '' : seperator);
    return str;
  }
}
