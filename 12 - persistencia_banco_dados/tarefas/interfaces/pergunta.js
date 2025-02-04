const readline = require('readline');

const Pergunta = {
    perguntar: (mensagem) => {
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            rl.question(mensagem + '\n', (resposta) => {
                resolve(resposta);
                rl.close();
            });
        });
    }
}

module.exports = Pergunta;
