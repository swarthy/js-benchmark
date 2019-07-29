const { performance } = require('perf_hooks')
const Benchmark = require('benchmark')
const fs = require('fs')
const path = require('path')

const primitives = []
const references = []

function getRandomString(len) {
  let result = ''
  for (let i = 0; i < len; i++) {
    result += Math.trunc(Math.random() * 9.999)
  }
  return result
}

const STRING_LEN = 32

const trash = fs.readFileSync(path.resolve(__dirname, './text.txt'), 'utf8')
console.log(trash.length)

// 1072000000
// 1 072 000 000
class Ref {
  constructor(value) {
    this._value = value
  }
}

const getBase = () => trash // getRandomString(STRING_LEN)

const primitiveValue = getBase() + '500000'
const referenceValue = new String(getBase() + '500000')

const start = performance.now()
for (let i = 0; i < 1000000; i++) {
  if (i === 50000) {
    primitives.push(primitiveValue)
    references.push(referenceValue)
  } else {
    primitives.push(getBase() + i)
    references.push(new String(getBase() + i))
  }
}
const duration = performance.now() - start
console.log('init, ms:', duration)

function createTest(items, searchValue) {
  return function() {
    items.find(item => item === searchValue)
  }
}

const suite = new Benchmark.Suite('compare-references-vs-compare-primitives')

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

suite
  .add('references', createTest(references, referenceValue))
  .add('primitives', createTest(primitives, primitiveValue))
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()
