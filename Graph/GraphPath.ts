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
}

export default GraphPath;
