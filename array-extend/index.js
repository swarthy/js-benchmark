const Benchmark = require('benchmark');

const suite = new Benchmark.Suite('Test suite');

const N = 1e4;

function createTestNativeArray() {
  function modifyAndPush(arr, a, ...items) {
    for (const item of items) {
      if (!item.a) {
        item.a = a;
      }
    }
    arr.push(...items);
  }

  return function () {
    const array1 = [];
    for (let i = 0; i < N; i++) {
      modifyAndPush(array1, 10, { b: i });
    }
  };
}

function createTestMyArray() {
  class MyArray extends Array {
    constructor(a) {
      super();
      this.a = a;
    }

    push(...items) {
      for (const item of items) {
        if (!item.a) {
          item.a = this.a;
        }
      }
      return super.push(...items);
    }
  }

  return function () {
    const array1 = new MyArray(10);
    for (let i = 0; i < N; i++) {
      array1.push({ b: i });
    }
  };
}

function onCycle(event) {
  console.log(String(event.target));
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'));
}

suite
  .add('native-array', createTestNativeArray())
  .add('my-array', createTestMyArray())
  .on('cycle', onCycle)
  .on('complete', onComplete);

suite.run();
