const Benchmark = require('benchmark');
const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');

// fake token
const token =
  'eyJhbGciOiJFUzI1NiIsImtpZCI6IjIwMjQwNTA2djEiLCJ0eXAiOiJKV1QifQ.eyJlbnQiOjEsImV4cCI6MTczMzk4MTA0NiwiaWQiOiIwMDAwMDAwMC0xMTExLTQyMjItMzMzMy00NDQ0NDQ0NDQ0NDQiLCJpaWQiOjEyMzQ1Njc4LCJvaWQiOjEyMzQ1NjcsInMiOjY0LCJzaWQiOiIwMDAwMDAwMC0xMTExLTQyMjItMzMzMy00NDQ0NDQ0NDQ0NDQiLCJ0IjpmYWxzZSwidWlkIjoxMjM0NTY3OH0.k3N3R7c9KW5kCXEIkzG7Hki2KPLGYYRhmGtO5_Qdw9m0W5LYtOk8egT4pGbXqglIKEWxLnUhyzLRylhnDVnpPQ';

function hash(token) {
  return crypto.createHash('sha256').update(token).digest('hex');
}

function decodeSup(token) {
  const payloadEncoded = token.split('.')[1];
  const payloadDecoded = Buffer.from(payloadEncoded, 'base64').toString(
    'utf-8'
  );
  const payload = JSON.parse(payloadDecoded);
  return payload.sid;
}

function decodeJwt(token) {
  const payload = jwt.decode(token, { json: true });
  return payload.sid;
}

function testHash() {
  hash(token);
}

function testDecodeCustom() {
  decodeSup(token);
}

function testDecodeJwt() {
  decodeJwt(token);
}

const suite = new Benchmark.Suite('hash-vs-decodeBase64');

function onCycle(event) {
  console.log(String(event.target));
}

function onComplete() {
  console.log(this.name, 'Fastest is ' + this.filter('fastest').map('name'));
}

// console.log(testHash());
// console.log(testDecode());

suite
  .add('hash', testHash)
  .add('decode custom', testDecodeCustom)
  .add('decode jwt', testDecodeJwt)
  .on('cycle', onCycle)
  .on('complete', onComplete)
  .run();
