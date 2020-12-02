const Benchmark = require('benchmark')

const suite = new Benchmark.Suite('10000 elements')

const items = []

// max safe integer
// 9007199254740991

const N = 10000

for (let i = 0; i < N; i++) {
  const hugeIntStr =
    '' +
    Math.round(Math.random() * Number.MAX_SAFE_INTEGER) +
    Math.round(Math.random() * 10000)
  items.push(hugeIntStr)
}

function compareBigInts(a, b) {
  return a < b ? -1 : a > b ? 1 : 0
}

function compareStringBigInts(a, b) {
  const aLen = a.length
  const bLen = b.length
  if (aLen < bLen) {
    return -1
  } else if (aLen > bLen) {
    return 1
  } else {
    return a < b ? -1 : a > b ? 1 : 0
  }
}

function bigIntRun1() {
  const bigInts = items.map(i => BigInt(i))
  bigInts.sort(compareBigInts)
}

function stringCompareRun1() {
  const stringBigInts = items.slice(0)
  stringBigInts.sort(compareStringBigInts)
}

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

suite
  .add('BigInt run', bigIntRun1)
  .add('stringCompare run', stringCompareRun1)
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite.run()
