import TarefaRepositorio from "../repositorios/tarefas_repositorio";
import Pergunta from "../interfaces/pergunta";
import Tela from "../interfaces/tela";
import { Tarefa } from "../entidades/tarefa"

const localizarTarefaExecutarAcao = async (id: number, metodoRecursao: () => Promise<void>, callback: (tarefa?: Tarefa) => void) : Promise<void> => {
    const tarefa: Tarefa | undefined = (await TarefaRepositorio.listar()).find((tarefa: Tarefa) => tarefa.id == id);
    if(!tarefa) {
        await Tela.mensagemPor("Id não encontrado !", 2);
        const opcao: string = await Pergunta.perguntar("Digite 0 para sair ou 1 para tentar novamente");
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
    cadastrarTarefa: async (): Promise<void> => {
        const titulo:string = await Pergunta.perguntar("Digite o titulo da tarefa");
        const descricao:string = await Pergunta.perguntar("Digite a descrição da tarefa");

        const tarefa: Tarefa = new Tarefa({
            titulo, descricao,
            status: "Aberto",
        })
    
        await TarefaRepositorio.cadastrar(tarefa);
        await Tela.mensagemPor("Tarefa cadastrada com sucesso", 1);
    },
    listarTarefa: async (): Promise<void> => {
        Tela.limparTela();
        console.log("===== [ Lista de tarefas ] =====");
    
        const tarefas: Tarefa[] = await TarefaRepositorio.listar();
    
        for (const tarefa of tarefas) {
            console.log(`
                Id: ${tarefa.id}
                Título: ${tarefa.titulo}
                Descrição: ${tarefa.descricao}
                Status: ${tarefa.status}
                -----------------------------------
            `);
        }
    
        await Pergunta.perguntar("Digite Enter para sair");
        Tela.limparTela();
    },
    excluirTarefa: async () => {
        Tela.limparTela();
        const id:number = Number(await Pergunta.perguntar("Digite o id da tarefa"));
        
        await localizarTarefaExecutarAcao(id, TarefaServico.excluirTarefa, async (tarefa?:Tarefa): Promise<void> => {
            if(!tarefa) return;

            await TarefaRepositorio.excluir(tarefa.id);
            await Tela.mensagemPor(`Tarefa "${tarefa.titulo}" excluída com sucesso`, 3);
        });
    },
    alterarStatusTarefa: async (): Promise<void> => {
        Tela.limparTela();
        const id:number = Number(await Pergunta.perguntar("Digite o id da tarefa"));

        await localizarTarefaExecutarAcao(id, TarefaServico.alterarStatusTarefa, async (tarefa?:Tarefa) => {
            if(!tarefa) return;

            const status:string = await Pergunta.perguntar("Digite o novo status");
            await TarefaRepositorio.alterarStatus(tarefa.id, status);
            await Tela.mensagemPor(`Tarefa "${tarefa.titulo}" alterada para o status: ${status}`, 3);
        });
    },
}

export default TarefaServico;