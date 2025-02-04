const Database = require("./database/database");
const JsonDriver = require("./database/json_driver");
const SqliteDriver = require("./database/sqlite_driver");
const MysqlDriver = require("./database/mysql_driver");

const executar = async () => {
    console.log("=====JsonDriver========")
    var db = new Database(new JsonDriver());
    var dados = await db.executar("select * from tarefas");
    console.log(dados);


    console.log("=====SqliteDriver========")
    var db = new Database(new SqliteDriver());
    var dados = await db.executar("select * from tarefas");
    console.log(dados);


    console.log("=====MysqlDriver========")
    var db = new Database(new MysqlDriver());
    var dados = await db.executar("select * from tarefas");
    console.log(dados);
}


executar();