# 动态规划

## 基本解释

### 什么是动态规划

动态规划是**将复杂问题分解成多个更小的子问题来解决**的优化策略

假设从一个问题的起点`src`出发，到达到一个问题的终点`dest`，从起点到终点之间的路径中，会经过很多个的中间节点，然后要找到从起点到终点的一个最优的路径。

动态规划思想是，如果要到达终点`dest`，必须要经过的节点有`A`,`B`，那问题就可以转换成求解起点`src`到`A`、`B`的最优路径，加上`A`,`B`各自到终点`dest`的路径

例如下面的例子中，我们要求解`A`到`F`的最优路径，因为到达`F`，必须要经过`D`和`E`，且`D`到`F`到代价是2,`E`到`F`的代价也是2，则只需要求解`A`到`D`、`E`的最优路径`f(D)`、`f(E)`，然后最优路径就是 `min{f(D)+2,f(E)+2}`
这样就把一个大的复杂的问题，分解成小的子问题来解决了。

![](./images/example.png)

### 什么时候用动态规划

知乎上看到的一个解释：  

![](./images/features.png)

一些动态规划的著名例子：
- 背包问题
- 最长公共子序列
- 矩阵链相乘
- 硬币找零
- 图的全源最短路径

## 硬币找零问题

### 问题描述

硬币系统中`coins`中，共包括有多个不同面额的硬币`[c1,c2,c3,...cn]`，使用这个硬币系统来将凑出某个数额`amount`，要求使用的硬币的数量取最小值。

### 解决思路
凑出数额为`amount`的金额需要用到的最少的硬币组合为`f(amount)`

对于具体的数额`amount`，一定是由小于或等于这个数额的硬币组成的。在选择了某个金额为`n`的硬币coin后，剩余的数额为`balance = amount-n`，此时凑出数额`amount`所需的硬币组合即为`f(amount-coin)+coin`，只需要遍历一下所有的硬币，对于小于`amount`的硬币，计算一下`f(amount-coin)+coin`所有可能取值，选择最优即可。

也即得到一个公式：`f(amount) = f(amount-coin) + coin`

最优解的判定条件是硬币组合数组中，数组的长度最短为最优。

### 代码实现

```ts
class CoinChange {

  private readonly cache: { [k: number]: number[] } = {}
  constructor(protected coins: number[], protected amount?: number) {
  }
  setAmount(amount: number) {
    this.amount = amount;
  }
  makeChange(amount: number): number[] {
    if (amount <= 0) {
      return []
    }
    if (this.cache[amount]) {
      return this.cache[amount]
    }
    let i = -1;
    let change: number[] = []
    let balanceChange: number[] = []
    while (++i < this.coins.length) {
      const coin = this.coins[i]
      const balance = amount - coin;
      if (balance >= 0) {
        balanceChange = this.makeChange(balance)
        if (
          (balanceChange.length < change.length - 1 || !change.length) &&
          (balanceChange.length || !balance)
        ) {
          change = [coin].concat(balanceChange)
        }
      }
    }
    this.cache[amount] = change;
    return change;
  }
}
```

在`while`循环内，对`balance >=0`进行判断是为了选择金额小于要凑出的数额的硬币。

`change`变量存放的就是计算得到的最优解，`balanceChange`则是`f(amount-coin)`。
比较 `balanceChange.length < change.length - 1 ` 是为了比较选择当前的硬币的组合是否要比已经计算得到的暂时的最优解更好，当前硬币的组合所使用的硬币组合是`coin + balanceChange`，所以比较长度时候`change.length - 1`

`balanceChange.length || !balance` 考虑的是恰好 `amount = coin`的情况

`!change.length` 是第一次循环会满足的条件

## 参考
- [知乎-什么是动态规划（Dynamic Programming）？动态规划的意义是什么](https://www.zhihu.com/question/23995189)