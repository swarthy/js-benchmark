alex@alex-laptop  ~/work/js-benchmark/array-extend   master  date && node -e "console.log(process.versions)" && node index.js dev
Ср 08 мар 2023 15:56:15 +05
{
node: '16.18.1',
v8: '9.4.146.26-node.22',
uv: '1.43.0',
zlib: '1.2.11',
brotli: '1.0.9',
ares: '1.18.1',
modules: '93',
nghttp2: '1.47.0',
napi: '8',
llhttp: '6.0.10',
openssl: '1.1.1q+quic',
cldr: '41.0',
icu: '71.1',
tz: '2022b',
unicode: '14.0',
ngtcp2: '0.8.1',
nghttp3: '0.7.0'
}
native-array x 4,149 ops/sec ±0.67% (95 runs sampled)
my-array x 2,272 ops/sec ±0.19% (98 runs sampled)
Test suite Fastest is native-array
