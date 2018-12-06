const Benchmark = require('benchmark')

function declaredOutside(k, coef) {
  return k * coef
  // return k * 1.25
}
function optFn(n, coef) {
  return declaredOutside(n, coef) + (n > 1 ? optFn(n - 1, coef) : 0)
}

function noOptFn(n, coef) {
  function declaredInside(k) {
    return k * coef
    // return k * 1.25
  }
  return declaredInside(n) + (n > 1 ? noOptFn(n - 1, coef) : 0)
}

function optTest(n, coef) {
  return function() {
    optFn(n, coef)
  }
}

function noOptTest(n, coef) {
  return function() {
    noOptFn(n, coef)
  }
}

const suite = new Benchmark.Suite('func-declaration-opt')

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

const size = 1000
suite
  .add('opt test', optTest(size, 1.25))
  .add('noopt test', noOptTest(size, 1.25))
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()
