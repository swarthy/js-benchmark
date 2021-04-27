const Benchmark = require('benchmark')

class Context {
  constructor(data) {
    this._data = data
  }
  extend(data) {
    return new Context(Object.assign(data, this._data))
  }
  assign(target) {
    return Object.assign(target, this._data)
  }
}

function parseFloat1(value) {
  switch (value) {
    case 'nan':
    case '-nan':
      return Number.NaN
    case 'inf':
      return Number.POSITIVE_INFINITY
    case '-inf':
      return Number.NEGATIVE_INFINITY
    default:
      return value
  }
}

function parseFloat2(value) {
  if (typeof value === 'number') {
    return value
  } else {
    switch (value) {
      case 'nan':
      case '-nan':
        return Number.NaN
      case 'inf':
        return Number.POSITIVE_INFINITY
      case '-inf':
        return Number.NEGATIVE_INFINITY
      default:
        throw new Error(`unsupported value: ${value}`)
    }
  }
}

const N = 10000
const values = new Array(N)
  .fill(0)
  .map((z, i) =>
    i % 3 === 0
      ? 'inf'
      : i % 4 === 0
      ? '-inf'
      : i % 5 === 0
      ? 'nan'
      : i % 6 === 0
      ? '-nan'
      : i
  )

function parseFloat1Test() {
  return function () {
    for (const value of values) {
      parseFloat1(value)
    }
  }
}

function parseFloat2Test() {
  return function () {
    for (const value of values) {
      parseFloat2(value)
    }
  }
}

const suite = new Benchmark.Suite('object')

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

suite
  .add('parseFloat1', parseFloat1Test())
  .add('parseFloat2', parseFloat2Test())
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()
