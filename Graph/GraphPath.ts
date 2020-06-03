import Graph, { ITraverseType } from "./Graph";
import Queue from "../Queue/Queue";
import Stack from "../Stack/Stack";

class GraphPath<T> extends Graph<T> {
  /**
   * 广度优先遍历查找路径
   * @param v 广度优先遍历的入口顶点
   */
  BFS(v: T) {
    const queue = new Queue<T>();
    queue.enqueue(v);
    const distances = new Map<T, number>();
    const precursors = new Map<T, T>();
    const traverseMap = new Map<T, ITraverseType>();
    distances.set(v, 0)
    precursors.set(v, null);
    while (!queue.empty()) {
      const entry = queue.dequeue();
      this.linkMap.get(entry).forEach(item => {
        if (!traverseMap.get(item)) {
          queue.enqueue(item)
          traverseMap.set(item, ITraverseType.FOUND)
          precursors.set(item, entry);
          distances.set(item, (distances.get(entry) || 0) + 1)
        }
      })
      traverseMap.set(entry, ITraverseType.TRAVERSED);
    }
    return {
      distances,
      precursors
    }
  }

  /**
   * 查找从一个顶点到另外一个顶点的最短路径
   * @param src 起点
   * @param dest 终点
   */
  path(src: T, dest: T) {
    const { distances, precursors } = this.BFS(src);
    const stack = new Stack<T>();
    let v = dest;
    while (v !== src) {
      stack.push(v)
      v = precursors.get(v)
    }
    stack.push(v)
    let str = ''
    str += stack.pop();
    while (!stack.isEmpty()) {
      str += (' -> ' + stack.pop())
    }
    return str;
  }

  /**
   * DFS遍历，同时记录下从入口点`v`开始到每一个点`u`的发现的时间、完成遍历的时间和前驱节点
   */
  DFS() {
    const traverseMap = new Map<T, ITraverseType>();
    const discoverTime = new Map<T, number>();
    const finishTime = new Map<T, number>();
    const precursors = new Map<T, T>();
    let time = 0;
    for (let i = 0; i < this.verticeList.length; i++) {
      const v = this.verticeList[i];
      if (!traverseMap.get(v)) {
        // 记录下每个入口遍历完成的时间，算入到其他入口发现的时间中
        time = this.visit({ v, time, traverseMap, precursors, discoverTime, finishTime })
      }
    }
    return {
      discoverTime,
      finishTime,
      precursors
    }
  }

  /**
   * DFS递归遍历
   * @param param0 
   */
  visit(
    {
      v,
      traverseMap,
      discoverTime,
      finishTime,
      time,
      precursors
    }: {
      v: T,
      traverseMap: Map<T, ITraverseType>,
      discoverTime: Map<T, number>,
      finishTime: Map<T, number>,
      time: number,
      precursors: Map<T, T>
    }
  ) {
    traverseMap.set(v, ITraverseType.FOUND);
    discoverTime.set(v, ++time);
    this.linkMap.get(v).forEach(item => {
      if (!traverseMap.get(item)) {
        precursors.set(item, v);
        // 记录下遍历入口 `v`的每一个邻接点遍历消耗的时间，这个时间需要算到顶点`v`的遍历时间中
        time = this.visit({ v: item, traverseMap, discoverTime, finishTime, time, precursors })
      }
    })
    finishTime.set(v, ++time)
    return time;
  }
}

export default GraphPath;
