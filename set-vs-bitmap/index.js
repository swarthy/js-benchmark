const Benchmark = require('benchmark');
const suite = new Benchmark.Suite();

// Объект для числовых значений
const Priority = {
  Low: 1, // 001
  Medium: 2, // 010
  High: 4 // 100
};

// Подход 1: Нативный Set с текстовыми значениями
const stringSet = new Set(['low', 'medium', 'high']);

// Подход 2: Битовая маска с текстовыми значениями
const stringBitMap = {
  low: 1,
  medium: 2,
  high: 4
};
let stringBitMask = 0;
['low', 'medium', 'high'].forEach(
  (element) => (stringBitMask |= stringBitMap[element])
);

// Подход 3: Нативный Set с числовыми значениями
const numberSet = new Set([Priority.Low, Priority.Medium, Priority.High]);

// Подход 4: Оптимизированная битовая маска с числовыми значениями
let numberBitMask = 0;
[Priority.Low, Priority.Medium, Priority.High].forEach(
  (element) => (numberBitMask |= element)
);

// Функции проверки
function hasStringBitMask(element) {
  return (stringBitMask & stringBitMap[element]) !== 0;
}

function hasNumberBitMask(element) {
  return (numberBitMask & element) !== 0;
}

// Создаем бенчмарк
suite
  .add('String Set#has', function () {
    stringSet.has('medium');
  })
  .add('String Bitmask#has', function () {
    hasStringBitMask('medium');
  })
  .add('Number Set#has', function () {
    numberSet.has(Priority.Medium);
  })
  .add('Number Bitmask#has', function () {
    hasNumberBitMask(Priority.Medium);
  })
  .on('cycle', function (event) {
    console.log(String(event.target));
  })
  .on('complete', function () {
    console.log('Fastest is ' + this.filter('fastest').map('name'));
  })
  .run({ async: true });
