```bash
alex@alex-workstation:~/work/benchmark/array-splice-insert-vs-set-by-index$ (master) date && node -e "console.log(process.versions)" && node index.js
Пт 17 сен 2021 17:19:50 +05
{
  node: '16.9.1',
  v8: '9.3.345.16-node.12',
  uv: '1.42.0',
  zlib: '1.2.11',
  brotli: '1.0.9',
  ares: '1.17.2',
  modules: '93',
  nghttp2: '1.42.0',
  napi: '8',
  llhttp: '6.0.2',
  openssl: '1.1.1l+quic',
  cldr: '39.0',
  icu: '69.1',
  tz: '2021a',
  unicode: '13.0',
  ngtcp2: '0.1.0-DEV',
  nghttp3: '0.1.0-DEV'
}
splice-insert x 6,887,869 ops/sec ±1.95% (83 runs sampled)
set-by-index x 23,820,589 ops/sec ±0.96% (93 runs sampled)
Test suite Fastest is set-by-index
```
