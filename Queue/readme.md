---
title: 基数排序算法
date: 2020-04-18 22:20:00
author: wenjiang
summary: 排序算法之基数排序
tags:
- 算法
- 排序算法
- 数据结构

catagories:
- 数据结构
- 算法

---

## 算法思路

### 两次分发、两次归并

基数排序的算法主要在于 **两次分发** 和 **两次合并** 的过程。

在输入一堆的待排的数字时，先后经过 **两次** 的 **分发 -- > 合并** 的过程后，就可以得到排好序后的序列。

- 第一次分发：第一次分发是 **基于数字个位数值**的分发，把相同的个位数的数值分发到对应的一个队列中，即完成第一次分发，第一次分发的结果是把**一个数组**中的所有的数字按照个位相同的条件分发到了若干个的队列中。

可以看到，第一次分发之后，**十位数相同的数字，个位越小的排到了越前面**，因此第一次分发实际是 **让十位数相同的数中，个位小的排到前面去**

- 第一次合并：把第一次分发后的队列中是所有数字又一次**出队列**，存储到同一个数组中，完成第一次合并，得到合并后的一个数字序列（数组）


- 第二次分发：第二次分发是在第一次合并后，对第一次合并得到的数组再一次，按照 **十位数相同**的条件进行分发，分发到对应的队列

可以看到，第二次分发，**个位相同的数字，再按照十位数进行一次分发后，十位越大的数就到越后面了**

- 第二次合并：把第二次分发得到的所有队列，依次把队列中的元素移出队列，存储到同一个数组中，最后得到的数组就是排好序的序列。



## 算法实现

```js
const Queue = require('./Queue')
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
```