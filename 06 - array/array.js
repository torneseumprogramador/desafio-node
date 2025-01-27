// Indice de array
// 0  1  2  3
[  1, 2, 3, 4  ];


var a = [  1, 2, 3, 4  ];
console.log(a[0]) // 1
console.log(a[2]) // 3


// Adiciona um ou mais elementos ao final do array.
array = [1, '3', true, 7.9]
array.push(8)
console.log(array)


// Remove o último elemento do array e o retorna.
var numeros = [1, 2, 3];
var removido = numeros.pop();
console.log(removido); // 3
console.log(numeros); // [1, 2]


// Adiciona um ou mais elementos ao início do array.
var numeros = [2, 3];
numeros.unshift(0, 1);
console.log(numeros); // [0, 1, 2, 3]


// Remove o primeiro elemento do array e o retorna.
var numeros = [1, 2, 3];
var removido = numeros.shift();
console.log(removido); // 1
console.log(numeros); // [2, 3]


// Adiciona, remove ou substitui elementos no array.
var numeros = [1, 2, 3, 4];
numeros.splice(1, 2); // Remove 2 elementos a partir do índice 1
console.log(numeros); // [1, 4]


// Retorna uma cópia de uma parte do array (não modifica o original).
var numeros = [1, 2, 3, 4];
var parte = numeros.slice(1, 3); // Retorna elementos do índice 1 ao 2
console.log(parte); // [2, 3]
console.log(numeros); // [1, 2, 3, 4]


//Concatena dois ou mais arrays e retorna um novo.
var numeros1 = [1, 2];
var numeros2 = [3, 4];
var todos = numeros1.concat(numeros2);
console.log(todos); // [1, 2, 3, 4]


// Retorna o índice da primeira ocorrência de um elemento (ou -1 se não encontrado).
var frutas = ["maçã", "banana", "uva"];
console.log(frutas.indexOf("uva")); // 2
console.log(frutas.indexOf("laranja")); // -1


// Verifica se um elemento está presente no array.
var frutas = ["maçã", "banana", "uva"];
console.log(frutas.includes("banana")); // true
console.log(frutas.includes("laranja")); // false



// Retorna o primeiro elemento que satisfaz uma condição.
var numeros = [1, 2, 3, 4];
var encontrado = numeros.find((numero) => numero > 2);
console.log(encontrado); // 3


// Retorna todos os elementos que satisfaz uma condição.
var numeros = [1, 2, 3, 4];
var encontrado = numeros.filter((numero) => numero > 2);
console.log(encontrado); // [ 3, 4 ]


// Retorna o primeiro elemento que satisfaz uma condição.
var pessoas = [
    {id: 1, nome: "Leandro"}, 
    {id: 2, nome: "Graziela"}
];
var encontrado = pessoas.find((pessoa) => pessoa.id === 1);
console.log(encontrado); // {id: 1, nome: "Leandro"}


// Retorna todos os elementos que satisfaz uma condição.
var pessoas = [
    {id: 1, nome: "Leandro"}, 
    {id: 2, nome: "Graziela"}
];
var encontrado = pessoas.filter((pessoa) => pessoa.nome.includes("e"));
console.log(encontrado); // [ { id: 1, nome: 'Leandro' }, { id: 2, nome: 'Graziela' } ]


// Retorna o índice do primeiro elemento que satisfaz uma condição.
var numeros = [1, 2, 3, 4];
var indice = numeros.findIndex((numero) => numero > 2);
console.log(indice); // 2


// Cria um novo array aplicando uma função a cada elemento.
var numeros = [1, 2, 3];
var dobrados = numeros.map((numero) => numero * 2);
console.log(dobrados); // [2, 4, 6]

var pessoas = [
    {id: 1, nome: "Leandro"}, 
    {id: 2, nome: "Graziela"}
];
var encontrado = pessoas.map((pessoa) => `Nome: ${pessoa.nome}`);
console.log(encontrado); // [ 'Nome: Leandro', 'Nome: Graziela' ]


// Reduz o array a um único valor, acumulando os resultados.
var numeros = [1, 2, 3, 4];
var soma = numeros.reduce((acumulador, numero) => acumulador + numero, 0);
console.log(soma); // 10

var pessoas = [
    {id: 1, nome: "Leandro", valor_total: 300}, 
    {id: 2, nome: "Graziela", valor_total: 250}
];
var totalDaConta = pessoas.reduce((acumulador, pessoa) => acumulador + pessoa.valor_total, 0);
console.log(totalDaConta); // 550


// Ordena os elementos do array (por padrão, como strings).
var numeros = [3, 1, 4, 2];
numeros.sort();
console.log(numeros); // [1, 2, 3, 4] (ordem alfabética)

var numeros = [3, 1, 4, 2];
numeros.sort((a, b) => a - b); // Ordem crescente
console.log(numeros); // [1, 2, 3, 4]

var numeros = [3, 1, 4, 2];
numeros.sort((a, b) => b - a); // Ordem decrescente
console.log(numeros); // [4, 3, 2, 1]

var pessoas = [
    {id: 1, nome: "Leandro", valor_total: 300}, 
    {id: 2, nome: "Graziela", valor_total: 250}
];
pessoas.sort((p1, p2) => p2.id - p1.id); // Ordem decrescente
console.log(pessoas); // [ { id: 2, nome: 'Graziela', valor_total: 250 }, { id: 1, nome: 'Leandro', valor_total: 300 } ]


// Inverte a ordem dos elementos do array.
var numeros = [1, 2, 3];
numeros.reverse();
console.log(numeros); // [3, 2, 1]

var numeros = [5, 1, 3, 0, 10];
numeros.reverse();
console.log(numeros); // [ 10, 0, 3, 1, 5 ]

console.log("aula de node".split("").reverse().join(""));


// Transforma em array de acordo com a string passada
console.log("aula de node".split(" ")); // [ 'aula', 'de', 'node' ]


// Junta o array de acordo com a string passada e vira uma unica string
console.log( [ 'aula', 'de', 'node' ].join("-") ) // 'aula-de-node'

// Verifica se todos os elementos do array satisfazem uma condição.
var numeros = [2, 4, 6];
var todosPares = numeros.every((numero) => numero % 2 === 0); // "numero % 2 === 0)" verifica se o resto da divisão é iqual a 0
console.log(todosPares); // true
