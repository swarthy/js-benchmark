const Benchmark = require('benchmark')

function declaredOutside(k) {
  return k * 1.25
}
function optFn(n) {
  return declaredOutside(n) + (n > 1 ? optFn(n - 1) : 0)
}

function noOptFn(n) {
  function declaredInside(k) {
    return k * 1.25
  }
  return declaredInside(n) + (n > 1 ? noOptFn(n - 1) : 0)
}

function opTest(n) {
  return function() {
    optFn(n)
  }
}

function noOpTest(n) {
  return function() {
    noOptFn(n)
  }
}

const suite = new Benchmark.Suite('func-declaration-opt')

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

const size = 10000
suite
  .add('opt test', opTest(size))
  .add('noopt test', noOpTest(size))
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()
