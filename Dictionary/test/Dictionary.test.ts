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

  describe('@has', () => {
    const simpleDict = new Dictionary<string>()
    const objDict = new Dictionary<INode>()
    for (let i = 0; i < simpleData.length; i++) {
      const key = prefix + i;
      const notExistKey = prefix + (i + 1);
      it(`simple: set ${i + 1} item`, () => {
        simpleDict.set(key, simpleData[i])
        assert.equal(simpleDict.length(), i + 1)
        assert.isTrue(simpleDict.has(key))
        assert.isFalse(simpleDict.has(notExistKey))
      })
      it(`object: set ${i + 1} item`, () => {
        objDict.set(key, objData[i])
        assert.equal(objDict.length(), i + 1)
        assert.isTrue(objDict.has(key))
        assert.isFalse(objDict.has(notExistKey))
      })
    }
  })

  describe('@set', () => {
    const simpleDict = new Dictionary<string>()
    const objDict = new Dictionary<INode>()
    for (let i = 0; i < simpleData.length; i++) {
      const key = prefix + i;
      it(`simple: set ${i + 1} item`, () => {
        assert.isFalse(simpleDict.has(key))
        simpleDict.set(key, simpleData[i])
        assert.equal(simpleDict.length(), i + 1)
        assert.isTrue(simpleDict.has(key))
      })
      it(`object: set ${i + 1} item`, () => {
        assert.isFalse(objDict.has(key))
        objDict.set(key, objData[i])
        assert.equal(objDict.length(), i + 1)
        assert.isTrue(objDict.has(key))
      })
    }
  })

  describe('@get', () => {
    const simpleDict = new Dictionary<string>()
    const objDict = new Dictionary<INode>()
    for (let i = 0; i < simpleData.length; i++) {
      const key = prefix + i;
      it(`simple: set ${i + 1} item`, () => {
        simpleDict.set(key, simpleData[i])
        assert.equal(simpleDict.length(), i + 1)
        assert.equal(simpleDict.get(prefix + i), simpleData[i])
        assert.notExists(simpleDict.get(`notExist`))
      })
      it(`object: set ${i + 1} item`, () => {
        objDict.set(key, objData[i])
        assert.equal(objDict.length(), i + 1)
        assert.deepEqual(objDict.get(prefix + i), objData[i])
        assert.notExists(objDict.get(`notExist`))
      })
    }
  })

  describe('@remove', () => {
    const simpleDict = new Dictionary<string>()
    const objDict = new Dictionary<INode>()
    for (let i = 0; i < simpleData.length; i++) {
      const key = prefix + i;
      it(`simple: set ${i + 1} item`, () => {
        assert.isFalse(simpleDict.remove(key))
        assert.isFalse(simpleDict.has(key))
        simpleDict.set(key, simpleData[i])
        assert.equal(simpleDict.get(key), simpleData[i])
        assert.isTrue(simpleDict.remove(key))
        assert.isFalse(simpleDict.has(key))
        assert.isFalse(simpleDict.remove(key))
        assert.notExists(simpleDict.get(key))
      })
      it(`object: set ${i + 1} item`, () => {
        assert.isFalse(objDict.remove(key))
        assert.isFalse(objDict.has(key))
        objDict.set(key, objData[i])
        assert.deepEqual(objDict.get(key), objData[i])
        assert.isTrue(objDict.has(key))
        assert.isTrue(objDict.remove(key))
        assert.isFalse(objDict.remove(key))
        assert.notExists(objDict.get(key))
      })
    }
  })

  describe('@clear', () => {
    const simpleDict = new Dictionary<string>()
    const objDict = new Dictionary<INode>()
    for (let i = 0; i < simpleData.length; i++) {
      const key = prefix + i;
      it(`simple: set ${i + 1} item`, () => {
        simpleDict.set(key, simpleData[i])
        assert.equal(simpleDict.get(key), simpleData[i])
        assert.equal(simpleDict.length(), 1);
        assert.isTrue(simpleDict.has(key))
        simpleDict.clear();
        assert.isFalse(simpleDict.has(key))
        assert.equal(simpleDict.length(), 0);
        assert.notExists(simpleDict.get(key))
      })
      it(`object: set ${i + 1} item`, () => {
        objDict.set(key, objData[i])
        assert.deepEqual(objDict.get(key), objData[i])
        assert.equal(objDict.length(), 1)
        assert.isTrue(objDict.has(key))
        objDict.clear();
        assert.isFalse(objDict.has(key))
        assert.equal(objDict.length(), 0)
        assert.notExists(objDict.get(key))
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
      it(`simple: set ${i + 1} item`, () => {
        simpleDict.set(key, simpleData[i])
        assert.equal(simpleDict.get(key), simpleData[i])
        assert.isArray(simpleDict.sort())
      })
      it(`object: set ${i + 1} item`, () => {
        objDict.set(key, objData[i])
        assert.deepEqual(objDict.get(key), objData[i])
        assert.isArray(objDict.sort())
      })
    }
    it(`simple : array deep equal `, () => {
      assert.equal(JSON.stringify(simpleDict.sort('key', lengthPositiveCb)), JSON.stringify(simpleData), 'array equal')
    })
    it(`obj : array deep equal `, () => {
      assert.equal(JSON.stringify(objDict.sort('key', lengthPositiveCb)), JSON.stringify(objData), 'obj array equal')
    })
    it(`simple : array deep equal `, () => {
      assert.equal(JSON.stringify(simpleDict.sort('key', lengthNegtiveCb)), JSON.stringify(simpleData.reverse()), 'array equal')
    })
    it(`obj : array deep equal `, () => {
      assert.equal(JSON.stringify(objDict.sort('key', lengthNegtiveCb)), JSON.stringify(objData.reverse()), 'obj array equal')
    })
  })

})