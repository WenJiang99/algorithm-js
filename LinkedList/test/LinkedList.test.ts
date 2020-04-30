import LinkedList from '../LinkedList';
import { assert } from 'chai';
import 'mocha'

describe('LinkedList', () => {
  describe('Simple Data', () => {
    describe('@empty', () => {
      const list = new LinkedList<string>();
      it('empty list', () => assert.equal(list.empty(), true))
      it('haved appended a node', () => {
        list.append('firt node');
        assert.equal(list.empty(), false);
      })
    })
    describe('@append', () => {
      const list = new LinkedList<string>()
      it('append one item', () => {
        const e = 'item-1';
        list.append(e);
        assert.equal(list.getLast().data, e)
      })
      it('append many', () => {
        const datas = ['item1', 'item2', 'item3'];
        list.append(datas[0])
        assert.equal(list.getLast().data, datas[0])
        list.append(datas[1])
        assert.equal(list.getLast().data, datas[1])
        list.append(datas[2])
        assert.equal(list.getLast().data, datas[2])
      })
    })
    describe('@unshift', () => {
      const list = new LinkedList<string>()
      it('unshift', () => {
        const datas = ['item1', 'item2', 'item3'];
        list.unshift(datas[0])
        assert.equal(list.getFirst().data, datas[0])
        list.unshift(datas[1])
        assert.equal(list.getFirst().data, datas[1])
        list.unshift(datas[2])
        assert.equal(list.getFirst().data, datas[2])

      })
    })
    describe('@insertBefore',()=>{
      
    })

  })
})