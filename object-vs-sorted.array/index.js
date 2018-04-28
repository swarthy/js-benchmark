const Benchmark = require('benchmark')

const items10 = []
const items100 = []
const items1000 = []
const items10000 = []

for (let i = 0; i < 10000; i++) {
  if (i < 10) {
    items10.push({ id: i + 1 })
  }
  if (i < 100) {
    items100.push({ id: i + 1 })
  }
  if (i < 1000) {
    items1000.push({ id: i + 1 })
  }
  items10000.push({ id: i + 1 })
}

const items10reverse = items10.slice().reverse()
const items100reverse = items100.slice().reverse()
const items1000reverse = items1000.slice().reverse()
const items10000reverse = items10000.slice().reverse()

function objectCreateTest(changes, existItems) {
  return function() {
    const hash = {}
    changes.forEach(item => {
      hash[item.id] = item
    })
    existItems.forEach(existItem => hash[existItem.id])
  }
}

const compareById = (itemA, itemB) => itemA.id - itemB.id

function sortedArrayTest(changes, existItems) {
  return function() {
    const sortedChanges = changes.slice().sort(compareById)
    const sortedExistItems = existItems
    sortedExistItems.forEach((existItem, index) => sortedChanges[index])
  }
}

const suite = new Benchmark.Suite('object-vs-sorted_array')

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

objectCreateTest(items10, items10reverse)()
sortedArrayTest(items10, items10reverse)()

suite
  .add('object', objectCreateTest(items10reverse, items10))
  .add('sorted array', sortedArrayTest(items10reverse, items10))
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()
