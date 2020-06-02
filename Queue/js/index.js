const RadixSorter = require('./RadixSorter.js')

const data = new Array(10).fill(0).map(_ => Math.floor(Math.random() * 100));
console.log(new RadixSorter(data).render())

const PriorityQueue = require('../PriorityQueue')

const queue = new PriorityQueue()
queue.enqueue('Davis', 8)
queue.enqueue('Rando', 5)
queue.enqueue('James', 10);
queue.enqueue('Kuzma', 6)
console.log(queue.toString('--'))
console.log(queue.dequeue())
console.log(queue.toString('--'))