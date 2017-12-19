const Benchmark = require('benchmark')
const omit = require('lodash/omit')
const random = require('lodash/random')
const stats = require('stats-array')
const Uint16HashTable = require('./Uint16HashTable')
const NodeHashTable = require('hash-table')

const numSort = (a, b) => a - b

function generateItems(itemsCount, max) {
  const items = []
  for (let i = 0; i < itemsCount; i++) {
    const key = random(0, max)
    const value = random(0, max)
    items.push([key, value])
  }
  return items
}

function generateSequence(itemsCount, max) {
  const items = []
  for (let i = 0; i < itemsCount; i++) {
    items.push(random(0, max))
  }
  return items
}

function hashInteger(a, max) {
  return a % max
}

function createAndRun(itemsCount, max) {
  const items = generateItems(itemsCount, max)
  const sequence = generateSequence(itemsCount, max)

  function createObject(items) {
    return function objectHashing() {
      const hash = {}
      items.forEach(([key, value]) => {
        hash[key] = value
      })
      const newSequence = sequence.map(value => {
        const valueFromHash = hash[value]
        return valueFromHash !== undefined ? valueFromHash : value
      })
      return newSequence
    }
  }
  function createMap(items) {
    return function map() {
      const map = new Map()
      items.forEach(([key, value]) => {
        map.set(key, value)
      })
      const newSequence = sequence.map(value => {
        const valueFromMap = map.get(value)
        return valueFromMap !== undefined ? valueFromMap : value
      })
      return newSequence
    }
  }
  function createUint16HashTable(items, params = {}) {
    return function hashTable() {
      const hashTable = new Uint16HashTable(params)
      items.forEach(([key, value]) => {
        hashTable.insert(key, value)
      })
      const newSequence = sequence.map(value => {
        const valueFromHashTable = hashTable.retrieve(value)
        return valueFromHashTable !== undefined ? valueFromHashTable : value
      })
    }
  }
  function createNodeHashTable(items) {
    return function nodeHashTable() {
      const hashTable = new NodeHashTable({
        numberOfHashSlots: 7919
      })
      items.forEach(([key, value]) => {
        hashTable.insert(key, value)
      })
      const newSequence = sequence.map(value => {
        const valueFromHashTable = hashTable.search(value)
        return valueFromHashTable !== undefined ? valueFromHashTable : value
      })
    }
  }

  function onCycle(event) {
    console.log(String(event.target))
  }

  function onComplete() {
    console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
  }

  const suite = new Benchmark.Suite(`Items: ${itemsCount} max: ${max}`)
  suite
    .add('object', createObject(items))
    .add('map', createMap(items))
    .add('hashTable', createUint16HashTable(items))
    .add(
      'hashTable (modulo)',
      createUint16HashTable(items, { hashFunc: hashInteger })
    )
    .add('node-hash-table', createNodeHashTable(items))
    .on('cycle', onCycle)
    .on('complete', onComplete)
    .run()
}

const ITEMS_COUNTS = [100, 1000, 10000]
const MAX_KEYS = [100, 1000, 10000]

for (const itemsCount of ITEMS_COUNTS) {
  for (const maxKey of MAX_KEYS) {
    createAndRun(itemsCount, maxKey)
  }
}
