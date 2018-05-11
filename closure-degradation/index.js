const Benchmark = require('benchmark')
const createSelector = require('reselect').createSelector

const state = {
  entities: {
    users: {
      1: { id: 1 },
      2: { id: 2 },
      3: { id: 3 }
    }
  }
}

function nativeTest() {
  const nativeSelector = state => state.entities.users
  return function() {
    nativeSelector(state)
  }
}

const createGeneratedSelector = key => state => state.entities[key]

function generatedTest() {
  const generatedSelector = createGeneratedSelector('users')
  return function() {
    generatedSelector(state)
  }
}

const suite = new Benchmark.Suite('closure-degradation')

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

suite
  .add('native', nativeTest())
  .add('generated', generatedTest())
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()
