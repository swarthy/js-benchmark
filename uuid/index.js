const Benchmark = require('benchmark');

const suite = new Benchmark.Suite('simple');

const { v4 } = require('uuid');
const crypto = require('crypto');

function generateLib() {
  return v4();
}

function generateNative() {
  return crypto.randomUUID();
}

function onCycle(event) {
  console.log(String(event.target));
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'));
}

suite
  .add('lib', generateLib)
  .add('native', generateNative)
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run();
