```bash
[alex@alex-desktop await-promise-or-value]$ node -v
v22.14.0
[alex@alex-desktop await-promise-or-value]$ date
Пн 10 мар 2025 21:06:52 +05
[alex@alex-desktop await-promise-or-value]$ node index.js
checkIsPromise x 171,554 ops/sec ±0.56% (86 runs sampled)
alwaysResolve x 123,687 ops/sec ±0.71% (91 runs sampled)
Fastest is checkIsPromise
```
