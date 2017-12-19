const Benchmark = require('benchmark')
const omit = require('lodash/omit')
const random = require('lodash/random')
const stats = require('stats-array')
const HashTable = require('./HashTable')

const numSort = (a, b) => a - b

function generateItems(
  itemsCount,
  alphabetSize,
  minElementCount,
  maxElementCount
) {
  const items = []
  for (let i = 0; i < itemsCount; i++) {
    const elementCount = random(minElementCount, maxElementCount)
    const item = new Uint16Array(elementCount)
    // const item = new Array(elementCount)
    for (let j = 0; j < elementCount; j++) {
      item[j] = random(0, alphabetSize)
    }
    item.sort(numSort)
    items.push(item)
  }
  return items
}

function createAndRun(
  itemsCount,
  alphabetSize,
  minElementCount,
  maxElementCount
) {
  const items = generateItems(
    itemsCount,
    alphabetSize,
    minElementCount,
    maxElementCount
  )

  function createObjectHashing(items) {
    function parseHash(str) {
      return str.split('_').map(parseFloat)
    }
    function getHash(elements) {
      return elements.join('_')
    }

    return function objectHashing() {
      const hash = {}
      items.forEach((elements, index) => {
        const key = getHash(elements)
        if (hash[key]) {
          hash[key].push(index)
        } else {
          hash[key] = [index]
        }
      })
      const result = []
      Object.keys(hash).forEach(key => {
        const elements = parseHash(key)
        const items = hash[key]
        const resultItem = {
          elements,
          items
        }
        result.push(resultItem)
      })
      return result
    }
  }
  function createCustomTable(HashTableClass, items) {
    function compareArray(arr1, arr2) {
      const len1 = arr1.length
      const len2 = arr2.length
      if (len1 !== len2) {
        return false
      }
      for (let i = 0; i < len1; i++) {
        if (arr1[i] !== arr2[i]) {
          return false
        }
      }
      return true
    }

    function hashFunc(key, max) {
      var hash = 0
      var len = key.length
      for (var i = 0; i < len; i++) {
        var int = key[i]
        hash = (hash << 5) + int
        hash = (hash & hash) % max
      }
      return hash
    }

    const LIMIT = 8

    return function hashTable() {
      const hash = new HashTableClass({
        compare: compareArray,
        hashFunc,
        limit: LIMIT
      })
      items.forEach((elements, index) => {
        const key = elements
        const arr = hash.retrieve(key)
        if (arr) {
          arr.push(index)
        } else {
          hash.insert(key, [index])
        }
      })

      const result = []
      hash.retrieveAll().forEach(([elements, items]) => {
        const resultItem = {
          elements,
          items
        }
        result.push(resultItem)
      })
      return result
    }
  }

  function onCycle(event) {
    console.log(String(event.target))
  }

  function onComplete() {
    console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
  }

  const resultItemsCount = createObjectHashing(items)().map(
    item => item.items.length
  )

  console.log(
    'Items per elements combination: Min: %d, Max: %d, Mean: %d, Standard deviation: %d',
    resultItemsCount.min(),
    resultItemsCount.max(),
    resultItemsCount.mean(),
    resultItemsCount.stdDeviation()
  )

  const suite = new Benchmark.Suite(
    `Items: ${itemsCount} Alphabet: ${alphabetSize} [${minElementCount}, ${maxElementCount}]`
  )

  suite
    .add('object hashing', createObjectHashing(items))
    .add('custom hash table', createCustomTable(HashTable, items))
    .on('cycle', onCycle)
    .on('complete', onComplete)
    .run()
}

// const ITEMS_COUNTS = [100, 1000, 10000, 50000]
// const ALPHABETS = [1, 2, 16, 256, 1024]
// const SIZES = [[1, 1], [1, 2], [2, 2], [2, 4], [4, 8], [2, 8]]

const ITEMS_COUNTS = [100, 1000]
const ALPHABETS = [1, 2, 256, 1024]
const SIZES = [[1, 1], [1, 2], [4, 8], [2, 8]]

for (const itemsCount of ITEMS_COUNTS) {
  for (const alphabetSize of ALPHABETS) {
    for (const [min, max] of SIZES) {
      createAndRun(itemsCount, alphabetSize, min, max)
    }
  }
}

// createAndRun(10000, 100, 2, 8)
// createAndRun(25000, 100, 2, 8)
// createAndRun(50000, 100, 2, 8)

// createAndRun(10000, 500, 2, 8)
// createAndRun(25000, 500, 2, 8)
// createAndRun(50000, 500, 2, 8)

// createAndRun(10000, 1000, 2, 8)
// createAndRun(25000, 1000, 2, 8)
// createAndRun(50000, 1000, 2, 8)

// createAndRun(10000, 100, 4, 8)
// createAndRun(25000, 100, 4, 8)
// createAndRun(50000, 100, 4, 8)

// createAndRun(10000, 500, 4, 8)
// createAndRun(25000, 500, 4, 8)
// createAndRun(50000, 500, 4, 8)

// createAndRun(10000, 1000, 4, 8)
// createAndRun(25000, 1000, 4, 8)
// createAndRun(50000, 1000, 4, 8)

// createAndRun(10000, 100, 6, 8)
// createAndRun(25000, 100, 6, 8)
// createAndRun(50000, 100, 6, 8)

// createAndRun(10000, 500, 6, 8)
// createAndRun(25000, 500, 6, 8)
// createAndRun(50000, 500, 6, 8)

// createAndRun(10000, 1000, 6, 8)
// createAndRun(25000, 1000, 6, 8)
// createAndRun(50000, 1000, 6, 8)

// createAndRun(10000, 4, 1, 2)
// createAndRun(25000, 4, 1, 2)
// createAndRun(50000, 4, 1, 2)

// createAndRun(10000, 10, 1, 2)
// createAndRun(25000, 10, 1, 2)
// createAndRun(50000, 10, 1, 2)

// OBJECT HASH FASTER
// createAndRun(10000, 8, 2, 8)
// createAndRun(25000, 8, 2, 8)
// createAndRun(50000, 8, 2, 8)

// createAndRun(10, 1, 1, 1)
// createAndRun(10, 2, 2, 2)
// createAndRun(10, 2, 2, 4)
// createAndRun(10, 2, 2, 8)
// createAndRun(10, 4, 2, 8)
// createAndRun(10, 4, 4, 8)
// createAndRun(10, 10, 2, 8)
// createAndRun(10, 100, 2, 8)
// createAndRun(10, 250, 2, 8)

// createAndRun(100, 1, 1, 1)
// createAndRun(100, 2, 2, 2)
// createAndRun(100, 2, 2, 4)
// createAndRun(100, 2, 2, 8)
// createAndRun(100, 4, 2, 8)
// createAndRun(100, 4, 4, 8)
// createAndRun(100, 10, 2, 8)
// createAndRun(100, 100, 2, 8)
// createAndRun(100, 250, 2, 8)

// createAndRun(1000, 1, 1, 1)
// createAndRun(1000, 2, 2, 2)
// createAndRun(1000, 2, 2, 4)
// createAndRun(1000, 2, 2, 8)
// createAndRun(1000, 4, 2, 8)
// createAndRun(1000, 4, 4, 8)
// createAndRun(1000, 10, 2, 8)
// createAndRun(1000, 100, 2, 8)
// createAndRun(1000, 250, 2, 8)
