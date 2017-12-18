const Benchmark = require('benchmark')

const suite10 = new Benchmark.Suite('10 elements')
const suite100 = new Benchmark.Suite('100 elements')
const suite1000 = new Benchmark.Suite('1000 elements')
const suite10000 = new Benchmark.Suite('10000 elements')

const items10 = []
const items100 = []
const items1000 = []
const items10000 = []

for (let i = 0; i < 10000; i++) {
  if (i < 10) {
    items10.push(i + 1)
  }
  if (i < 100) {
    items100.push(i + 1)
  }
  if (i < 1000) {
    items1000.push(i + 1)
  }
  items10000.push(i + 1)
}

const k1 = item => 1
const k2 = item => 2
const k3 = item => 3
const k4 = item => 4
const k5 = item => 5
const k6 = item => 6
const k7 = item => 7
const k8 = item => 8
const k9 = item => 9
const k10 = item => 10

function testSingleRun() {}

function createTestSingleRun(items) {
  return function() {
    items.forEach(item => {
      k1(item)
      k2(item)
      k3(item)
      k4(item)
      k5(item)
      k6(item)
      k7(item)
      k8(item)
      k9(item)
      k10(item)
    })
  }
}

function createTestMultipleRun(items) {
  return function() {
    items.forEach(k1)
    items.forEach(k2)
    items.forEach(k3)
    items.forEach(k4)
    items.forEach(k5)
    items.forEach(k6)
    items.forEach(k7)
    items.forEach(k8)
    items.forEach(k9)
    items.forEach(k10)
  }
}

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

suite10
  .add('single run', createTestSingleRun(items10))
  .add('multiple run', createTestMultipleRun(items10))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite100
  .add('single run', createTestSingleRun(items100))
  .add('multiple run', createTestMultipleRun(items100))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite1000
  .add('single run', createTestSingleRun(items1000))
  .add('multiple run', createTestMultipleRun(items1000))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite10000
  .add('single run', createTestSingleRun(items10000))
  .add('multiple run', createTestMultipleRun(items10000))
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite10.run()
suite100.run()
suite1000.run()
suite10000.run()
