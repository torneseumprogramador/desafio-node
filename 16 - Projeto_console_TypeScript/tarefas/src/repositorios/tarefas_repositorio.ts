import { Database } from "../database/database";
import { Tarefa } from "../entidades/tarefa";

import { SqliteDriver } from "../database/sqlite_driver";
const driver = new SqliteDriver();

// import { MysqlDriver } from "../database/mysql_driver";
// const driver = new MysqlDriver();

const TarefaRepositorio = {
    cadastrar: async (tarefa: Tarefa): Promise<void> => {
        await new Database(driver).executar(
            "insert into tarefas(titulo, descricao, status)values(?, ?, ?)",
            [tarefa.titulo, tarefa.descricao, tarefa.status]
        )
    },
    listar: async (): Promise<Tarefa[]> => {
        const tarefas: Tarefa[] = await new Database(driver).executar<Tarefa[]>(
            "SELECT * FROM tarefas"
        );
        
        return tarefas;
    },
    excluir: async (id: number): Promise<void> => {
        await new Database(driver).executar(
            "delete from tarefas where id = ?",
            [id]
        )
    },
    alterarStatus: async (id: number, status: string): Promise<void> => {
        await new Database(driver).executar(
            "update tarefas set status = ? where id = ?",
            [status, id]
        )
    },
}

export default TarefaRepositorio;