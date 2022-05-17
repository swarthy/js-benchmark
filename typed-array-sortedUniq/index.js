const Benchmark = require('benchmark')
const sortedUniq = require('lodash/sortedUniq')

function bitCount(n) {
  n = n - ((n >> 1) & 0x55555555)
  n = (n & 0x33333333) + ((n >> 2) & 0x33333333)
  return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24
}

function sortedUniqUint16Array(array) {
  var index = -1
  var length = array.length
  var seen
  var pickBits = 0

  while (++index < length) {
    var value = array[index]

    if (index === 0 || value !== seen) {
      seen = value
      pickBits |= 1 << index
    }
  }
  var newSize = bitCount(pickBits)
  var newArray = new Uint16Array(newSize)

  index = -1
  var newArrayIndex = -1
  while (++index < length) {
    if ((pickBits & (1 << index)) !== 0) {
      newArray[++newArrayIndex] = array[index]
    }
  }
  return newArray
}

function sortedUniqLodash(array) {
  return new Uint16Array(sortedUniq(array))
}

function customTest(array) {
  return function() {
    return sortedUniqUint16Array(array)
  }
}

function lodashTest(array) {
  return function() {
    return sortedUniqLodash(array)
  }
}

const items = new Uint16Array([10, 20, 30, 30, 40])

const suite = new Benchmark.Suite('sortedUniq')

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

suite
  .add('lodash', lodashTest(items))
  .add('custom', customTest(items))
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()
