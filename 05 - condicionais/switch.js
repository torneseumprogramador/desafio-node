const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const meu_telefone_call_back_o_que_farei_com_a_pizza = (pizza) => {

    switch (pizza) {
        case "calabreza":
            console.log("A pizza de calabreza estava uma delícia")
            break;
        case "mussarela":
            console.log(`Hummm esta pizza tomando vinho é excelente`);
            break;
        case "toscana":
            console.log(`Ebaaaa pizza de toscana`);
            break;
        default:
            console.log(`Você escolheu a pizza sabor: ${pizza}`);
            break;
    }
    
    rl.close(); // Fechando a porta depois de pegar a pizza
}

rl.question('Digite sua pizza: ', meu_telefone_call_back_o_que_farei_com_a_pizza);

//  Tipos de comparação
/*
==   -> Estou comparando valor
===  -> Estou comparando tipo e valor
!=   -> Estou comparando valor diferente
!==  -> Estou comparando tipo e valor diferente
>    -> Estou comparando se um é maior que outro
<    -> Estou comparando se um é menor que outro
>=   -> Estou comparando se um é maior ou igual que outro
<=   -> Estou comparando se um é menor ou igual que outro
*/

