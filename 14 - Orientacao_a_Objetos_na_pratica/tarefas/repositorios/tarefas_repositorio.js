const Database = require("../database/database");
const SqliteDriver = require("../database/sqlite_driver");
const driver = new SqliteDriver();

// const MysqlDriver = require("../database/mysql_driver");
// const driver = new MysqlDriver();

// const Tarefa = require("../entidades/tarefa") // vou ter que colocar o ts para trabalhar corretamente com tipagens

const TarefaRepositorio = {
    cadastrar: async (tarefa) => {
        await new Database(driver).executar(
            "insert into tarefas(titulo, descricao, status)values(?, ?, ?)",
            [tarefa.titulo, tarefa.descricao, tarefa.status]
        )
    },
    listar: async () => {
        return await new Database(driver).executar(
            "select * from tarefas"
        )
    },
    excluir: async (id) => {
        return await new Database(driver).executar(
            "delete from tarefas where id = ?",
            [id]
        )
    },
    alterarStatus: async (id, status) => {
        return await new Database(driver).executar(
            "update tarefas set status = ? where id = ?",
            [status, id]
        )
    },
}

module.exports = TarefaRepositorio;