// === O que é a classe Promisse ? =====
// Uma promessa de entrega


function esperarPor(segundos) {
    return new Promise((resolve, reject) => {
        if (segundos < 0) {
            reject("O tempo não pode ser negativo");
        }
        setTimeout(() => {
            resolve(`Esperei por ${segundos} segundos`);
        }, segundos * 1000);
    });
}

// console.log("======[Inicio]========");
// == Usando a Promise ==
// const retorno = esperarPor(-1); // retorna a promessa

// retorno.then((resultado) => { // then = capturo o resultado da ação bem sucedia (resolve)
//     console.log(resultado);
// });

// retorno.catch((erro) => { // catch = capturo o erro da ação mau sucedida (reject)
//     console.log(erro);
// });
// console.log("======[Fim]========");

console.log("======[Inicio]========");

esperarPor(1).then((resultado) => { // then = capturo o resultado da ação bem sucedia (resolve)
    console.log(`Sucesso: ${resultado}`);
}).catch((erro) => { // catch = capturo o erro da ação mau sucedida (reject)
    console.log(`Erro: ${erro}`);
}).finally(() => {
    console.log("Cai aqui com sucesso ou erro");
})

console.log("======[Fim]========");





    // .then(mensagem => console.log(mensagem)) // Quando a Promise é resolvida
    // .catch(erro => console.error(erro)); // Quando a Promise é rejeitada
