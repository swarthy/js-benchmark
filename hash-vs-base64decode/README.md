```shell
alex@alex-laptop  ~/work/js-benchmark/hash-vs-base64decode  ↱ master  date && node -e "console.log(process.versions)" && node index.js
Пн 13 янв 2025 15:57:53 +05
{
  node: '22.12.0',
  acorn: '8.14.0',
  ada: '2.9.2',
  amaro: '0.2.0',
  ares: '1.34.3',
  brotli: '1.1.0',
  cjs_module_lexer: '1.4.1',
  cldr: '46.0',
  icu: '76.1',
  llhttp: '9.2.1',
  modules: '127',
  napi: '9',
  nbytes: '0.1.1',
  ncrypto: '0.0.1',
  nghttp2: '1.64.0',
  nghttp3: '0.7.0',
  ngtcp2: '1.3.0',
  openssl: '3.0.15+quic',
  simdjson: '3.10.0',
  simdutf: '5.6.1',
  sqlite: '3.47.0',
  tz: '2024b',
  undici: '6.21.0',
  unicode: '16.0',
  uv: '1.49.1',
  uvwasi: '0.0.21',
  v8: '12.4.254.21-node.21',
  zlib: '1.3.0.1-motley-71660e1'
}
hash x 695,060 ops/sec ±1.74% (92 runs sampled)
decode custom x 772,092 ops/sec ±0.77% (84 runs sampled)
decode jwt x 261,968 ops/sec ±0.32% (94 runs sampled)
hash-vs-decodeBase64 Fastest is decode custom
```