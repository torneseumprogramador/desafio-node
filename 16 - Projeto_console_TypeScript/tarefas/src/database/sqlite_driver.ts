import sqlite3 from 'sqlite3';

const sqlite = sqlite3.verbose();

export class SqliteDriver {
    private filePath: string;
    private db: sqlite3.Database | null;

    constructor(caminho_arquivo: string = "./db/persistencia.db") {
        this.filePath = caminho_arquivo;
        this.db = null;
    }

    conectar(): void {
        if (!this.db) {
            console.log(this.filePath)
            this.db = new sqlite.Database(this.filePath, (err: Error | null) => {
                if (err) {
                    console.error("Erro ao conectar ao banco de dados:", err.message);
                }
            });
        }
    }

    async executar<T = any>(sql: string, params: unknown[] = []): Promise<T[]> {
        this.conectar();

        return new Promise<T[]>((resolve, reject) => {
            const comando = sql.trim().toUpperCase();

            if (comando.startsWith("SELECT")) {
                this.db?.all(sql, params, (err: Error | null, rows: T[]) => {
                    if (err) reject(err);
                    else resolve(rows);
                });
            } else {
                this.db?.run(sql, params, function (this: sqlite3.RunResult, err: Error | null) {
                    if (err) reject(err);
                    else resolve([{ lastID: this.lastID, changes: this.changes }] as T[]);
                });
            }
        });
    }

    fechar(): void {
        if (this.db) {
            this.db.close((err: Error | null) => {
                if (err) {
                    console.error("Erro ao fechar o banco de dados:", err.message);
                } else {
                    this.db = null;
                }
            });
        }
    }
}
