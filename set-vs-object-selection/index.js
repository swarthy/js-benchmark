const Benchmark = require('benchmark')
const omit = require('lodash/omit')

const suite10add = new Benchmark.Suite('10 elements add')
const suite10has = new Benchmark.Suite('10 elements has')
const suite10remove = new Benchmark.Suite('10 elements remove')
const suite10getAll = new Benchmark.Suite('10 elements getAll')

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

function createSet() {
  this.selection = new Set()
}

function createSetInit(ids) {
  return function createAndFillSet() {
    this.selection = new Set()
    ids.forEach(id => this.selection.add(id))
  }
}

function createObject() {
  this.selection = {}
}

function createObjectInit(ids) {
  return function createAndFillObject() {
    this.selection = {}
    ids.forEach(id => {
      this.selection[id] = true
    })
  }
}

function createTestSetAdd(ids) {
  return function() {
    ids.forEach(id => this.selection.add(id))
  }
}

function createTestSetRemove(ids) {
  return function() {
    ids.forEach(id => this.selection.delete(id))
  }
}

function createTestSetHas(ids) {
  return function() {
    ids.forEach(id => this.selection.has(id))
  }
}

function createTestSetGetAll(ids) {
  return function() {
    return Array.from(this.selection.values())
  }
}

function createTestObjectAdd(ids) {
  return function() {
    const newSelection = Object.assign({}, this.selection)
    ids.forEach(id => {
      newSelection = true
    })
    this.selection = newSelection
  }
}

function createTestObjectRemove(ids) {
  return function() {
    ids.forEach(id => {
      this.selection = omit(this.selection, id)
    })
  }
}

function createTestObjectHas(ids) {
  return function() {
    ids.forEach(id => this.selection[id])
  }
}

function createTestObjectGetAll(ids) {
  return function() {
    return Object.keys(this.selection)
  }
}

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

function setupSuites(items) {
  const suiteAdd = new Benchmark.Suite(`${items.length} elements add`)
  const suiteHas = new Benchmark.Suite(`${items.length} elements has`)
  const suiteRemove = new Benchmark.Suite(`${items.length} elements remove`)
  const suiteGetAll = new Benchmark.Suite(`${items.length} elements getAll`)

  suiteAdd
    .add('set add', createTestSetAdd(items), {
      onStart: createSet,
      onCycle: createSet
    })
    .add('object add', createTestObjectAdd(items), {
      onStart: createObject,
      onCycle: createObject
    })
    .on('cycle', onCycle)
    .on('complete', onComplete)
  suiteHas
    .add('set has', createTestSetHas(items), {
      onStart: createSetInit(items),
      onCycle: createSetInit(items)
    })
    .add('object has', createTestObjectHas(items), {
      onStart: createObjectInit(items),
      onCycle: createObjectInit(items)
    })
    .on('cycle', onCycle)
    .on('complete', onComplete)
  suiteRemove
    .add('set remove', createTestSetRemove(items), {
      onStart: createSetInit(items),
      onCycle: createSetInit(items)
    })
    .add('object remove', createTestObjectRemove(items), {
      onStart: createObjectInit(items),
      onCycle: createObjectInit(items)
    })
    .on('cycle', onCycle)
    .on('complete', onComplete)
  suiteGetAll
    .add('set get all', createTestSetGetAll(items), {
      onStart: createSetInit(items),
      onCycle: createSetInit(items)
    })
    .add('object get all', createTestObjectGetAll(items), {
      onStart: createObjectInit(items),
      onCycle: createObjectInit(items)
    })
    .on('cycle', onCycle)
    .on('complete', onComplete)
  return [suiteAdd, suiteHas, suiteRemove, suiteGetAll]
}

let suites = []

suites = suites.concat(setupSuites(items10))
suites = suites.concat(setupSuites(items100))
suites = suites.concat(setupSuites(items1000))
suites = suites.concat(setupSuites(items10000))

suites.forEach(suite => suite.run())
