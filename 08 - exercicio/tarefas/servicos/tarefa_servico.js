const Database = require("../database/memoria");
const Pergunta = require("../interfaces/pergunta");
const Tela = require("../interfaces/tela");

const TarefaServico = {
    cadastrarTarefa: async () => {
        const titulo = await Pergunta.perguntar("Digite o titulo da tarefa");
        const descricao = await Pergunta.perguntar("Digite a descrição da tarefa");
        const id = new Date().getTime()
    
        const tarefa = {
            id, titulo, descricao
        }
    
        Database.tarefas.push(tarefa);
        await Tela.mensagemPor("Tarefa cadastrada com sucesso", 1);
    },
    listarTarefa: async () => {
        Tela.limparTela();
        console.log("===== [ Lista de tarefas ] =====")
        for(tarefa of Database.tarefas){
            console.log(`
                Id: ${tarefa.id}
                Título: ${tarefa.titulo}
                Descrição: ${tarefa.descricao}
                -----------------------------------
            `);
        }

        await Pergunta.perguntar("Digite enter para sair");
        Tela.limparTela();
    }
}

module.exports = TarefaServico;