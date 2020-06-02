import Queue from "../Queue/Queue";

interface ICallback<T> {
  (v: T): any
}

enum ITraverseType {
  WAITTING,
  FOUND,
  TRAVERSED
}

type INodeExtra = {
  type?: ITraverseType[keyof ITraverseType]
}


class Graph<T> {
  private verticeList: T[];
  private linkMap: Map<T, T[]>;
  constructor() {
    this.verticeList = [];
    this.linkMap = new Map();
  }
  addVertice(v: T) {
    this.verticeList.push(v);
    this.linkMap.set(v, []);
  }
  addEdge(src: T, dest: T) {
    // TODO: vertice not in verticeList
    this.linkMap.get(src).push(dest)
    this.linkMap.get(dest).push(src)
  }

  BFS(v: T, callback?: ICallback<T>) {
    const queue = new Queue<T>();
    const traverseMap = new Map<T, ITraverseType>();
    queue.enqueue(v);
    while (!queue.empty()) {
      const entry = queue.dequeue();
      const adjacentPoints = this.linkMap.get(entry);
      adjacentPoints.forEach(item => {
        const type = traverseMap.get(item);
        if (!type) { // 还没有压入队列中的顶点
          queue.enqueue(item)
          traverseMap.set(item, ITraverseType.FOUND)
        }
      })
      traverseMap.set(entry, ITraverseType.TRAVERSED)
      callback && callback(entry);
    }
  }
  toString() {
    let str = ''
    for (let i = 0; i < this.verticeList.length; i++) {
      const v = this.verticeList[i];
      str += (v + ' ==> ');
      this.linkMap.get(v).forEach(item => {
        str += (item + ' ');
      })
      str += '\n'
    }
    console.log(str)
  }
}

export default Graph;