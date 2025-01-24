// while = enquanto
// for = para
// forech = para cada
// funcao_recursiva

// faça um programa que mostre na tela o numero de 0 a 2000

// tipo = "1"
// i = 0;
// while (i <= 2000 && tipo == "teste"){ // sempre que eu não souber o inicio e fim
//     console.log(i);
//     // i = i + 1
//     // i += 1
//     tipo = "teste"
//     i++
// }
// console.log("================")

// i = 1
// while (true){ // sempre que eu não souber o inicio e fim
//     console.log(i);
//     i++

//     if (i > 100) break
// }
// console.log("================")

// i = 1
// while (true){ // sempre que eu não souber o inicio e fim

//     if( (i >= 3 && i <= 10) || (i >= 20 && i <= 50) ){
//         i++
//         continue;
//     }

//     console.log(i);
//     i++

//     if (i > 100) break
// }
// console.log("================")

// for(var i = 0; i<=2000; i++){ // sempre que eu sei o inicio e fim
//     console.log(i);
// }
// console.log("================")

// lista = [2,3,4,5,6,7,8]
// lista.forEach(element => {
//     if(element == 4) return // continue
//     // if(element >= 4) return // break
//     console.log(element);
// });

// console.log("================")

// for(let element of lista){
//     console.log(element);
// }
// console.log("================")


// i = 0;
// while (i <= 2000){ // sempre que eu não souber o inicio e fim
//     console.log(i);
//     i++
// }
// console.log("================")


// i = 0;
// do { // quando utilizo o do while, quando quero que faça algo primeiro e dependendo da ocasição faço o loop
//     console.log(i);
//     i++
// }
// while (false);

// console.log("================")


const pessoa = {
    nome: "Danilo",
    idade: 30,
    profissao: "Desenvolvedor"
};

for (let chave in pessoa) { // for in serve para iterar sobre chaves de um objeto literal
    console.log(`${chave}: ${pessoa[chave]}`);
}

console.log("================")

const pessoas = [
    {
        nome: "Danilo",
        idade: 30,
        profissao: "Desenvolvedor"
    },
    {
        nome: "Maciel",
        idade: 55,
        profissao: "Mecânico"
    }
];

for (let pessoa of pessoas) { // for of serve serve para iterar sobre uma lista
    console.log(`O nome do candidato é: ${pessoa.nome}`);
    console.log(`A sua idade é: ${pessoa.idade}`);
    console.log(`Profissão: ${pessoa.profissao}`);
    console.log('-----------');
}



// console.log("0")
// console.log("1")
// console.log("2")
// console.log("3")
// console.log("4")
// console.log("5")
// console.log("6")
// console.log("7")
// console.log("8")
// console.log("9")
// console.log("10")
// console.log("11")
// console.log("12")
// console.log("13")
// console.log("14")
// console.log("15")
// console.log("16")
// console.log("17")
// console.log("18")
// console.log("19")
// console.log("20")

