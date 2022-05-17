```bash
alex@alex-desktop:~/work/js-benchmark/return-await (master) $ node -v
v16.15.0
alex@alex-desktop:~/work/js-benchmark/return-await (master) $ date
Вт 17 мая 2022 15:35:12 +05
alex@alex-desktop:~/work/js-benchmark/return-await (master) $ node index.js
return Promise x 15,023,311 ops/sec ±1.71% (82 runs sampled)
return await Promise x 7,171,761 ops/sec ±0.40% (88 runs sampled)
return async x 16,550,292 ops/sec ±1.76% (84 runs sampled)
return await async x 7,242,971 ops/sec ±0.98% (86 runs sampled)
Fastest is return async
```
