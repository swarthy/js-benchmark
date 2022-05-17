const Benchmark = require('benchmark');

const suite = new Benchmark.Suite('simple');

async function asyncFunction() {
  return 123;
}

function promiseFunction() {
  return Promise.resolve(123);
}

const createFn = (fn) =>
  function (deferred) {
    fn().then(() => deferred.resolve());
  };

suite
  .add({
    name: 'return Promise',
    defer: true,
    fn: createFn(() => promiseFunction())
  })
  .add({
    name: 'return await Promise',
    defer: true,
    fn: createFn(async () => await promiseFunction())
  })
  .add({
    name: 'return async',
    defer: true,
    fn: createFn(() => asyncFunction())
  })
  .add({
    name: 'return await async',
    defer: true,
    fn: createFn(async () => await asyncFunction())
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  });

suite.run({
  async: true,
  defer: true
});
