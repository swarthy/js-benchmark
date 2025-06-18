const crypto = require('crypto');
const Benchmark = require('benchmark');

// Числа подмножеств для теста
const N_VALUES = [6, 18, 72];

// Генерация 10к UUID
const elements = Array.from({ length: 10000 }, () => ({
  id: crypto.randomUUID()
}));

// Функция 1: MD5 через crypto
function getSubsetIdMd5(uuid, N) {
  const hash = crypto.createHash('md5').update(uuid).digest('hex');
  const hashValue = BigInt(`0x${hash}`);
  return Number(hashValue % BigInt(N));
}

// Функция 2: UUID как строка через BigInt (весь UUID)
function getSubsetIdString(uuid, N) {
  const uuidClean = uuid.replace(/-/g, ''); // Все 32 символа (128 бит)
  const value = BigInt(`0x${uuidClean}`);
  return Number(value % BigInt(N));
}

// Функция 3: Бинарный UUID через Buffer (64 бита)
function getSubsetIdBinary(uuid, N) {
  const hex = uuid.replace(/-/g, '');
  const binaryUuid = Buffer.from(hex, 'hex');
  const value = binaryUuid.readBigUInt64BE(0); // Первые 64 бита
  return Number(value % BigInt(N));
}

// Тестирование для каждого N
N_VALUES.forEach((N) => {
  console.log(`\n=== Testing for N=${N} ===`);

  // Проверка распределения
  const statsMd5 = new Array(N).fill(0);
  const statsString = new Array(N).fill(0);
  const statsBinary = new Array(N).fill(0);
  elements.forEach((element) => {
    statsMd5[getSubsetIdMd5(element.id, N)]++;
    statsString[getSubsetIdString(element.id, N)]++;
    statsBinary[getSubsetIdBinary(element.id, N)]++;
  });
  console.log(`MD5 distribution (N=${N}):`, statsMd5);
  console.log(`String BigInt distribution (N=${N}):`, statsString);
  console.log(`Binary UUID distribution (N=${N}):`, statsBinary);

  // Бенчмарк
  const suite = new Benchmark.Suite(`N=${N}`);
  suite
    .add(`MD5 (N=${N})`, () => {
      elements.forEach((element) => getSubsetIdMd5(element.id, N));
    })
    .add(`String BigInt (N=${N})`, () => {
      elements.forEach((element) => getSubsetIdString(element.id, N));
    })
    .add(`Binary UUID (N=${N})`, () => {
      elements.forEach((element) => getSubsetIdBinary(element.id, N));
    })
    .on('cycle', (event) => {
      console.log(String(event.target));
    })
    .on('complete', () => {
      console.log(
        `Fastest for N=${N} is ` + suite.filter('fastest').map('name')
      );
    })
    .run({ minSamples: 1000 }); // Синхронный режим
});
