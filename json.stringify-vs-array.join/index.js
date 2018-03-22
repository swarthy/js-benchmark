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

function createTestJSONStringify(items) {
  return function() {
    JSON.stringify(items)
  }
}

function createTestArrayJoin(items) {
  return function() {
    items.join()
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
  .add('array.join', createTestArrayJoin(items10))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite100
  .add('JSON.stringify', createTestJSONStringify(items100))
  .add('array.join', createTestArrayJoin(items100))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite1000
  .add('JSON.stringify', createTestJSONStringify(items1000))
  .add('array.join', createTestArrayJoin(items1000))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite10000
  .add('JSON.stringify', createTestJSONStringify(items10000))
  .add('array.join', createTestArrayJoin(items10000))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite100000
  .add('JSON.stringify', createTestJSONStringify(items100000))
  .add('array.join', createTestArrayJoin(items100000))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite10.run()
suite100.run()
suite1000.run()
suite10000.run()
suite100000.run()

const suite10String = new Benchmark.Suite('10 elements string')
const suite100String = new Benchmark.Suite('100 elements string')
const suite1000String = new Benchmark.Suite('1000 elements string')
const suite10000String = new Benchmark.Suite('10000 elements string')
const suite100000String = new Benchmark.Suite('100000 elements string')

const items10JSONString = JSON.stringify(items10)
const items10JoinString = items10.join()
const items100JSONString = JSON.stringify(items100)
const items100JoinString = items100.join()
const items1000JSONString = JSON.stringify(items1000)
const items1000JoinString = items1000.join()
const items10000JSONString = JSON.stringify(items10000)
const items10000JoinString = items10000.join()
const items100000JSONString = JSON.stringify(items100000)
const items100000JoinString = items100000.join()

function createTestJSONParse(str) {
  return function() {
    JSON.parse(str)
  }
}

function createTestStrSplit(str) {
  return function() {
    str.split(',')
  }
}

suite10String
  .add('JSON.parse', createTestJSONParse(items10JSONString))
  .add('str.split', createTestStrSplit(items10JoinString))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite100String
  .add('JSON.parse', createTestJSONParse(items100JSONString))
  .add('str.split', createTestStrSplit(items100JoinString))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite1000String
  .add('JSON.parse', createTestJSONParse(items1000JSONString))
  .add('str.split', createTestStrSplit(items1000JoinString))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite10000String
  .add('JSON.parse', createTestJSONParse(items10000JSONString))
  .add('str.split', createTestStrSplit(items10000JoinString))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite100000String
  .add('JSON.parse', createTestJSONParse(items100000JSONString))
  .add('str.split', createTestStrSplit(items100000JoinString))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite10String.run()
suite100String.run()
suite1000String.run()
suite10000String.run()
suite100000String.run()
