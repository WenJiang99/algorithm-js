class WeightGraph<T> {
  protected graph: number[][];
  protected readonly NO_PARENT: number = -1;
  constructor(weight = []) {
    this.graph = weight;
  }

  /**
   * 求解无向加权图的最小生成树的Prim算法
   */
  Prim() {
    // 存储最小生成树中每个节点的父节点
    const parent: number[] = [];
    // 存储每个节点从其父节点到这个节点的边的权重
    const weight: number[] = [];
    const visited: boolean[] = [];
    const length = this.graph.length;
    for (let i = 0; i < length; i++) {
      weight[i] = i === 0 ? 0 : Infinity;
      parent[i] = i === 0 ? this.NO_PARENT : null;
      visited[i] = false;
    }
    for (let i = 0; i < length; i++) {
      // 还未遍历过的邻接点的、到其父节点的边的权重最小的顶点
      const minWeightVertice = this.getMinWeightVertice(weight, visited)
      visited[minWeightVertice] = true;
      const adjacentWeightList = this.graph[minWeightVertice];
      for (let i = 0; i < adjacentWeightList.length; i++) {
        if (
          !visited[i] &&
          adjacentWeightList[i] !== 0 &&
          adjacentWeightList[i] < weight[i]
        ) {
          parent[i] = minWeightVertice;
          weight[i] = adjacentWeightList[i];
        }
      }
    }
    return {
      parent,
      weight,
    }
  }

  getMinWeightVertice(weight: number[], visited: boolean[]) {
    let minWeight = Infinity, minWeightIndex = -1;
    for (let i = 0; i < weight.length; i++) {
      if (!visited[i] && weight[i] <= minWeight) {
        minWeight = weight[i];
        minWeightIndex = i;
      }
    }
    return minWeightIndex;
  }

  /**
   * 求解加权无向连通图的最小生成树的贪心算法
   */
  Kruskal() {
    let edgeCount = 0;
    // 最小生成树中每个点的邻接点列表
    const adjacentList: number[][] = []
    const weight: number[][] = [];
    const length = this.graph.length;
    // deep clone
    for (let i = 0; i < length; i++) {
      weight[i] = [];
      adjacentList[i] = []
      for (let j = 0; j < length; j++) {
        weight[i][j] = this.graph[i][j];
      }
    }

    // n个点最终形成 n-1 条边
    while (edgeCount < length - 1) {
      let edgeStart, edgeEnd;
      for (let i = 0, min = Infinity; i < length; i++) {
        for (let j = 0; j < length; j++) {
          if (weight[i][j] < min && weight[i][j] !== 0) {
            min = weight[i][j];
            edgeStart = i;
            edgeEnd = j;
          }
        }
      }
      if (this.connect(edgeStart, edgeEnd, adjacentList)) {
        edgeCount++;
      }
      // 已经找出的最小权值的边的两个顶点不需要再找
      weight[edgeStart][edgeEnd] = weight[edgeEnd][edgeStart] = Infinity;
    }
    return adjacentList;
  }

  connect(start: number, end: number, adjacentList: number[][]) {
    if (start !== end) {
      adjacentList[start].push(end)
      adjacentList[end].push(start)
      return true;
    }
    return false;
  }
}

const weight = [
  [0, 2, 4, 0, 0, 0],
  [2, 0, 2, 4, 2, 0],
  [4, 2, 0, 0, 3, 0],
  [0, 4, 0, 0, 3, 2],
  [0, 2, 3, 3, 0, 2],
  [0, 0, 0, 2, 2, 0]
];

console.table(new WeightGraph(weight).Kruskal())
// console.log(new WeightGraph(weight).Prim())