const Benchmark = require('benchmark')

const DATA_SOURCE = {
  id: 1,
  method: 'get',
  url: 'url',
  headers: {
    header1: 'value1',
    header2: 'value2'
  },
  remoteAddress: '127.0.0.1',
  remotePort: 8090
}

function getDataSource() {
  return {
    id: 1,
    method: 'get',
    url: 'url',
    headers: {
      header1: 'value1',
      header2: 'value2'
    },
    remoteAddress: '127.0.0.1',
    remotePort: 8090
  }
}

function objectCreateTest() {
  var pinoReqProto = Object.create(
    {},
    {
      id: {
        enumerable: true,
        writable: true,
        value: ''
      },
      method: {
        enumerable: true,
        writable: true,
        value: ''
      },
      url: {
        enumerable: true,
        writable: true,
        value: ''
      },
      headers: {
        enumerable: true,
        writable: true,
        value: {}
      },
      remoteAddress: {
        enumerable: true,
        writable: true,
        value: ''
      },
      remotePort: {
        enumerable: true,
        writable: true,
        value: ''
      }
    }
  )

  return function() {
    // const DATA_SOURCE = getDataSource()
    const req = Object.create(pinoReqProto)
    req.id = DATA_SOURCE.id
    req.method = DATA_SOURCE.method
    req.url = DATA_SOURCE.url
    req.headers = DATA_SOURCE.headers
    req.remoteAddress = DATA_SOURCE.remoteAddress
    req.remotePort = DATA_SOURCE.remotePort
  }
}

function pojoTest() {
  return function() {
    // const DATA_SOURCE = getDataSource()
    return {
      id: DATA_SOURCE.id,
      method: DATA_SOURCE.method,
      url: DATA_SOURCE.url,
      headers: DATA_SOURCE.headers,
      remoteAddress: DATA_SOURCE.remoteAddress,
      remotePort: DATA_SOURCE.remotePort
    }
  }
}

const suite = new Benchmark.Suite('object')

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

suite
  .add('Object.create', objectCreateTest())
  .add('POJO', pojoTest())
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()
