class Database {
    constructor(driver){
        this.driver = driver
    }

    executar(sql, params){
        return new Promise(async (resolve, reject) => {
            try{
                const result = await this.driver.executar(sql, params);
                if( this.driver.fechar ) this.driver.fechar();
                resolve(result);
            }
            catch(e){
                reject(e);
            }
        });
    }
}


module.exports = Database;