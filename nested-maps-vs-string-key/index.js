const Benchmark = require('benchmark');
const random = require('lodash/random');

function generateItem(keysCount) {
  return {
    keys: new Array(keysCount)
      .fill(undefined)
      .map(() => `${random(10000, 99999)}`),
    value: random(10000, 99999)
  };
}

function generateItems(itemsCount, keysCount) {
  return new Array(itemsCount)
    .fill(undefined)
    .map(() => generateItem(keysCount));
}

function createAndRun(itemsCount, keysCount) {
  const items = generateItems(itemsCount, keysCount);

  function createNestedMaps(items) {
    return function nestedMapsTest() {
      const mapRoot = new Map();

      for (const item of items) {
        let currentMap = mapRoot;
        let lastMap;
        for (const key of item.keys.slice(0, -1)) {
          lastMap = currentMap.get(key);
          if (!lastMap) {
            lastMap = new Map();
            currentMap.set(key, lastMap);
          }
        }
        lastMap.set(item.keys[item.keys.length - 1], item.value);
      }

      // console.log('Map:', mapRoot);
    };
  }

  function createStringKey(items) {
    return function stringKeyTest() {
      const mapRoot = new Map();

      for (const item of items) {
        const strKey = item.keys.join('_');
        mapRoot.set(strKey, item.value);
      }

      // console.log('Map:', mapRoot);
    };
  }

  function onCycle(event) {
    console.log(String(event.target));
  }

  function onComplete() {
    console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'));
  }

  const suite = new Benchmark.Suite(
    `Items: ${itemsCount} keysCount: ${keysCount}`
  );
  suite
    .add('nested-map', createNestedMaps(items))
    .add('string-key', createStringKey(items))
    .on('cycle', onCycle)
    .on('complete', onComplete)
    .run();
}

const ITEMS_COUNTS = [100, 1000, 10000];
const KEYS_COUNT = [4, 5, 10];

for (const itemsCount of ITEMS_COUNTS) {
  for (const maxKey of KEYS_COUNT) {
    createAndRun(itemsCount, maxKey);
  }
}
