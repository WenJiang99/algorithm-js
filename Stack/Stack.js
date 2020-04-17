class Stack {
  _data;
  constructor(initValue = []) {
    this._data = Array.isArray(initValue) ? initValue : Array.from(initValue);
    this.top = initValue.length;
  }
  push(item) {
    this._data[this.top++] = item;
  }
  pop() {
    return this._data[--this.top];
  }
  peek() {
    return this._data[this.top - 1];
  }
  length() {
    return this.top;
  }
  clear() {
    this.top = 0;
    this._data = [];
  }
  isEmpty() {
    return this.top === 0;
  }
  join(seperator) {
    let str = ''
    while (this.top) {
      str += this.pop() + (this.top == 1 ? '' : seperator)
    }
    return str;
  }
}

module.exports = Stack;