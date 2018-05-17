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

function plainObjectTest() {
  return function() {
    const sourceContext = { reqId: 5 }
    const childContext1 = Object.assign({ val1: 1 }, sourceContext)
    const childContext2 = Object.assign({ val2: 2 }, childContext1)
    const childContext3 = Object.assign({ val3: 3 }, childContext2)
    const childContext4 = Object.assign({ val4: 4 }, childContext3)
    const childContext5 = Object.assign({ val5: 5 }, childContext4)
    const childContext6 = Object.assign({ val6: 5 }, childContext5)
    const childContext7 = Object.assign({ val7: 5 }, childContext6)
    const childContext8 = Object.assign({ val8: 5 }, childContext7)
    const childContext9 = Object.assign({ val9: 5 }, childContext8)
    const childContext0 = Object.assign({ val0: 5 }, childContext9)
  }
}

function contextClassTest() {
  return function() {
    const sourceContext = new Context({ reqId: 5 })
    const childContext1 = sourceContext.extend({ val1: 1 })
    const childContext2 = childContext1.extend({ val2: 2 })
    const childContext3 = childContext2.extend({ val3: 3 })
    const childContext4 = childContext3.extend({ val4: 4 })
    const childContext5 = childContext4.extend({ val5: 5 })
    const childContext6 = childContext5.extend({ val6: 5 })
    const childContext7 = childContext6.extend({ val7: 5 })
    const childContext8 = childContext7.extend({ val8: 5 })
    const childContext9 = childContext8.extend({ val9: 5 })
    const childContext0 = childContext9.extend({ val0: 5 })
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
  .add('plain', plainObjectTest())
  .add('context', contextClassTest())
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()

