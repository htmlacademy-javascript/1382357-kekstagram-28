function checkingTheLength (input, maxLength) {
  if (input.length <= maxLength) {
    return true;
  }
  return false;
}

console.log(checkingTheLength('проверяемая строка', 20));
console.log(checkingTheLength('проверяемая строка', 18));
console.log(checkingTheLength('проверяемая строка', 10));

function checkingPalindrome (input) {
  let text = input.toLowerCase().replace(/\s/g,'').split('').reverse().join('');
  return text === input.toLowerCase().replace(/\s/g,'');
}

console.log(checkingPalindrome('топот'));
console.log(checkingPalindrome('ДовОд'));
console.log(checkingPalindrome('Кекс'));
console.log(checkingPalindrome('Лёша на полке клопа нашёл '));


function changingStringToNumber (input) {
  let newInput = '';
  if (typeof input !== Object) {
    newInput = input.replace(/\D/g, '');
    if (newInput === '') {
      return NaN;
    } return parseInt(newInput, 10);
  }
}

console.log(changingStringToNumber('2023 год'));
console.log(changingStringToNumber('ECMAScript 2022'));
console.log(changingStringToNumber('1 кефир, 0.5 батона'));
console.log(changingStringToNumber('агент 007'));
console.log(changingStringToNumber('а я томат'));

function addToString (input, minLength, addSymbol) {
  const addLength = minLength - input.length;
  if(addLength <= 0) {
    return input;
  }

  const tempSymbol = addSymbol.slice(0, addLength % addSymbol.length);
  const tempRepeat = addSymbol.repeat(addLength / addSymbol.length);
  return tempSymbol + tempRepeat + input;
}

console.log(addToString('1', 2, '0')); //01
console.log(addToString('1', 4, '0')); //0001
console.log(addToString('q', 4, 'werty')); //werq
console.log(addToString('q', 4, 'we')); //wweq
console.log(addToString('qwerty', 4, '0')); //qwerty
