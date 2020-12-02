const Benchmark = require('benchmark')

const suite = new Benchmark.Suite('10000 elements')

const items = []

// max safe integer
// 9007199254740991

const N = 100

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

function bigIntRun2() {
  const results = []
  const len = items.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const cmpResult = compareBigInts(BigInt(items[i]), BigInt(items[j]))
      results.push(cmpResult)
    }
  }
}

function stringCompareRun2() {
  const results = []
  const len = items.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len; j++) {
      const cmpResult = compareStringBigInts(items[i], items[j])
      results.push(cmpResult)
    }
  }
}

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

suite
  .add('BigInt run', bigIntRun2)
  .add('stringCompare run', stringCompareRun2)
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite.run()
