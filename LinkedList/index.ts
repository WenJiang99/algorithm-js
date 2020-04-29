import LinkedList from "./LinkedList";

const list = new LinkedList<string>();
const datas = ['item1', '2', '3']
for (let item of datas) {
    list.append(item);
}
list.remove('item1')
list.insertAfter('2','4')
list.insertBefore('2','5')
list.display()