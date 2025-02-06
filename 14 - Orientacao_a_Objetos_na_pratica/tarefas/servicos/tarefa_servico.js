const TarefaRepositorio = require("../repositorios/tarefas_repositorio");
const Pergunta = require("../interfaces/pergunta");
const Tela = require("../interfaces/tela");

const localizarTarefaExecutarAcao = async (id, metodoRecursao, callback) => {
    const tarefa = (await TarefaRepositorio.listar()).find((tarefa) => tarefa.id == id);
    if(!tarefa) {
        await Tela.mensagemPor("Id não encontrado !", 2);
        const opcao = await Pergunta.perguntar("Digite 0 para sair ou 1 para tentar novamente");
        if( opcao == "0") {
            Tela.limparTela();
            callback();
            return;
        }
        return await metodoRecursao();
    }

    await callback(tarefa);
}

const TarefaServico = {
    cadastrarTarefa: async () => {
        const titulo = await Pergunta.perguntar("Digite o titulo da tarefa");
        const descricao = await Pergunta.perguntar("Digite a descrição da tarefa");
        const id = new Date().getTime()

        const tarefa = {
            id, titulo, descricao,
            status: "Aberto",
        }
    
        await TarefaRepositorio.cadastrar(tarefa);
        await Tela.mensagemPor("Tarefa cadastrada com sucesso", 1);
    },
    listarTarefa: async () => {
        Tela.limparTela();
        console.log("===== [ Lista de tarefas ] =====")
        const tarefas = await TarefaRepositorio.listar();
        for(tarefa of tarefas){
            console.log(`
                Id: ${tarefa.id}
                Título: ${tarefa.titulo}
                Descrição: ${tarefa.descricao}
                Status: ${tarefa.status}
                -----------------------------------
            `);
        }

        await Pergunta.perguntar("Digite enter para sair");
        Tela.limparTela();
    },
    excluirTarefa: async () => {
        Tela.limparTela();
        const id = await Pergunta.perguntar("Digite o id da tarefa");
        
        await localizarTarefaExecutarAcao(id, TarefaServico.excluirTarefa, async (tarefa) => {
            if(!tarefa) return;

            await TarefaRepositorio.excluir(tarefa.id);
            await Tela.mensagemPor(`Tarefa "${tarefa.titulo}" excluída com sucesso`, 3);
        });
    },
    alterarStatusTarefa: async () => {
        Tela.limparTela();
        const id = await Pergunta.perguntar("Digite o id da tarefa");

        await localizarTarefaExecutarAcao(id, TarefaServico.alterarStatusTarefa, async (tarefa) => {
            if(!tarefa) return;

            const status = await Pergunta.perguntar("Digite o novo status");
            await TarefaRepositorio.alterarStatus(tarefa.id, status);
            await Tela.mensagemPor(`Tarefa "${tarefa.titulo}" alterada para o status: ${status}`, 3);
        });
    },
}

module.exports = TarefaServico;