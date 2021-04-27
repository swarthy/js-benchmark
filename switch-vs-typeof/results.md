```bash
alex@alex-workstation:~/work/benchmark/switch-vs-typeof$ (master) date
Вт 27 апр 2021 12:33:40 +05
alex@alex-workstation:~/work/benchmark/switch-vs-typeof$ (master) node -v
v14.16.1
alex@alex-workstation:~/work/benchmark/switch-vs-typeof$ (master) node index.js
parseFloat1 x 7,411 ops/sec ±1.20% (94 runs sampled)
parseFloat2 x 42,128 ops/sec ±0.10% (96 runs sampled)
object Fastest is parseFloat2
```
