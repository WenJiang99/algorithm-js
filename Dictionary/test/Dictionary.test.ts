import 'mocha';
import { assert } from 'chai';
import Dictionary from '../Dictionary';

interface INode {
  text: string,
  value: string
}
const prefix = 'DICTIONARY__KEY__PREFIX__'
describe('Dictionary', () => {
  const simpleData: string[] = ['item1', 'item2', 'item3'];
  const objData: INode[] = simpleData.map(item => ({ text: item, value: item }));

  describe('@add', () => {
    const simpleDict = new Dictionary<string>()
    const objDict = new Dictionary<INode>()
    for (let i = 0; i < simpleData.length; i++) {
      const key = prefix + i;
      it(`simple: add ${i + 1} item`, () => {
        simpleDict.add(key, simpleData[i])
        assert.equal(simpleDict.length(), i + 1)
      })
      it(`object: add ${i + 1} item`, () => {
        objDict.add(key, objData[i])
        assert.equal(objDict.length(), i + 1)
      })
    }
  })

  describe('@find', () => {
    const simpleDict = new Dictionary<string>()
    const objDict = new Dictionary<INode>()
    for (let i = 0; i < simpleData.length; i++) {
      const key = prefix + i;
      it(`simple: add ${i + 1} item`, () => {
        simpleDict.add(key, simpleData[i])
        assert.equal(simpleDict.length(), i + 1)
        assert.equal(simpleDict.find(prefix + i), simpleData[i])
        assert.notExists(simpleDict.find(`notExist`))
      })
      it(`object: add ${i + 1} item`, () => {
        objDict.add(key, objData[i])
        assert.equal(objDict.length(), i + 1)
        assert.deepEqual(objDict.find(prefix + i), objData[i])
        assert.notExists(objDict.find(`notExist`))
      })
    }
  })

  describe('@remove', () => {
    const simpleDict = new Dictionary<string>()
    const objDict = new Dictionary<INode>()
    for (let i = 0; i < simpleData.length; i++) {
      const key = prefix + i;
      it(`simple: add ${i + 1} item`, () => {
        simpleDict.add(key, simpleData[i])
        assert.equal(simpleDict.find(key), simpleData[i])
        simpleDict.remove(key)
        assert.notExists(simpleDict.find(key))
      })
      it(`object: add ${i + 1} item`, () => {
        objDict.add(key, objData[i])
        assert.deepEqual(objDict.find(key), objData[i])
        objDict.remove(key);
        assert.notExists(objDict.find(key))
      })
    }
  })

  describe('@clear', () => {
    const simpleDict = new Dictionary<string>()
    const objDict = new Dictionary<INode>()
    for (let i = 0; i < simpleData.length; i++) {
      const key = prefix + i;
      it(`simple: add ${i + 1} item`, () => {
        simpleDict.add(key, simpleData[i])
        assert.equal(simpleDict.find(key), simpleData[i])
        assert.equal(simpleDict.length(), 1);
        simpleDict.clear();
        assert.equal(simpleDict.length(), 0);
        assert.notExists(simpleDict.find(key))
      })
      it(`object: add ${i + 1} item`, () => {
        objDict.add(key, objData[i])
        assert.deepEqual(objDict.find(key), objData[i])
        assert.equal(objDict.length(), 1)
        objDict.clear();
        assert.equal(objDict.length(), 0)
        assert.notExists(objDict.find(key))
      })
    }
  })

  describe('@sort', () => {
    const simpleDict = new Dictionary<string>()
    const objDict = new Dictionary<INode>()
    const lengthPositiveCb = (a: string, b: string) => a.length - b.length;
    const lengthNegtiveCb = (a: string, b: string) => b.length - a.length;
    for (let i = 0; i < simpleData.length; i++) {
      const key = prefix + (Math.random() + '').slice(-i - 1);
      it(`simple: add ${i + 1} item`, () => {
        simpleDict.add(key, simpleData[i])
        assert.equal(simpleDict.find(key), simpleData[i])
        assert.isArray(simpleDict.sort())
      })
      it(`object: add ${i + 1} item`, () => {
        objDict.add(key, objData[i])
        assert.deepEqual(objDict.find(key), objData[i])
        assert.isArray(objDict.sort())
      })
    }
    it(`simple : array equal `, () => {
      assert.equal(JSON.stringify(simpleDict.sort('key', lengthPositiveCb)), JSON.stringify(simpleData), 'array equal')
    })
    it(`obj : array equal `, () => {
      assert.equal(JSON.stringify(objDict.sort('key', lengthPositiveCb)), JSON.stringify(objData), 'obj array equal')
    })
    it(`simple : array equal `, () => {
      assert.equal(JSON.stringify(simpleDict.sort('key', lengthNegtiveCb)), JSON.stringify(simpleData.reverse()), 'array equal')
    })
    it(`obj : array equal `, () => {
      assert.equal(JSON.stringify(objDict.sort('key', lengthNegtiveCb)), JSON.stringify(objData.reverse()), 'obj array equal')
    })
  })

})