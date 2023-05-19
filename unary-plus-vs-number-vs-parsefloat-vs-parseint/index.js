const Benchmark = require('benchmark');

class Context {
  constructor(data) {
    this._data = data;
  }
  extend(data) {
    return new Context(Object.assign(data, this._data));
  }
  assign(target) {
    return Object.assign(target, this._data);
  }
}

const N = 10000;
const values = new Array(N)
  .fill(0)
  .map((z, i) =>
    i % 2 === 0 ? Math.random() * 1000 : Math.round(Math.random() * 1000)
  );

function unaryPlusTest() {
  return function () {
    const results = [];
    for (const value of values) {
      results.push(+value);
    }
    return results;
  };
}

function numberConstructorTest() {
  return function () {
    const results = [];
    for (const value of values) {
      results.push(Number(value));
    }
    return results;
  };
}

function parseFloatTest() {
  return function () {
    const results = [];
    for (const value of values) {
      results.push(Number.parseFloat(value));
    }
    return results;
  };
}

function parseIntTest() {
  return function () {
    const results = [];
    for (const value of values) {
      results.push(Number.parseInt(value, 10));
    }
    return results;
  };
}

const suite = new Benchmark.Suite('object');

function onCycle(event) {
  console.log(String(event.target));
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'));
}

suite
  .add('unary +', unaryPlusTest())
  .add('numberConstructor', numberConstructorTest())
  .add('parseFloatTest', parseFloatTest())
  .add('parseIntTest', parseIntTest())
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run();
