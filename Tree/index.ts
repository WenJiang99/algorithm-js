import BinarySearchTree from "./BinarySearch/BinarySearchTree";
import AVL from './AVL/AVL'

const BaseTree = AVL;

const tree = new BaseTree<number>();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);


// console.log(tree.getRoot())
tree.inOrderTraverse()
tree.preOrderTraverse()
tree.postOrderTraverse()