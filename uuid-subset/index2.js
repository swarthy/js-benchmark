const crypto = require('crypto');
const Benchmark = require('benchmark');

// Число подмножеств
const N = 6;

// Генерация 10к UUID
const elements = Array.from({ length: 10000 }, () => ({
  id: crypto.randomUUID()
}));

// Вариант 1: Регулярное выражение
function getSubsetIdRegex(uuid) {
  const uuidClean = uuid.replace(/-/g, '');
  const value = BigInt(`0x${uuidClean}`);
  return Number(value % BigInt(N));
}

// Вариант 2: Slice
function getSubsetIdSlice(uuid) {
  const uuidClean =
    uuid.slice(0, 8) +
    uuid.slice(9, 13) +
    uuid.slice(14, 18) +
    uuid.slice(19, 23) +
    uuid.slice(24);
  const value = BigInt(`0x${uuidClean}`);
  return Number(value % BigInt(N));
}

// Вариант 3: Split/Join
function getSubsetIdSplitJoin(uuid) {
  const uuidClean = uuid.split('-').join('');
  const value = BigInt(`0x${uuidClean}`);
  return Number(value % BigInt(N));
}

// Вариант 4: Ручная сборка
function getSubsetIdManual(uuid) {
  let uuidClean = '';
  for (let i = 0; i < uuid.length; i++) {
    if (uuid[i] !== '-') {
      uuidClean += uuid[i];
    }
  }
  const value = BigInt(`0x${uuidClean}`);
  return Number(value % BigInt(N));
}

function getSubsetIdManual2(uuid) {
  const s = uuid;
  return (
    parseInt(
      s[0] +
        s[1] +
        s[2] +
        s[3] +
        s[4] +
        s[5] +
        s[6] +
        s[7] +
        s[9] +
        s[10] +
        s[11] +
        s[12] +
        s[14] +
        s[15] +
        s[16] +
        s[17],
      16
    ) % N
  );
}

// Проверка распределения (только для Regex, чтобы убедиться, что равномерность сохраняется)
const stats = new Array(N).fill(0);
elements.forEach((element) => stats[getSubsetIdRegex(element.id)]++);
console.log(`String BigInt (Regex) distribution (N=${N}):`, stats);

// Бенчмарк
const suite = new Benchmark.Suite();
suite
  .add('Regex', () => {
    elements.forEach((element) => getSubsetIdRegex(element.id));
  })
  .add('Slice', () => {
    elements.forEach((element) => getSubsetIdSlice(element.id));
  })
  .add('Split/Join', () => {
    elements.forEach((element) => getSubsetIdSplitJoin(element.id));
  })
  .add('Manual', () => {
    elements.forEach((element) => getSubsetIdManual(element.id));
  })
  .add('Manual2', () => {
    elements.forEach((element) => getSubsetIdManual2(element.id));
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', () => {
    console.log('Fastest is ' + suite.filter('fastest').map('name'));
  })
  .run({ async: false, minSamples: 1000 });
