```bash
alex@alex-desktop:~/work/js-benchmark/return-await (master) $ node -v
v16.15.0
alex@alex-desktop:~/work/js-benchmark/return-await (master) $ date
Вт 17 мая 2022 15:35:12 +05
alex@alex-desktop:~/work/js-benchmark/return-await (master) $ node index.js
return Promise x 15,429,796 ops/sec ±1.49% (86 runs sampled)
return await Promise x 7,188,368 ops/sec ±0.43% (88 runs sampled)
return async x 17,003,190 ops/sec ±1.07% (84 runs sampled)
return await async x 7,321,634 ops/sec ±0.61% (88 runs sampled)
return await sync x 7,647,302 ops/sec ±0.98% (86 runs sampled)
Fastest is return async
```
