const Benchmark = require('benchmark')

const CONTEXT = {
  state: {
    value: 5
  },
  a: 5
}

function controller1(ctx) {
  return ctx.state.value + ctx.a
}

function controller2(ctx, b) {
  return this.value + ctx.a
}

function rawTest() {
  return function() {
    controller1(CONTEXT)
  }
}

function callTest() {
  return function() {
    controller2.call(CONTEXT, CONTEXT)
  }
}

function bindTest() {
  const c = controller2.bind(CONTEXT)
  return function() {
    c(CONTEXT)
  }
}

const suite = new Benchmark.Suite('call-vs-closure')

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

suite
  .add('raw', rawTest())
  .add('call', callTest())
  .add('bind', bindTest())
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()
