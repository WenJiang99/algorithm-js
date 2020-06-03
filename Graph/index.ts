import Graph from "./Graph";
import GraphPath from "./GraphPath";

var graph = new GraphPath();
var myVertices = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']; //{7}
for (var i = 0; i < myVertices.length; i++) { //{8}
    graph.addVertice(myVertices[i]);
}
graph.addEdge('A', 'B'); //{9}
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
graph.addEdge('J', 'K');

// graph.BFS('A', (v) => console.log(v))
// console.log(graph.BFS('A'))

// console.log(graph.path('E', 'A'))

console.log(graph.DFS())
