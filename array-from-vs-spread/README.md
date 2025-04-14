```shell
$ date && node -e "console.log(process.versions)" && node index.js
Пн 14 апр 2025 13:18:25 +05
{
  node: '22.14.0',
  acorn: '8.14.0',
  ada: '2.9.2',
  amaro: '0.3.0',
  ares: '1.34.4',
  brotli: '1.1.0',
  cjs_module_lexer: '1.4.1',
  cldr: '46.0',
  icu: '76.1',
  llhttp: '9.2.1',
  modules: '127',
  napi: '10',
  nbytes: '0.1.1',
  ncrypto: '0.0.1',
  nghttp2: '1.64.0',
  openssl: '3.5.0',
  simdjson: '3.10.1',
  simdutf: '6.0.3',
  sqlite: '3.47.2',
  tz: '2024b',
  undici: '6.21.1',
  unicode: '16.0',
  uv: '1.50.0',
  uvwasi: '0.0.21',
  v8: '12.4.254.21-node.22',
  zlib: '1.3.1'
}
array.from x 641,651 ops/sec ±0.76% (94 runs sampled)
spread x 649,222 ops/sec ±0.57% (93 runs sampled)
array.from-vs-spread n=1000 Fastest is spread
array.fromWithMap x 68,321 ops/sec ±0.38% (96 runs sampled)
spreadWithMap x 344,489 ops/sec ±0.59% (92 runs sampled)
array.from-vs-spread with MAP n=1000 Fastest is spreadWithMap
array.from x 80,928 ops/sec ±0.45% (98 runs sampled)
spread x 80,548 ops/sec ±0.48% (94 runs sampled)
array.from-vs-spread n=10000 Fastest is array.from,spread
array.fromWithMap x 7,745 ops/sec ±0.42% (99 runs sampled)
spreadWithMap x 42,750 ops/sec ±0.51% (99 runs sampled)
array.from-vs-spread with MAP n=10000 Fastest is spreadWithMap
array.from x 2,883 ops/sec ±0.58% (94 runs sampled)
spread x 2,912 ops/sec ±0.60% (95 runs sampled)
array.from-vs-spread n=100000 Fastest is spread
array.fromWithMap x 475 ops/sec ±0.87% (88 runs sampled)
spreadWithMap x 1,462 ops/sec ±0.66% (95 runs sampled)
array.from-vs-spread with MAP n=100000 Fastest is spreadWithMap
array.from x 486 ops/sec ±0.63% (93 runs sampled)
spread x 485 ops/sec ±0.58% (89 runs sampled)
array.from-vs-spread n=1000000 Fastest is array.from,spread
array.fromWithMap x 51.77 ops/sec ±1.38% (68 runs sampled)
spreadWithMap x 231 ops/sec ±1.02% (86 runs sampled)
array.from-vs-spread with MAP n=1000000 Fastest is spreadWithMap
```