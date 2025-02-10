import mysql, { Pool, PoolConnection, RowDataPacket, OkPacket, ResultSetHeader } from 'mysql2/promise';

interface MysqlConfig {
    host: string;
    user: string;
    password: string;
    database: string;
}

export class MysqlDriver {
    private config: MysqlConfig;
    private pool: Pool;

    constructor(config: MysqlConfig = {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'persistencia'
    }) {
        this.config = config;
        this.pool = mysql.createPool(this.config);
    }

    async executar<T extends RowDataPacket[] | RowDataPacket[][] | ResultSetHeader>(
        sql: string,
        params: any[] = []
    ): Promise<T> {
        let connection: PoolConnection | undefined;
        try {
            connection = await this.pool.getConnection();
            const [rows] = await connection.execute<T>(sql, params);
            return rows;
        } catch (err) {
            throw err;
        } finally {
            if (connection) connection.release();
        }
    }

    async fechar(): Promise<void> {
        try {
            await this.pool.end();
        } catch (err) {
            console.error("Erro ao encerrar conexão:", (err as Error).message);
        }
    }
}
