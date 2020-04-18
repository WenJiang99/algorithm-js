class Queue {

    _data;
    _len;
    constructor(initValue = []) {
        this._data = Array.isArray ? initValue : [initValue];
        this._len = this._data.length;
    }
    // 元素入队
    enqueue(item) {
        this._data.push(item)
        this._len++;
    }
    // 元素出队
    dequeue() {
        this._len--;
        return this._data.shift()
    }
    // 队首元素
    front() {
        return this._data[0];
    }
    // 队尾元素
    back() {
        return this._data[this._data.length - 1]
    }
    empty() {
        return this._data.length === 0;
    }
    clear() {
        this._data = []
        this._len = 0;
    }
    // toString
    join(seperator) {
        let str = '';
        let i = 0;
        while (i < this._data.length) str += JSON.stringify(this._data[i++]) + (this._data.length === 1 ? '' : seperator);
        return str;
    }
}
module.exports = Queue;