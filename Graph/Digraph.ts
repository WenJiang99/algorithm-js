class Digraph<T> {
  protected graphMatrix: number[][];
  protected readonly NOT_ACCESSABLE: number = -1;
  constructor(matrix: number[][]) {
    this.graphMatrix = matrix;
  }

  Dijkstra(src: number) {
    const distancesToSrc = this.graphMatrix.map(_ => Infinity);
    const visited = this.graphMatrix.map(_ => false);
    const verticeCount = this.graphMatrix.length;
    distancesToSrc[src] = 0;
    for (let i = 0; i < verticeCount - 1; i++) {
      const min = this.getMinDistanceIndex(distancesToSrc, visited);
      visited[i] = true;
      const adjacentDistancesOfMin = this.graphMatrix[min];
      for (let v = 0; v < adjacentDistancesOfMin.length; v++) {
        const hasPath = adjacentDistancesOfMin[v] !== 0;
        const newPathDistance = distancesToSrc[min] + adjacentDistancesOfMin[v]
        const isShorterPath = newPathDistance < distancesToSrc[v];
        if (!visited[v] && hasPath && isShorterPath) {
          distancesToSrc[v] = newPathDistance;
        }
      }
    }
    return distancesToSrc;
  }

  getMinDistanceIndex(distances: number[], visited: boolean[]) {
    let minDistance = Infinity, minDistanceIndex = -1;
    for (let i = 0; i < distances.length; i++) {
      if (!visited[i] && distances[i] <= minDistance) {
        minDistance = distances[i];
        minDistanceIndex = i;
      }
    }
    return minDistanceIndex;
  }

  FloydWarshall() {
    const len = this.graphMatrix.length;
    const distance = [];
    const pathMatrix = []
    for (let i = 0; i < len; i++) {
      distance[i] = []
      pathMatrix[i] = []
      for (let j = 0; j < len; j++) {
        const path = []
        if (i === j) {
          distance[i][j] = 0;
        } else if (this.graphMatrix[i][j] === 0) {
          distance[i][j] = this.NOT_ACCESSABLE;
        } else {
          distance[i][j] = this.graphMatrix[i][j];
          path.push(i)
          path.push(j)
        }
        pathMatrix[i][j] = path;
      }
    }
    // 最外层的循环遍历的是节点
    for (let k = 0; k < len; k++) {
      // 里面两层循环遍历的是 distance 数组
      for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
          if (distance[i][k] !== this.NOT_ACCESSABLE && distance[k][j] !== this.NOT_ACCESSABLE) {
            if (
              distance[i][k] + distance[k][j] < distance[i][j] ||
              distance[i][j] === this.NOT_ACCESSABLE
            ) {
              distance[i][j] = distance[i][k] + distance[k][j]
              pathMatrix[i][j] = this.joinPath(pathMatrix[i][k], pathMatrix[k][j])
            }
          }

        }
      }
    }
    return {
      distance,
      path: pathMatrix.map(verticePath => verticePath.map(pointList => this.pointsToPathStr(pointList)))
    };
  }
  joinPath(...pathList) {
    return pathList.reduce((totalPath, current) => [...totalPath, ...current], [])
  }

  pointsToPathStr(points: number[]) {
    if (!points.length) return '';
    points = Array.from(new Set(points)) // 数组去重
    return points.reduce((str, point) => str ? `${str} -> ${point}` : `${point}`, '')
  }
}

const data = [
  [0, 2, 4, 0, 0, 0],
  [0, 0, 2, 4, 2, 0],
  [0, 0, 0, 0, 3, 0],
  [0, 0, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 2],
  [0, 0, 0, 0, 0, 0]
];
console.log(new Digraph(data).Dijkstra(0))
console.log(new Digraph(data).FloydWarshall().path)