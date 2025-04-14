const Benchmark = require('benchmark');

function createMap(n) {
  return new Map(
    Array(n)
      .fill(0)
      .map((_, i) => [i, i])
  );
}

function arrayFrom(map) {
  return Array.from(map.keys());
}

function spread(map) {
  return [...map.keys()];
}

function createTestArrayFrom(map) {
  return () => arrayFrom(map);
}

function createTestSpread(map) {
  return () => spread(map);
}

function onCycle(event) {
  console.log(String(event.target));
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'));
}

// console.log(testArrayFrom());
// console.log(testSpread());

const suites = [];

for (const n of [1e3, 1e4, 1e5, 1e6]) {
  const map = createMap(n);

  const suite = new Benchmark.Suite(`array.from-vs-spread n=${n}`);
  suite
    .add('array.from', createTestArrayFrom(map))
    .add('spread', createTestSpread(map))
    .on('cycle', onCycle)
    .on('complete', onComplete);
  suites.push(suite);
}

for (const suite of suites) {
  suite.run();
}
