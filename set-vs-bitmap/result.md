```shell
[alex@alex-desktop set-vs-bitmap]$ node -v
v22.16.0
[alex@alex-desktop set-vs-bitmap]$ date
Ср 18 июн 2025 17:49:17 +05
[alex@alex-desktop set-vs-bitmap]$ node index.js
String Set#has x 146,131,795 ops/sec ±3.49% (80 runs sampled)
String Bitmask#has x 161,849,426 ops/sec ±3.12% (89 runs sampled)
Number Set#has x 143,916,583 ops/sec ±3.49% (82 runs sampled)
Number Bitmask#has x 164,512,809 ops/sec ±2.97% (92 runs sampled)
Fastest is Number Bitmask#has,String Bitmask#has
```