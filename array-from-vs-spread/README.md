```shell
$  date && node -e "console.log(process.versions)" && node index.js
Пн 14 апр 2025 13:01:02 +05
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
array.from x 648,478 ops/sec ±0.50% (95 runs sampled)
spread x 655,138 ops/sec ±0.52% (99 runs sampled)
array.from-vs-spread n=1000 Fastest is spread
array.from x 81,579 ops/sec ±0.63% (92 runs sampled)
spread x 82,218 ops/sec ±0.39% (95 runs sampled)
array.from-vs-spread n=10000 Fastest is spread,array.from
array.from x 2,913 ops/sec ±0.73% (94 runs sampled)
spread x 2,896 ops/sec ±0.50% (88 runs sampled)
array.from-vs-spread n=100000 Fastest is array.from,spread
array.from x 481 ops/sec ±0.51% (89 runs sampled)
spread x 482 ops/sec ±0.56% (86 runs sampled)
array.from-vs-spread n=1000000 Fastest is spread,array.from
```