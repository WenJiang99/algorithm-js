const SysConvertor = require('./SysConvert')

const convertor = new SysConvertor({ radix: 10, value: '1A', base: 16 })
console.log(convertor.render())
console.log(convertor.setRadix(8).render(),convertor.setRadix(4).render())
