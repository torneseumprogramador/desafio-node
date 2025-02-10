import readline from 'readline';

const Pergunta = {
    perguntar: (mensagem: string): Promise<string> => {
        return new Promise((resolve) => {
            const rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout,
            });

            rl.question(mensagem + '\n', (resposta: string) => {
                resolve(resposta);
                rl.close();
            });
        });
    }
}

export default Pergunta;
