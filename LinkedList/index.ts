import LinkedList from "./LinkedList";
import DoubleLinkedList from "./DoubleLinkedList";

interface INode {
    text: string
}
const list = new LinkedList<INode>();
const doubleList = new DoubleLinkedList<INode>()

const datas = [
    { text: 'item1' },
    { text: '2' },
    { text: '3' }
]
for (let item of datas) {
    list.append(item);
    doubleList.append(item);

}

for (let i of list) {
    console.log(i)
}

list.remove(datas[2])
list.insertAfter(datas[1], { text: '4' })
list.insertBefore(datas[1], { text: '5' })
// list.display()

const targetNode: INode = { text: '4' }
const testNode1: INode = { text: '5' }
const testNode2: INode = { text: '6' }
doubleList.unshift(targetNode)
doubleList.insertAfter(targetNode, testNode1)
doubleList.insertBefore(targetNode, testNode2)
// doubleList.remove(datas[1])
// doubleList.remove(datas[2])
// doubleList.remove(testNode2)
doubleList.display()