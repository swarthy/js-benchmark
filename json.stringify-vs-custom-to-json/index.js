const Benchmark = require('benchmark')

const suite10 = new Benchmark.Suite('10 elements')
const suite100 = new Benchmark.Suite('100 elements')
const suite1000 = new Benchmark.Suite('1000 elements')
const suite10000 = new Benchmark.Suite('10000 elements')
const suite100000 = new Benchmark.Suite('100000 elements')

const items10 = []
const items100 = []
const items1000 = []
const items10000 = []
const items100000 = []

for (let i = 0; i < 100000; i++) {
  if (i < 10) {
    items10.push(i + 1 + '')
  }
  if (i < 100) {
    items100.push(i + 1 + '')
  }
  if (i < 1000) {
    items1000.push(i + 1 + '')
  }
  if (i < 10000) {
    items10000.push(i + 1 + '')
  }
  items100000.push(i + 1 + '')
}

function toJSON(items) {
  var len = items.length
  var prevLen = len - 1
  var result = '['
  for (var i = 0; i < len; i++) {
    result += '"' + items[i] + '"'
    if (i !== prevLen) {
      result += ','
    }
  }
  return result + ']'
}

function createTestJSONStringify(items) {
  return function() {
    JSON.stringify(items)
  }
}

function createTestCustomToJSON(items) {
  return function() {
    toJSON(items)
  }
}

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

suite10
  .add('JSON.stringify', createTestJSONStringify(items10))
  .add('customToJSON', createTestCustomToJSON(items10))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite100
  .add('JSON.stringify', createTestJSONStringify(items100))
  .add('customToJSON', createTestCustomToJSON(items100))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite1000
  .add('JSON.stringify', createTestJSONStringify(items1000))
  .add('customToJSON', createTestCustomToJSON(items1000))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite10000
  .add('JSON.stringify', createTestJSONStringify(items10000))
  .add('customToJSON', createTestCustomToJSON(items10000))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite100000
  .add('JSON.stringify', createTestJSONStringify(items100000))
  .add('customToJSON', createTestCustomToJSON(items100000))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite10.run()
suite100.run()
suite1000.run()
suite10000.run()
suite100000.run()
