```bash
alex@alex-laptop:~/work/js-benchmark/return-await-2 (master) $ node -v
v16.16.0
alex@alex-laptop:~/work/js-benchmark/return-await-2 (master) $ date
Пн 18 июл 2022 19:01:32 MSK
alex@alex-laptop:~/work/js-benchmark/return-await-2 (master) $ node index.js 
return Promise x 908,602 ops/sec ±0.46% (87 runs sampled)
return await Promise x 852,052 ops/sec ±0.47% (90 runs sampled)
return async x 850,221 ops/sec ±0.44% (85 runs sampled)
return await async x 802,554 ops/sec ±0.29% (89 runs sampled)
return await sync x 806,228 ops/sec ±0.27% (90 runs sampled)
Fastest is return Promise
```
