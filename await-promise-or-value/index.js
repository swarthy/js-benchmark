const Benchmark = require('benchmark');

const suite = new Benchmark.Suite('simple');

async function checkIsPromise(obj) {
  return 'then' in obj ? await obj : obj;
}

async function alwaysResolve(obj) {
  return await Promise.resolve(obj);
}

async function getAsyncValue(value) {
  return new Promise((resolve) => setImmediate(() => resolve(value)));
}

function createArrayWithValues(len) {
  return new Array(len)
    .fill(0)
    .map((_, index) =>
      index % 2 === 0 ? getAsyncValue({ value: 123 }) : { value: 456 }
    );
}

const createFn = (fn) => {
  const items = createArrayWithValues(100);
  return function (deferred) {
    Promise.all(items.map((item) => fn(item))).then(() => deferred.resolve());
  };
};

suite
  .add({
    name: 'checkIsPromise',
    defer: true,
    fn: createFn(checkIsPromise)
  })
  .add({
    name: 'alwaysResolve',
    defer: true,
    fn: createFn(alwaysResolve)
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
