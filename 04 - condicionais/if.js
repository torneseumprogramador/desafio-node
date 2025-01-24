const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const meu_telefone_call_back_o_que_farei_com_a_pizza = (pizza) => {

    if (pizza === "calabreza") {
        console.log("A pizza de calabreza estava uma delícia")
    }
    else if (pizza === "mussarela") {
        console.log(`Hummm esta pizza tomando vinho é excelente`);
    }
    else if (pizza === "toscana") {
        console.log(`Ebaaaa pizza de toscana`);
    }
    else {
        console.log(`Você escolheu a pizza sabor: ${pizza}`);
    }

    // let tipo = "Padrão";
    // if (pizza === "calabreza"){
    //     tipo = "Carne";
    // }
    // else{
    //     tipo = "Proteína";
    // }

    // let tipo = "Padrão";
    // if (pizza === "calabreza")
    //     tipo = "Carne";
    // else
    //     tipo = "Proteína";

    // let tipo = "Padrão";
    // if (pizza === "calabreza") tipo = "Carne"
    // else tipo = "Proteína"

    // ternário
    let tipo = pizza === "calabreza" ? "Carne" : "Proteína"

    // === Operadores lógicos ====
    // - ou   (||)
    // - e    (&&)
    // - not  (!)

    console.log(`Tipo da pizza: ${tipo}`);


    if (pizza === "calabreza" || pizza === "mussarela") {
        console.log("Sua pizza chegou, vai lá comer")
    }

    if (pizza.includes("a") && pizza.includes("e")) {
        console.log(`A pizza digitada contem (a) e (e): ${pizza}`)
    }
    else console.log(`A pizza não contem (a) e (e): ${pizza}`)

    if (!pizza.includes("b")) {
        console.log(`A pizza digitada não contem a letra (b): ${pizza}`)
    }

    const regex = /(a.*e)|(e.*a)/;

    if (regex.test(pizza)) {
        console.log(`REGEX - A pizza digitada contem (a) e (e): ${pizza}`)
    } else {
        console.log(`REGEX - A pizza não contem (a) e (e): ${pizza}`)
    }



    const regex_e_numero = /^\d+$/;
    if (regex_e_numero.test(pizza)) {
        let numero = Number(pizza)

        if(numero >= 0 && numero <= 10){
            console.log("O numero digitado está entre 0 á 10");
        }
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

