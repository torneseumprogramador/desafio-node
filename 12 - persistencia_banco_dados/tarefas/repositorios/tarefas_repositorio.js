const fs = require('fs');
const filePath = "database/tarefas.json";

const TarefaRepositorio = {
    cadastrar: async (tarefa) => {
        const tarefas = await TarefaRepositorio.listar();
        tarefas.push(tarefa);
        await fs.writeFileSync(filePath, JSON.stringify(tarefas), 'utf8');
    },
    listar: async () => {
        const tarefasJson = await fs.readFileSync(filePath, 'utf8');
        return JSON.parse(tarefasJson);
    },
    excluir: async (id) => {
        const tarefas = await TarefaRepositorio.listar();
        const index = tarefas.findIndex((t) => t.id == id);
        tarefas.splice(index, 1);
        await fs.writeFileSync(filePath, JSON.stringify(tarefas), 'utf8');
    },
    alterarStatus: async (id, status) => {
        const tarefas = await TarefaRepositorio.listar();
        const tarefa = tarefas.find((t) => t.id == id);
        if(tarefa){
            tarefa.status = status;
            await fs.writeFileSync(filePath, JSON.stringify(tarefas), 'utf8');
        }
    },
}

module.exports = TarefaRepositorio;