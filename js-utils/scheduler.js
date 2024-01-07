class PQueue {
  enqueue(item, priority) {

  }
  dequeue() {

  }
  get() {

  }
  has() {

  }
  size() {

  }
}
class Scheduler {
  constructor(concurrentLimit) {
    this.limit = concurrentLimit;
    this.workingCount = 0;
    this.taskQueue = new PQueue();
    this.tasksMap = new Map();
  }
  reachConcurrentLimit() {
    return this.workingCount < this.limit;
  }
  _beforeTask() {
    this.workingCount++;
  }
  _afterTask() {
    this.workingCount--;
    this._runNextTask();
  }
  _runNextTask() {
    if (this.taskQueue.size() === 0) return false;
    if (this.reachConcurrentLimit()) return false;
    const task = this.taskQueue.dequeue();
    if (!task) return false;
    task();
    return true;
  }
  scheduleTask({ task, priority, key, args }) {
    if (typeof task !== 'function') throw new TypeError('task not a function');
    if (this.tasksMap.has(key)) return this.taskQueue.get(key);
    const promise = new Promise((resolve, reject) => {
      const run = () => {
        this._beforeTask();
        try {
          const res = await task(args);
          resolve(res);
        } catch (error) {
          reject(error);
        } finally {
          this._afterTask();
        }
      }
      this.taskQueue.enqueue(run, priority);
    });
    this.tasksMap.set(key, promise);
    return promise;
  }
  start() {
    while (this._runNextTask()) { }
  }
}
