class Digraph<T> {
  protected graphMatrix: number[][];
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