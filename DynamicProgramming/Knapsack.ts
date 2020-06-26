interface IGoodInfo {
  weight: number,
  value: number,
}
class Knapsack {
  constructor() {
  }

  recursive(goodsList: IGoodInfo[], capacity: number): IGoodInfo[] {
    if (capacity <= 0) {
      return []
    }
    const goodsCount = goodsList.length;
    let target: IGoodInfo[] = []
    let maxValue = 0;
    for (let i = 0; i < goodsCount; i++) {
      const goods = goodsList[i];
      if (goods.weight <= capacity) {
        const otherGoodsList = this.recursive(goodsList.slice(i + 1), capacity - goods.weight)
        const value = otherGoodsList.reduce((total, current) => total + current.value, 0)
        if (
          ((value + goods.value) > maxValue || !maxValue)
        ) {
          maxValue = value + goods.value;
          target = [goods].concat(otherGoodsList)
        }
      }
    }
    return target;
  }

  loop(goodsList: IGoodInfo[], capacity: number): any[] {
    const goodsCount = goodsList.length;
    const matrix = []
    const selectedMatrix = []
    for (let i = 0; i <= goodsCount; i++) {
      matrix[i] = []
      selectedMatrix[i] = []
    }
    for (let i = 0; i <= goodsCount; i++) {
      for (let weight = 0; weight <= capacity; weight++) {
        if (i === 0 || weight === 0) {
          matrix[i][weight] = 0;
          selectedMatrix[i][weight] = [];
        } else if (goodsList[i - 1].weight <= weight) {
          const currentGoods = goodsList[i - 1]
          const pickCurrent = matrix[i - 1][weight - currentGoods.weight] + currentGoods.value;
          const notPickCurrent = matrix[i - 1][weight];
          // 不选当前物品 与 选了当前物品 哪一种情况下的价值最大
          if (pickCurrent > notPickCurrent) {
            matrix[i][weight] = pickCurrent;
            selectedMatrix[i][weight] = (selectedMatrix[i - 1][weight - currentGoods.weight] || []).concat([currentGoods])
          } else {
            matrix[i][weight] = notPickCurrent;
            selectedMatrix[i][weight] = selectedMatrix[i - 1][weight] || []
          }
        } else {
          matrix[i][weight] = matrix[i - 1][weight]
          selectedMatrix[i][weight] = selectedMatrix[i - 1][weight] || []
        }
      }
    }
    return selectedMatrix[goodsCount][capacity];
  }
}

const goods: IGoodInfo[] = [
  {
    weight: 1,
    value: 1
  },
  {
    weight: 2,
    value: 6
  },
  {
    weight: 5,
    value: 18
  },
  {
    weight: 6,
    value: 22
  },
  {
    weight: 7,
    value: 28
  },
]
const kn = new Knapsack()
console.log(kn.loop(goods, 11))
