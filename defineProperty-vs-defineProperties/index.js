const Benchmark = require('benchmark')
const omit = require('lodash/omit')

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

function createAssigment(ids) {
  return function() {
    const selection = {}
    ids.forEach(id => {
      selection[id] = true
    })
  }
}

function createDefineProperty(ids) {
  return function() {
    const selection = {}
    ids.forEach(id => {
      Object.defineProperty(selection, id, {
        enumerable: true,
        configurable: true,
        value: true
      })
    })
  }
}

function createDefineProperties(ids) {
  return function() {
    const selection = {}
    const properties = {}
    const config = {
      enumerable: true,
      configurable: true,
      value: true
    }
    ids.forEach(id => {
      properties[id] = config
    })
    Object.defineProperties(selection, properties)
  }
}

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

function setupSuites(items) {
  const suite = new Benchmark.Suite(`${items.length} elements add`)

  suite
    .add('assigment', createAssigment(items))
    .add('defineProperty', createDefineProperty(items))
    .add('defineProperties', createDefineProperties(items))
    .on('cycle', onCycle)
    .on('complete', onComplete)

  return suite
}

let suites = []

suites = suites.concat(setupSuites(items10))
suites = suites.concat(setupSuites(items100))
suites = suites.concat(setupSuites(items1000))
suites = suites.concat(setupSuites(items10000))

suites.forEach(suite => suite.run())
