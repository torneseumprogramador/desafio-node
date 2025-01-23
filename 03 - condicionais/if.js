const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const meu_telefone_call_back_o_que_farei_com_a_pizza = (pizza) => {

    if (pizza === "calabreza") {
        console.log("A pizza de calabreza estava uma delícia")
    }
    else {
        console.log(`Você escolheu a pizza sabor: ${pizza}`);
    }
    
    rl.close(); // Fechando a porta depois de pegar a pizza
}

rl.question('Digite sua pizza: ', meu_telefone_call_back_o_que_farei_com_a_pizza);

//  Tipos de comparação
/*
==   -> Estou comparando valor
===  -> Estou comparando tipo e valor
!=  -> Estou comparando valor diferente
!== -> Estou comparando tipo e valor diferente
>    -> Estou comparando se um é maior que outro
<    -> Estou comparando se um é menor que outro
>=   -> Estou comparando se um é maior ou igual que outro
<=   -> Estou comparando se um é menor ou igual que outro
*/

