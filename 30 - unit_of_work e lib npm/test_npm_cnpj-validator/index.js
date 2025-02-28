const { isValidCNPJ } = require('cnpj-validator-didox');

console.log(isValidCNPJ('11.222.333/0001-81')); // false
console.log(isValidCNPJ('14.152.609/0001-0`0')); // true (exemplo válido)
