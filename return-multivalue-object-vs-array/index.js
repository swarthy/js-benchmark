const Benchmark = require('benchmark')

const items10 = []
const items100 = []
const items1000 = []
const items10000 = []

for (let i = 0; i < 10000; i++) {
  if (i < 10) {
    items10.push([i, i, i])
  }
  if (i < 100) {
    items100.push([i, i, i])
  }
  if (i < 1000) {
    items1000.push([i, i, i])
  }
  items10000.push([i, i, i])
}

function returnArray(a, b, c) {
  return [a, b, c]
}

function returnObject(a, b, c) {
  return { a, b, c }
}

function mock(a, b, c) {
  return a + b + c
}

function objectCreateTest(items) {
  return function() {
    items.forEach(item => {
      const { a, b, c } = returnObject(item)
      mock(a, b, c)
    })
  }
}

function arrayCreateTest(items) {
  return function() {
    items.forEach(item => {
      const [a, b, c] = returnArray(item)
      mock(a, b, c)
    })
  }
}

const suite = new Benchmark.Suite('return-multivalue-object-vs-array')

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

// objectCreateTest(items10)()
// arrayCreateTest(items10)()
//
// suite
//   .add('object 10', objectCreateTest(items10))
//   .add('array 10', arrayCreateTest(items10))
//   .on('cycle', onCycle)
//   .on('complete', onComplete)
//   .run()
//
// suite
//   .add('object 100', objectCreateTest(items100))
//   .add('array 100', arrayCreateTest(items100))
//   .on('cycle', onCycle)
//   .on('complete', onComplete)
//   .run()
//
// suite
//   .add('object 1000', objectCreateTest(items1000))
//   .add('array 1000', arrayCreateTest(items1000))
//   .on('cycle', onCycle)
//   .on('complete', onComplete)
//   .run()

suite
  .add('object 10000', objectCreateTest(items10000))
  .add('array 10000', arrayCreateTest(items10000))
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()
