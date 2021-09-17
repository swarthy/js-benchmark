const Benchmark = require('benchmark')

const suite = new Benchmark.Suite('Test suite')

function createTestSpliceInsert() {
  const EMPTY_ARRAY = []
  return function () {
    const array = [1, 2, 3]
    array.splice(
      3,
      0,
      EMPTY_ARRAY,
      EMPTY_ARRAY,
      EMPTY_ARRAY,
      EMPTY_ARRAY,
      EMPTY_ARRAY,
      EMPTY_ARRAY,
      EMPTY_ARRAY,
      EMPTY_ARRAY,
      EMPTY_ARRAY
    )
  }
}

function createTestSetByIndex() {
  const EMPTY_ARRAY = []
  return function () {
    const array = [1, 2, 3]
    array[3] = EMPTY_ARRAY
    array[4] = EMPTY_ARRAY
    array[5] = EMPTY_ARRAY
    array[6] = EMPTY_ARRAY
    array[7] = EMPTY_ARRAY
    array[8] = EMPTY_ARRAY
    array[9] = EMPTY_ARRAY
    array[10] = EMPTY_ARRAY
    array[11] = EMPTY_ARRAY
  }
}

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

suite
  .add('splice-insert', createTestSpliceInsert())
  .add('set-by-index', createTestSetByIndex())
  .on('cycle', onCycle)
  .on('complete', onComplete)

suite.run()
