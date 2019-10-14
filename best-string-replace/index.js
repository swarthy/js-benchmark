const Benchmark = require('benchmark')

const baseStr =
  'http://site.com/some/path-with/differentSubPaths/and_random_2384917309412390478_params/with?random=query&campaignId=%7Bcampaign_id%7D&ad_groupId=%7Badgroup_id%7D&criterion_id=%7Bcriterion_id%7D&string=values&and=some&encoded&items=%7Bkeyword_id%7D'

function testSplitJoin() {
  let str = baseStr
  return str
    .split('%7B')
    .join('{')
    .split('%7D')
    .join('}')
}

const re1 = /%7B/g
const re2 = /%7D/g

function testReplaceRegEx() {
  let str = baseStr
  return str.replace(re1, '{').replace(re2, '}')
}

function loopReplace(str, searchStr, replaceStr) {
  let index = 0
  while ((index = str.indexOf(searchStr, index)) > -1) {
    str = str.substring(0, index) + replaceStr + str.substr(index + 1)
  }
  return str
}

function testLoop() {
  let str = baseStr
  return loopReplace(loopReplace(str, '%7B', '{'), '%7D', '}')
}

const suite = new Benchmark.Suite('best-string-replace')

function onCycle(event) {
  console.log(String(event.target))
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'))
}

// testSplitJoin()
// testReplaceRegEx()
// testLoop()

suite
  .add('split().join()', testSplitJoin)
  .add('replace(//g,)', testReplaceRegEx)
  .add('loop', testLoop)
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run()
