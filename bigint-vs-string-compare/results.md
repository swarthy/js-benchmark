```bash
alex@alex-workstation:~/work/benchmark$ (master) date
Ср 02 дек 2020 13:46:45 +05

alex@alex-workstation:~/work/benchmark$ (master) node -v
v14.15.1

alex@alex-workstation:~/work/benchmark$ (master) node bigint-vs-string-compare/case1.js
BigInt run x 146 ops/sec ±0.90% (82 runs sampled)
stringCompare run x 248 ops/sec ±1.19% (89 runs sampled)
10000 elements Fastest is stringCompare run

alex@alex-workstation:~/work/benchmark$ (master) node bigint-vs-string-compare/case2.js
BigInt run x 349 ops/sec ±2.23% (83 runs sampled)
stringCompare run x 6,471 ops/sec ±1.93% (90 runs sampled)
10000 elements Fastest is stringCompare run
```
