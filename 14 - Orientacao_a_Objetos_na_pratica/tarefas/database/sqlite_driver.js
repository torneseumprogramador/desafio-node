const sqlite3 = require('sqlite3').verbose();

class SqliteDriver {
    constructor(caminho_arquivo = "database/persistencia.db") {
        this.filePath = caminho_arquivo;
        this.db = new sqlite3.Database(this.filePath, (err) => {
            if (err) {
                console.error("Erro ao conectar ao banco de dados:", err.message);
            }
        });
    }

    async executar(sql, params = []) {
        return new Promise((resolve, reject) => {
            const comando = sql.trim().toUpperCase();

            if (comando.startsWith("SELECT")) {
                this.db.all(sql, params, (err, rows) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            } else {
                this.db.run(sql, params, function (err) {
                    if (err) reject(err);
                    else resolve(this.lastID || this.changes);
                });
            }
        });
    }

    fechar() {
        this.db.close((err) => {
            if (err) {
                console.error("Erro ao fechar o banco de dados:", err.message);
            }
        });
    }
}

module.exports = SqliteDriver;
