
// let x = 1
// let y = 2
// const resultado = (x + y) * x
// console.log(resultado)


// novamente precisasse fazer a mesma expressão

// let a = 2
// let b = 5
// const resultado2 = (a + b) * a
// console.log(resultado2)


// parametros de entrada e retorno
function canculoExpressao(p1, p2){
    return (p1 + p2) * p1
}
console.log(canculoExpressao(1,2))
console.log(canculoExpressao(2,5))

// funcoes void = funcões sem retorno
function canculoExpressaoMostrando(p1, p2){
    console.log( canculoExpressao(p1, p2) )
}
canculoExpressaoMostrando(1,2)
canculoExpressaoMostrando(2,5)

// funcao sem parametro e que contém retorno
function mensagemPadrao(){
    return "Olá pessoal"
}



// ======= formas de escrita =====
// padrão:
function mensagemPadrao(nome){
    return "Olá seja bem vindo " + nome
}

// como variável:
const mensagemComVariavel = function(nome){
    return "Olá seja bem vindo " + nome
}

// como arrow function:
const mensagemPadraoArrow = (nome) => {
    return "Olá seja bem vindo " + nome
}

// como arrow function reduzida (funciona para quando vc tem uma linha de conteúdo na função):
const mensagemPadraoArrowResuzida = (nome) => `Olá seja bem vindo ${nome}`


// como arrow function reduzida (funciona para quando vc tem uma linha de conteúdo na função):
const mensagemPadraoArrowResuzidaSemParametro = () => `Olá seja bem vindo`

console.log(mensagemPadraoArrowResuzidaSemParametro) // passando para o console.log a declaração da função
console.log(mensagemPadraoArrowResuzidaSemParametro()) // executando a função e passando o resultado que venho no return para o console.log

// tenho uma função onde se maior que 20 não mostro o console.log
const encerradaDependendoDaCondicao = (x) => {
    if(x > 20) return 20

    console.log(`O parametro digitado foi ${x}`)

    return x * 10
}

// ===== funcao de alta ordem =====
// quando eu tenho uma função que recebe ou retorna uma função

function processNumbers(numbers, callback) {
    return numbers.map(callback);
}

const doubled = processNumbers([1, 2, 3, 4], (num) => num * 2);
console.log(doubled); // [2, 4, 6, 8]

const soma = processNumbers([1, 2, 3, 4], (num) => num + 2);
console.log(soma); // [3, 4, 5, 6]
  

function multiplier(factor) {
    return function (number) {
        return number * factor;
    };
}

const multiplyBy3 = multiplier(3);
console.log(multiplyBy3(10)); // 30
console.log(multiplyBy3(3)); // 9
console.log(multiplyBy3(2)); // 6

const multiplyBy2 = multiplier(2);
console.log(multiplyBy2(10)); // 20
console.log(multiplyBy2(3)); // 6
console.log(multiplyBy2(2)); // 4


// ===== funcao recursiva =====
// quando eu tenho uma função que recebe ou retorna uma função

const recursiva = (indexador) => {
    console.log(`Número: ${indexador}`)
    if (indexador >= 10) return
    recursiva(indexador+1)
}

recursiva(0)

// === onde posso aplicaar recursividade ====
// const crawler = async (url, page) => {
//     let clientes = await fetch(url)
//     if (clientes.length == 0) return

//     clientes.array.forEach(item => {
//         console.log(item)
//     });

//     crawler(url.replace(`page=${page}`, `page=${page+1}`), page+1)
// }

// await crawler("https://minhapai.com.br/clientes.json?page=1", 1)
