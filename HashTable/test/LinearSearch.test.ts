import 'mocha';
import { assert } from 'chai';
import LinearSearchHash from '../LinearSearch';
import Mock from 'mockjs';

interface IHashItem {
  key: string,
  value: string
}

const BaseHashTable = LinearSearchHash;

describe('BaseHashTable', () => {
  const mock: IHashItem[] = [];
  let i = 10;
  const random = Mock.Random;
  // TODO: key 是中文时候会有问题
  while (i-- >= 0) mock.push({ key: random.county() + random.integer(0, 1000), value: random.email() });
  let data: IHashItem[] = [...mock, ...mock.map(item => ({ key: item.key.split('').reverse().join(''), value: item.value }))]
  data = mock;

  describe('@length', () => {
    const hash = new BaseHashTable<string>();
    it('empty hash table', () => {
      assert.equal(hash.length(), 0)
    })
    data.forEach((item, index) => {
      it(`put ${index + 1} item`, () => {
        hash.put(item.key, item.value);
        assert.isNumber(hash.length())
        assert.equal(hash.length(), index + 1)
      })
    })
  })

  describe('@put', () => {
    const hash = new BaseHashTable<string>();
    it('empty hash table', () => {
      assert.equal(hash.length(), 0)
    })
    data.forEach((item, index) => {
      it(`put ${index + 1} item`, () => {
        hash.put(item.key, item.value);
        assert.isNumber(hash.length())
        assert.equal(hash.length(), index + 1)
      })
    })
  })

  describe('@has', () => {
    const hash = new BaseHashTable<string>();
    const NOT_EXIST = 'not-exist'
    data.forEach((item, index) => {
      it(`put ${index + 1} item`, () => {
        assert.isFalse(hash.has(item.key), `key not put should false ==> ${item.key}`)
        assert.isFalse(hash.has(NOT_EXIST), `key not exists should false ==> ${item.key}`)
        hash.put(item.key, item.value);
        assert.isTrue(hash.has(item.key))
        assert.isFalse(hash.has(NOT_EXIST))
      })
    })
  })

  describe('@get', () => {
    const hash = new BaseHashTable<string>();
    const NOT_EXIST = 'not-exist'
    data.forEach((item, index) => {
      it(`put ${index + 1} item`, () => {
        assert.isFalse(hash.has(item.key), `key not put should false ==> ${item.key}`)
        assert.isFalse(hash.has(NOT_EXIST), `key not exists should false ==> ${item.key}`)
        assert.notExists(hash.get(NOT_EXIST))
        assert.notExists(hash.get(item.key))
        hash.put(item.key, item.value);
        assert.equal(hash.get(item.key), item.value)
        assert.deepEqual(hash.get(item.key), item.value)
      })
    })
  })

  describe('@remove', () => {
    const hash = new BaseHashTable<string>();
    const NOT_EXIST = 'not-exist'
    data.forEach((item, index) => {
      it(`put ${index + 1} item`, () => {
        assert.isFalse(hash.has(item.key))
        assert.isFalse(hash.has(NOT_EXIST))
        assert.notExists(hash.get(item.key))
        hash.put(item.key, item.value);
        assert.isTrue(hash.remove(item.key))
        assert.isFalse(hash.remove(item.key))
        assert.notExists(hash.get(item.key))
      })
    })
  })

})