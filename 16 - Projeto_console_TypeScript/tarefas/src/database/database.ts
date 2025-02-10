export class Database {
    private driver: { executar: (sql: string, params?: unknown[]) => Promise<any>; fechar?: () => void };

    constructor(driver: { executar: (sql: string, params?: unknown[]) => Promise<any>; fechar?: () => void }) {
        this.driver = driver;
    }

    async executar<T = any>(sql: string, params: unknown[] = []): Promise<T> {
        try {
            const result: T = await this.driver.executar(sql, params);
            
            if (typeof this.driver.fechar === "function") {
                this.driver.fechar();
            }

            return result;
        } catch (error) {
            throw error;
        }
    }
}