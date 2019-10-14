```bash
alex@alex-workstantion:~/work/benchmark/best-string-replace$ (master) date && node -e "console.log(process.versions)" && node index.js 
Пн окт 14 15:13:04 +05 2019
{
  node: '12.12.0',
  v8: '7.7.299.13-node.12',
  uv: '1.32.0',
  zlib: '1.2.11',
  brotli: '1.0.7',
  ares: '1.15.0',
  modules: '72',
  nghttp2: '1.39.2',
  napi: '5',
  llhttp: '1.1.4',
  http_parser: '2.8.0',
  openssl: '1.1.1d',
  cldr: '35.1',
  icu: '64.2',
  tz: '2019a',
  unicode: '12.1'
}
split().join() x 539,958 ops/sec ±0.87% (92 runs sampled)
replace(//g,) x 688,487 ops/sec ±0.59% (90 runs sampled)
loop1 x 393,835 ops/sec ±0.58% (89 runs sampled)
loop2 x 811,718 ops/sec ±0.54% (86 runs sampled)
best-string-replace Fastest is loop2
```
