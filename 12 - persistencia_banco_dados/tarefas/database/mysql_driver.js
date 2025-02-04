const mysql = require('mysql2/promise');

class MysqlDriver {
    constructor(config = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'persistencia'
    }) {
        this.config = config;
        this.pool = mysql.createPool(this.config);
    }

    async executar(sql, params = []) {
        let connection;
        try {
            connection = await this.pool.getConnection();
            const [rows] = await connection.execute(sql, params);
            return rows;
        } catch (err) {
            throw err;
        } finally {
            if (connection) connection.release();
        }
    }

    async fechar() {
        try {
            await this.pool.end();
        } catch (err) {
            console.error("Erro ao encerrar conexão:", err.message);
        }
    }
}

module.exports = MysqlDriver;
