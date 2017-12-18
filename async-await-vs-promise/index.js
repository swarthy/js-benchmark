const Benchmark = require('benchmark')
const Bluebird = require('bluebird')

const suite = new Benchmark.Suite('simple')

const promiseAsync = resolve => setTimeout(resolve, 0)
const promiseSync = resolve => resolve()

const PromiseResolve = () => Promise.resolve()
const BluebirdResolve = () => Bluebird.resolve()
const PromiseSync = () => new Promise(promiseSync)
const BluebirdSync = () => new Bluebird(promiseSync)

const PromiseAsync = () => new Promise(promiseAsync)
const BluebirdAsync = () => new Bluebird(promiseAsync)

function createAsyncAwait(getPromise) {
  return async function testAsyncAwait() {
    const result1 = await getPromise()
    const result2 = await getPromise()
    const result3 = await getPromise()
    return [result1, result2, result3]
  }
}

function createPromise(getPromise) {
  return function testPromise() {
    return getPromise().then(result1 =>
      getPromise().then(result2 =>
        getPromise().then(result3 => [result1, result2, result3])
      )
    )
  }
}

const createFn = fn =>
  function(deferred) {
    fn().then(() => deferred.resolve())
  }

suite
  .add({
    name: 'AsyncAwait PromiseResolve',
    defer: true,
    fn: createFn(createAsyncAwait(PromiseResolve))
  })
  .add({
    name: 'AsyncAwait BluebirdResolve',
    defer: true,
    fn: createFn(createAsyncAwait(BluebirdResolve))
  })
  .add({
    name: 'AsyncAwait PromiseSync',
    defer: true,
    fn: createFn(createAsyncAwait(PromiseSync))
  })
  .add({
    name: 'AsyncAwait BluebirdSync',
    defer: true,
    fn: createFn(createAsyncAwait(BluebirdSync))
  })
  .add({
    name: 'AsyncAwait PromiseAsync',
    defer: true,
    fn: createFn(createAsyncAwait(PromiseAsync))
  })
  .add({
    name: 'AsyncAwait BluebirdAsync',
    defer: true,
    fn: createFn(createAsyncAwait(BluebirdAsync))
  })
  .add({
    name: 'Promise PromiseResolve',
    defer: true,
    fn: createFn(createPromise(PromiseResolve))
  })
  .add({
    name: 'Promise BluebirdResolve',
    defer: true,
    fn: createFn(createPromise(BluebirdResolve))
  })
  .add({
    name: 'Promise PromiseSync',
    defer: true,
    fn: createFn(createPromise(PromiseSync))
  })
  .add({
    name: 'Promise BluebirdSync',
    defer: true,
    fn: createFn(createPromise(BluebirdSync))
  })
  .add({
    name: 'Promise PromiseAsync',
    defer: true,
    fn: createFn(createPromise(PromiseAsync))
  })
  .add({
    name: 'Promise BluebirdAsync',
    defer: true,
    fn: createFn(createPromise(BluebirdAsync))
  })
  .on('cycle', function(event) {
    console.log(String(event.target))
  })
  .on('complete', function() {
    console.log('Fastest is ' + this.filter('fastest').map('name'))
  })

suite.run({
  async: true,
  defer: true
})
