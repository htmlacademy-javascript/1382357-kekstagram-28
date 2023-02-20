function checkingTheLength (input) {
  if (input.length >= 15) {
    return true;
  }
  return false;
}

// console.log(checkingTheLength('I would like to go shopping'));
// console.log(checkingTheLength('Hello'));
// console.log(checkingTheLength('Me and you will'));

function checkingPalindrome (string) {
  return string.toLowerCase().replace(/\s/g,'').split('').reverse().join('') === string.toLowerCase().replace(/\s/g,'');
}

// console.log(checkingPalindrome('топот'));
// console.log(checkingPalindrome('ДовОд'));
// console.log(checkingPalindrome('Кекс'));
// console.log(checkingPalindrome('Лёша на полке клопа нашёл '));


function changingStringToNumber (string) {
  let newString = '';
  for (let i = 0; i <= string.length; i++) {
    if (string[i] !== isNaN) {
      newString = string.replace(/\D/g, '');
      if (newString === '') {
        return NaN;
      } return newString;
    }
  }
}

// console.log(changingStringToNumber('2023 год'));
// console.log(changingStringToNumber('ECMAScript 2022'));
// console.log(changingStringToNumber('1 кефир, 0.5 батона'));
// console.log(changingStringToNumber('а я томат'));

function addToString (string, minLength, addSymbol) {
  if(string.length < minLength) {
    let addLength = minLength - string.length;
    let newString = '';
    if(addSymbol.length <= addLength) {
      if(addSymbol.length > 1) {
        newString = addSymbol.slice(0, (addLength - addSymbol.length)) + addSymbol + string;
        return newString;
      }
      for(let i = 0; i < addLength; i++) {
        newString += addSymbol;
      }
      return newString + string;
    } else if (addSymbol.length > addLength) {
      newString = addSymbol.slice(0, addLength);
      return newString + string;
    }
  }
  return string;
}

// console.log(addToString('1', 2, '0'));
// console.log(addToString('1', 4, '0'));
// console.log(addToString('q', 4, 'werty'));
// console.log(addToString('q', 4, 'we'));
// console.log(addToString('qwerty', 4, '0'));
