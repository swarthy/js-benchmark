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

function arrayFromWithMap(map) {
  return Array.from(map.keys(), (i) => i * 2);
}

function spread(map) {
  return [...map.keys()];
}

function spreadWithMap(map) {
  return [...map.keys()].map((i) => i * 2);
}

function createTestArrayFrom(map) {
  return () => arrayFrom(map);
}

function createTestArrayFromWithMap(map) {
  return () => arrayFromWithMap(map);
}

function createTestSpread(map) {
  return () => spread(map);
}

function createTestSpreadWithMap(map) {
  return () => spreadWithMap(map);
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
  map.keys();

  const suite = new Benchmark.Suite(`array.from-vs-spread n=${n}`);
  suite
    .add('array.from', createTestArrayFrom(map))
    .add('spread', createTestSpread(map))
    .on('cycle', onCycle)
    .on('complete', onComplete);
  suites.push(suite);

  const suiteWithMap = new Benchmark.Suite(
    `array.from-vs-spread with MAP n=${n}`
  );
  suiteWithMap
    .add('array.fromWithMap', createTestArrayFromWithMap(map))
    .add('spreadWithMap', createTestSpreadWithMap(map))
    .on('cycle', onCycle)
    .on('complete', onComplete);
  suites.push(suiteWithMap);
}

for (const suite of suites) {
  suite.run();
}
