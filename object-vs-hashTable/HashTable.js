/*
  https://gist.github.com/alexhawkins/f6329420f40e5cafa0a4
 */

function defaultCompare(a, b) {
  return a === b
}

function defaultHashFunc(key, max) {
  var hash = 0
  for (var i = 0; i < key.length; i++) {
    var letter = key[i]
    hash = (hash << 5) + letter.charCodeAt(0)
    hash = (hash & hash) % max
  }
  return hash
}

function reduceFlatten(resultArr, item) {
  resultArr.push.apply(resultArr, item)
  return resultArr
}

var HashTable = function({ limit, compare, hashFunc }) {
  this._storage = []
  this._count = 0
  this._limit = limit || 8
  this._compare = compare || defaultCompare
  this._hashFunc = hashFunc || defaultHashFunc
}

HashTable.prototype.insert = function(key, value) {
  //create an index for our storage location by passing it through our hashing function
  var index = this._hashFunc(key, this._limit)
  //retrieve the bucket at this particular index in our storage, if one exists
  //[[ [k,v], [k,v], [k,v] ] , [ [k,v], [k,v] ]  [ [k,v] ] ]
  var bucket = this._storage[index]
  //does a bucket exist or do we get undefined when trying to retrieve said index?
  if (!bucket) {
    //create the bucket
    var bucket = []
    //insert the bucket into our hashTable
    this._storage[index] = bucket
  }

  var override = false
  //now iterate through our bucket to see if there are any conflicting
  //key value pairs within our bucket. If there are any, override them.
  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i]
    if (this._compare(tuple[0], key)) {
      //overide value stored at this key
      tuple[1] = value
      override = true
    }
  }

  if (!override) {
    //create a new tuple in our bucket
    //note that this could either be the new empty bucket we created above
    //or a bucket with other tupules with keys that are different than
    //the key of the tuple we are inserting. These tupules are in the same
    //bucket because their keys all equate to the same numeric index when
    //passing through our hash function.
    bucket.push([key, value])
    this._count++
    //now that we've added our new key/val pair to our storage
    //let's check to see if we need to resize our storage
    if (this._count > this._limit * 0.75) {
      this.resize(this._limit * 2)
    }
  }
  return this
}

HashTable.prototype.remove = function(key) {
  var index = this._hashFunc(key, this._limit)
  var bucket = this._storage[index]
  if (!bucket) {
    return undefined
  }
  //iterate over the bucket
  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i]
    //check to see if key is inside bucket
    if (this._compare(tuple[0], key)) {
      //if it is, get rid of this tuple
      bucket.splice(i, 1)
      this._count--
      if (this._count < this._limit * 0.25) {
        this.resize(this._limit / 2)
      }
      return tuple[1]
    }
  }
}

HashTable.prototype.retrieve = function(key) {
  var index = this._hashFunc(key, this._limit)
  var bucket = this._storage[index]

  if (!bucket) {
    return undefined
  }

  for (var i = 0; i < bucket.length; i++) {
    var tuple = bucket[i]
    if (this._compare(tuple[0], key)) {
      return tuple[1]
    }
  }

  return undefined
}

HashTable.prototype.resize = function(newLimit) {
  var oldStorage = this._storage

  this._limit = newLimit
  this._count = 0
  this._storage = []

  oldStorage.forEach(
    function(bucket) {
      if (!bucket) {
        return
      }
      for (var i = 0; i < bucket.length; i++) {
        var tuple = bucket[i]
        this.insert(tuple[0], tuple[1])
      }
    }.bind(this)
  )
}

HashTable.prototype.retrieveAll = function() {
  return this._storage.reduce(reduceFlatten, [])
}

module.exports = HashTable
