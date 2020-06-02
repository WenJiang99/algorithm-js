const Stack = require('./Stack')


class SysConvertor {
  _stack = new Stack();
  _backup;
  /**
   * 
   * @param {Number} radix 要转换的目标进制
   * @param {Number | String} value 要转换的数值
   * @param {Number} base 要转换的数的进制
   */
  constructor({ radix = 2, value = 0, base = 10 }) {
    this.radix = radix === 16 ? radix : Number(radix) % 11;
    this.value = value;
    this._backup = value;
    this.base = Math.abs(Number(base));
  }
  setRadix(radix) {
    this.radix = Math.abs(radix % 11);
    return this;
  }
  setValue(value) {
    this.value = value;
    this._backup = value;
    return this;
  }

  _toDecimal() {
    if (!this.value) return 0;
    if (this.base == 10) return this.value;
    const chars = new Stack(String(this.value).split(''));
    let i = 0;
    this.value = 0;
    while (!chars.isEmpty()) {
      const item = chars.pop();
      if (['A', 'B', 'C', 'D', 'E', 'F'].includes(item)) this.value += Math.pow(this.base, i++) * (item.charCodeAt() - 'A'.charCodeAt() + 10);
      else this.value += Math.pow(this.base, i++) * Number(item);
    }
  }
  _format(value) {
    if (value < 10) return value;
    return String.fromCharCode(('A'.charCodeAt() - 10) + value)
  }
  render() {
    if (!this.radix || typeof this.value === 'undefined') throw new Error('radix and value both needed.')
    this._toDecimal();
    do {
      this._stack.push(this._format(this.value % this.radix));
      this.value = Math.floor(this.value / this.radix);
    } while (this.value)
    this.value = this._backup;
    return this._stack.join('')
  }
}

module.exports = SysConvertor;