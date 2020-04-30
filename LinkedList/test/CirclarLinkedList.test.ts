import 'mocha'
import { assert } from 'chai'
import CirclarLinkedList from '../CirclarLinkedList'

interface INode {
  text: string,
  value: string
}
describe('CirclarLinkedList', () => {
  const simpleDatas = ['item1', 'item2', 'item3']
  const objectDatas: INode[] = simpleDatas.map(item => ({ text: item, value: item }))

  describe('@empty', () => {
    const list = new CirclarLinkedList<string>()
    const objectList = new CirclarLinkedList<INode>()
    it('list is empty', () => {
      assert.equal(list.empty(), true)
      assert.equal(list.length, 0)
      assert.equal(objectList.length, 0)
      assert.equal(objectList.empty(), true)
    })
    it('list is not empty', () => {
      list.append('item')
      assert.equal(list.empty(), false)
      assert.equal(list.length, 1)
    })
    it('Object List not empty', () => {
      objectList.append(objectDatas[0])
      assert.equal(objectList.length, 1)
      assert.equal(list.empty(), false)
    })
  })
  describe('@append', () => {
    const list = new CirclarLinkedList<string>()
    const objList = new CirclarLinkedList<INode>()
    assert(!list.getLast())
    assert(!objList.getLast())

    for (let i = 0; i < simpleDatas.length; i++) {
      it(`simpleList: append ${i + 1} item`, () => {
        list.append(simpleDatas[i]);
        assert.equal(list.length, i + 1);
        assert.equal(list.empty(), false)
        assert.equal(list.getLast().data, simpleDatas[i]);
        assert.equal(list.getLast().next, list.getHead().next);
      })
      it(`objectList: append ${i + 1} item`, () => {
        objList.append(objectDatas[i]);
        assert.equal(objList.length, i + 1);
        assert.equal(objList.empty(), false)
        assert.equal(objList.getLast().data, objectDatas[i]);
      })
    }

  })
  describe('@find', () => {
    const list = new CirclarLinkedList<string>()
    const objList = new CirclarLinkedList<INode>()
    assert(!list.find('itemNotExists'))
    assert(!objList.find({ text: 'notExists', value: 'notExists' }))

    for (let i = 0; i < simpleDatas.length; i++) {
      it(`simpleList: append ${i + 1} item`, () => {
        list.append(simpleDatas[i]);
        assert.equal(list.length, i + 1);
        assert.equal(list.empty(), false)
        assert.equal(list.find(simpleDatas[i]), list.getLast());
      })
      it(`objectList: append ${i + 1} item`, () => {
        objList.append(objectDatas[i]);
        assert.equal(objList.length, i + 1);
        assert.equal(objList.empty(), false)
        assert.equal(objList.getLast(), objList.find(objectDatas[i]));
      })
    }
  })
  describe('@findPrevNode', () => {
    const list = new CirclarLinkedList<string>()
    const objList = new CirclarLinkedList<INode>()
    assert(!list.find('itemNotExists'))
    assert(!objList.find({ text: 'notExists', value: 'notExists' }))

    for (let i = 0; i < simpleDatas.length; i++) {
      it(`simpleList: append ${i + 1} item`, () => {
        list.append(simpleDatas[i]);
        assert.equal(list.length, i + 1);
        assert.equal(list.empty(), false)
        assert.equal(list.findPrevNode(simpleDatas[i]).next.data, simpleDatas[i]);
      })
      it(`objectList: append ${i + 1} item`, () => {
        objList.append(objectDatas[i]);
        assert.equal(objList.length, i + 1);
        assert.equal(objList.empty(), false)
        assert.equal(objList.findPrevNode(objectDatas[i]).next.data, objectDatas[i]);
      })
    }
  })
  describe('@unshift', () => {
    const list = new CirclarLinkedList<string>()
    assert(!list.getFirst())
    const objList = new CirclarLinkedList<INode>()
    assert(!objList.getFirst())
    for (let i = 0; i < simpleDatas.length; i++) {
      it(`simpleList: unshift ${i + 1} item`, () => {
        list.unshift(simpleDatas[i]);
        assert.equal(list.length, i + 1);
        assert.equal(list.empty(), false)
        assert.equal(list.getFirst().data, simpleDatas[i]);
      })
      it(`objectList: unshift ${i + 1} item`, () => {
        objList.unshift(objectDatas[i]);
        assert.equal(objList.length, i + 1);
        assert.equal(objList.empty(), false)
        assert.equal(objList.getFirst().data, objectDatas[i]);
      })
    }
  })

  describe('@insertAfter', () => {
    const list = new CirclarLinkedList<string>()
    const target1 = 'target1'
    const target2 = 'target2'
    list.append(target1);
    list.append(target2);
    const objList = new CirclarLinkedList<INode>()
    const objTarget1 = { text: 'target1', value: 'target1' }
    const objTarget2 = { text: 'target2', value: 'target2' }
    objList.append(objTarget1);
    objList.append(objTarget2);
    for (let i = 0; i < simpleDatas.length; i++) {
      it(`insertAfter target1 for ${i + 1}th item`, () => {
        list.insertAfter(target1, simpleDatas[i]);
        assert.equal(list.find(target1).next.data, simpleDatas[i])
      })
      it(`insertAfter target1 for ${i + 1}th item`, () => {
        objList.insertAfter(objTarget1, objectDatas[i]);
        assert.equal(objList.find(objTarget1).next.data, objectDatas[i])
      })
    }
  })

  describe('@insertBefore', () => {
    const list = new CirclarLinkedList<string>()
    const target1 = 'target1'
    const target2 = 'target2'
    list.append(target1);
    list.append(target2);
    const objList = new CirclarLinkedList<INode>()
    const objTarget1 = { text: 'target1', value: 'target1' }
    const objTarget2 = { text: 'target2', value: 'target2' }
    objList.append(objTarget1);
    objList.append(objTarget2);
    for (let i = 0; i < simpleDatas.length; i++) {
      it(`insertBefore target1 for ${i + 1}th item`, () => {
        list.insertBefore(target2, simpleDatas[i]);
        assert.equal(list.find(simpleDatas[i]).next.data, target2)
      })
      it(`insertAfter target1 for ${i + 1}th item`, () => {
        objList.insertBefore(objTarget2, objectDatas[i]);
        assert.equal(objList.find(objectDatas[i]).next.data, objTarget2)
      })
    }
  })

  describe('@remove', () => {
    const list = new CirclarLinkedList<string>()
    const objList = new CirclarLinkedList<INode>()
    assert.equal(list.remove('notExist'), false)
    assert.equal(objList.remove({ text: 'notExist', value: 'notExist' }), false)
    for (let i = 0; i < simpleDatas.length; i++) {
      it(`insertBefore target1 for ${i + 1}th item`, () => {
        list.append(simpleDatas[i]);
        assert.equal(list.remove(simpleDatas[i]), true)
        assert.equal(list.remove(simpleDatas[i]), false)
        assert(!list.find(simpleDatas[i]))
      })
      it(`insertAfter target1 for ${i + 1}th item`, () => {
        objList.append(objectDatas[i]);
        assert.equal(objList.remove(objectDatas[i]), true)
        assert.equal(objList.remove(objectDatas[i]), false)
        assert(!objList.find(objectDatas[i]))
      })
    }
  })
})