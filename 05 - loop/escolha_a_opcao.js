const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Envolve rl.question em uma Promise
const perguntar = (mensagem) => {
    return new Promise((resolve) => {
        rl.question(mensagem, (resposta) => {
            resolve(resposta);
        });
    });
};

const iniciar = async () => {
    let sair = 0;
    while (sair == 0) {
        console.log(`
        Escolha uma das opções abaixo:
        1 - Opção
        2 - Opção
        3 - Opção
        4 - Sair
        `);

        // Aguarda o input do usuário
        let opcao = await perguntar('Digite uma das opções abaixo: ');

        switch (opcao) {
            case "1":
                console.log("Você escolheu a Opção 1");
                break;
            case "2":
                console.log("Você escolheu a Opção 2");
                break;
            case "3":
                console.log("Você escolheu a Opção 3");
                break;
            case "4":
                console.log("Saindo ...");
                sair = 1;
                break;
            default:
                console.log(`Opção inválida`);
                break;
        }
    }

    // Fecha a interface readline quando o loop terminar
    rl.close();
};

iniciar();
