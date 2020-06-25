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

const coins = [1, 5, 10, 25]
const amount = 15;

console.log(new CoinChange(coins).makeChange(amount))
