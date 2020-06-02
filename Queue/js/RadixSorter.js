const Queue = require('../Queue.js')
module.exports = class RadixSorter {
    _data;
    _queues;
    constructor(initValue) {
        this._data = Array.isArray(initValue) ? initValue : Array.from(initValue);
        this._queues = new Array(10).fill(-1).map(_ => new Queue())
    }
    // 把data中的所有数字按照radix （1/10)分发到指定的队列中
    distribute(data, queues, radix) {
        if (radix === 1) data.forEach(item => queues[item % 10].enqueue(item));
        else data.forEach(item => queues[Math.floor(item / 10)].enqueue(item))
    }
    // 把queues中的所有的队列中的数字统一归集到数组data中
    collect(queues, data) {
        let i = 0;
        queues.forEach((queue, index) => {
            while (!queue.empty()) data[i++] = queue.dequeue();
        })
    }
    render() {
        console.log(this._data)
        // 按照个位分发
        this.distribute(this._data, this._queues, 1)
        // 把分发后的数字在合并成一个数组
        this.collect(this._queues, this._data)
        // 再按照十位分发
        this.distribute(this._data, this._queues, 10)
        this.collect(this._queues, this._data)
        return [...this._data]
    }
}
