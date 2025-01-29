const Pergunta = require("./pergunta");
const TarefaServico = require("../servicos/tarefa_servico");
const Tela = require("../interfaces/tela");

const menu = async () => {
    let sair = 0;
    while (sair == 0) {
        console.log(`
            1 - Castrar tarefa
            2 - Listar tarefas
            3 - Excluir tarefa
            4 - Alterar status tarefa
            5 - Sair
        `)

        // Aguarda o input do usuário
        let opcao = await Pergunta.perguntar('Digite uma das opções abaixo: ');

        Tela.limparTela();

        switch (opcao) {
            case "1":
                await TarefaServico.cadastrarTarefa()
                break;
            case "2":
                await TarefaServico.listarTarefa();
                break;
            case "3":
                console.log("Você escolheu a Opção 3");
                break;
            case "4":
                console.log("Você escolheu a Opção 4");
                break;
            case "5":
                console.log("Saindo ...");
                sair = 1;
                break;
            default:
                console.log(`Opção inválida`);
                break;
        }
    }
};

module.exports = menu;