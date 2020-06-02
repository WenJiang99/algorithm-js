# 图

## 表示方法

### 邻接矩阵

用一个 **二维数组**来表示一个图，数组中为 1 的位置`a[i][j]`表示对应的两个点`i 、 j`是连通的

![](./images/indicate-matrix.png)

### 邻接表

用一个字典来表示图中的一个顶点的所有的相邻顶点列表

![](./images/indicate-table.png)

### 关联矩阵

// 

## 遍历

### BFS（广度优先遍历）

- 从给定的入口 `v` 开始，把入口 `v`压入到队列中。
- 在队列中弹出一个顶点（遍历这个顶点），同时把这个顶点的所有邻接点压入到队列中
- 重复在队列中弹出顶点进行顶点遍历，以及把顶点的邻接点压入到队列中，直到队列为空。
- 已经压入到队列、或者是已经遍历过的邻接点，不再压入到队列，因此需要对遍历状态进行标记（未访问、已入队、已遍历）


```ts
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
}

export default Graph;
```


